// Notes from Richard: 
// This is an extended class of the original zxing-js/libary open source code.
// The Manifest Manager ScannerService class uses this class, which is the 
// "gateway to the rest the original zxing-library open course code.  

/// <reference path='../util/Image-capture.d.ts' />

// Other libraries
import { BehaviorSubject, Observable } from 'rxjs';

// ZXing library
import { BrowserPDF417Reader } from '../../browser/BrowserPDF417Reader';
import ChecksumException from '../ChecksumException';
import FormatException from '../FormatException';
import NotFoundException from '../NotFoundException';
import Result from '../../core/Result';
import { ResultAndError } from '../../core/ResultAndError';
import Exception from '../Exception';

export class BrowserPDF417ContinuousReader extends BrowserPDF417Reader {

    private _isTorchAvailable = new BehaviorSubject<boolean>(undefined);
    private _isAutofocusAvailable = new BehaviorSubject<boolean>(undefined);
    private _deviceId: string;
    // If there's some scan stream open, it shal be here.
    private _scanStream: BehaviorSubject<ResultAndError>;
    private _autofocusOff: string;
    isScanPaused: boolean;

    public constructor(timeBetweenScansMillis: number = 500) {
        super(timeBetweenScansMillis);
        this._autofocusOff = '';
        this.isScanPaused = false;
    }

    public get isTorchAvailable(): Observable<boolean> { return this._isTorchAvailable.asObservable(); }
    public get isAutofocusAvailable(): Observable<boolean> { return this._isAutofocusAvailable.asObservable(); }

    /**
    * Starts the decoding from the current or a new video element.
    *
    * @param callbackFn The callback to be executed after every scan attempt
    * @param deviceId The device's to be used Id
    * @param videoSource A new video element
    */
    public StartContinuousDecodeFromInputVideoDevice(
        deviceId?: string,
        videoSource?: HTMLVideoElement
    ): Observable<ResultAndError> {
        this.stopScanning();
        // Keeps the deviceId between scanner resets.
        if (typeof deviceId !== 'undefined') {
            this._deviceId = deviceId;
        }
        if (typeof navigator === 'undefined') {
            return;
        }
        const scan$ = new BehaviorSubject<ResultAndError>({});
        try {
            
            // this.decodeFromInputVideoDeviceContinuously(deviceId, videoSource, (result, error) => scan$.next({ result, error }));
            //console.log('Device ID before applying constraings:', deviceId);
            this.getStreamForDevice({ deviceId })
            .then(stream => this.attachStreamToVideoAndCheckCompatibilities(stream, videoSource))
            .then(videoElement => this.decodeOnSubject(scan$, videoElement, this.timeBetweenScansMillis));
        } catch (e) {
            scan$.error(e);
        }
        this.setScanStream(scan$);
        // @todo Find a way to emit a complete event on the scan stream once it's finished.
        return scan$.asObservable();
    }

    // Gets the media stream for certain device.
    // Falls back to any available device if no `deviceId` is defined.
    public async getStreamForDevice({ deviceId }: Partial<MediaDeviceInfo>): Promise<MediaStream> {
        const constraints = this.getUserMediaConstraints(deviceId);
        //console.log('Applied constraints:', constraints);
        //var supconstraints = await navigator.mediaDevices.getSupportedConstraints();
        //console.log('Supported constraints:', supconstraints);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        //const tracks: MediaStreamTrack[] = stream.getTracks();
        //tracks.forEach((track) => {
        //    //console.log('Track Capabilities:', track.getCapabilities())
        //});

        return stream;
    }

    // Creates media steram constraints for certain `deviceId`.
    // Falls back to any environment available device if no `deviceId` is defined.
    public getUserMediaConstraints(deviceId: string): MediaStreamConstraints {
        const video = typeof deviceId === 'undefined'
            ? {
                facingMode: { exact: 'environment' },
                video: {
                    mandatory: {
                        minWidth: 640,
                        maxWidth: 800,
                        minHeight: 480,
                        maxHeight: 600
                    }
                }
            }
            : {
                deviceId: { exact: deviceId },
                video: {
                    mandatory: {
                        minWidth: 640,
                        maxWidth: 800,
                        minHeight: 480,
                        maxHeight: 600
                    }
                }
            };
        const constraints: MediaStreamConstraints = { video };
        return constraints;
    }

    public setTorch(torchOn: boolean, autofocusOn: boolean | null): void {
        if (!this._isTorchAvailable.value) {
            // compatibility not checked yet
            return;
        }
        const tracks = this.getVideoTracks(this.stream);
        this.applyTorchOnTracks(tracks, torchOn, autofocusOn);
        // @todo check possibility to disable torch without restart
        //this.restart();
    }


    public setAutofocus(autofocusOn: boolean, torchOn: boolean | null): void {
        if (!this._isAutofocusAvailable.value) {
            // compatibility not checked yet
            return;
        }
        const tracks = this.getVideoTracks(this.stream);
        this.applyAutofocusOnTracks(tracks, autofocusOn, torchOn);

        // @todo check possibility to disable torch without restart
        //this.restart();
    }

    // Update the torch compatibility state and attachs the stream to the preview element.
    private attachStreamToVideoAndCheckCompatibilities(stream: MediaStream, videoSource: HTMLVideoElement): Promise<HTMLVideoElement> {
        videoSource.addEventListener('loadedmetadata', (e) => {
            window.setTimeout(() => (
                this.updateCompatibilities(stream)
            ), 500);
        });
        //this.updateCompatibilities(stream);
        return this.attachStreamToVideo(stream, videoSource);
    }

    private updateCompatibilities(stream: MediaStream) {
        this.updateTorchCompatibility(stream);
        this.updateAutofocusCompatibility(stream);
    }

    // Checks if the stream supports torch control.
    private async updateTorchCompatibility(stream: MediaStream): Promise<void> {
        const tracks = this.getVideoTracks(stream);
        for (const track of tracks) {
            if (await this.isTorchCompatible(track)) {
                this._isTorchAvailable.next(true);
            break;
            }
        }
    }

    private async updateAutofocusCompatibility(stream: MediaStream): Promise<void> {
        const tracks = this.getVideoTracks(stream);
        for (const track of tracks) {
            if (await this.isAutofocusCompatible(track)) {
                this._isAutofocusAvailable.next(true);
                break;
            }
        }
    }

    // The video stream where the tracks gonna be extracted from.
    private getVideoTracks(stream: MediaStream) {
        let tracks = [];
        try {
            tracks = stream.getVideoTracks();
        }
        finally {
            return tracks || [];
        }
    }

    // The media stream track that will be checked for compatibility.
    private async isTorchCompatible(track: MediaStreamTrack) {
        let compatible = false;
        try {
            // Note from Richard: 'torch' is actually in track capabilities.
            // I discovered this when implementing autofocus. So, I added this
            // statement and commented out for future refernce.  Right now, the
            // torch is working on the one Android phone that I tested.  But, if
            // we encounter torch problems later,we made need to modify this to 
            // look at the track capabilites for a more complete solution.
            const trackCapabilities = track.getCapabilities();
            const imageCapture = new ImageCapture(track);
            //const trackCapabilities = imageCapture.track.getCapabilities();
            console.log('Track Capabilities when checking for Torch:', trackCapabilities);
            const photoCabilities = await imageCapture.getPhotoCapabilities();
            //console.log('Photo Capabilities when checking for Torch:', photoCabilities);
            compatible = !!trackCapabilities['torch'] || ('fillLightMode' in photoCabilities && photoCabilities.fillLightMode.length !== 0);
        }
        finally {
            return compatible;
        }
    }

    private async isAutofocusCompatible(track: MediaStreamTrack): Promise<boolean> {

        let compatible = false;

        try {
            
            //console.log('Track Capabilities:' , trackCapabilities);
            // TODO: Note from Richard: I am experiencing incosistent resutls
            // with Track Capabilities on the same camera.  Sometimes
            // the camera has focusMode (focus capabilities) and 
            // other times, it does not.  There must be a flow in the logic
            // that is bringing back a different track.  This must be the 
            // reason the isTorchCompatible() function logic checks for
            // two different things.  The same 'torch' key would be on the 
            // Track Capabilities object.  So, I think the previous programmer
            // decided to use PhotoCapabilites, which is a hack around the 
            // problem.  There is no hack for getting determining the focus
            // capabilities, so I must figure out what the problem is.
            const imageCapture = new ImageCapture(track);
            //const capabilities = await imageCapture.getPhotoCapabilities();
            const trackCapabilities = imageCapture.track.getCapabilities();
            const capabilities = track.getCapabilities();
            console.log('Track Capabilities when checking for Autofocus:', capabilities);
            compatible = !!trackCapabilities['focusMode']
                && trackCapabilities['focusMode'].indexOf('continuous') >= 0;
            if (compatible) {
                this._autofocusOff = this.getFocusmodeOffValue(trackCapabilities['focusMode']);
                compatible = this._autofocusOff != '';
            }
            // Note from Richard:
            // This needs fine tuning to check the trackCapabilities['focusMode'] 
            // array for the availabibility of 'continuous'...I think.
            // I'm not sure if every comera has implemented the focusMode with a 
            // continuous setting or not.  The world is never that perfect.
            //compatible = !!trackCapabilities['focusMode'].find(item => {
            //    JSON.stringify(item) === 'continuous'
            //});
        }
        finally {
            return compatible;
        }
    }

    private getFocusmodeOffValue(focusmodeList: string[]): string {
        if (focusmodeList.indexOf('none') >= 0) {
            return 'none';
        }
        if (focusmodeList.indexOf('manual') >= 0) {
            return 'manual';
        }
        if (focusmodeList.indexOf('single-shot') >= 0) {
            return 'single-shot';
        }
        return '';
    }

    /**
    * Apply the torch setting in all received tracks.
    */
    private applyTorchOnTracks(tracks: MediaStreamTrack[], torchState: boolean, autofocusState: boolean | null) {
        tracks.forEach(track => {
            console.log('Track info:', track);
            //const imageCapture = new ImageCapture(track);
            //console.log('Track settings: ', track.getSettings());
            console.log('Track constraints before applying torch constraint set:', track.getConstraints());
            if (autofocusState !== null) {
                track.applyConstraints({
                    width: { exact: 480 },
                    height: { exact: 640 },
                    advanced: <any>[{
                        torch: torchState,
                        //fillLightMode: torchState ? 'flash' : 'off',
                        focusMode: autofocusState ? 'continuous' : 'manual' }]
                });

                console.log('Track constraints after applying torch constraint set:', track.getConstraints());
            } else {
                //const imageCapture = new ImageCapture(track);
                track.applyConstraints({
                    advanced: <any>[{
                        torch: torchState,
                        //fillLightMode: torchState ? 'flash' : 'off',
                        focusMode: autofocusState ? 'continuous' : 'manual'
                    }]
                });
                console.log('Track constraints after applying torch constraint set:', track.getConstraints());
            }
        });
    }

    private applyAutofocusOnTracks(tracks: MediaStreamTrack[], autofocusState: boolean, torchState: boolean | null) {
        tracks.forEach(track => {
            if (torchState !== null) {
                track.applyConstraints({
                    advanced: [<any>{
                        torch: torchState,
                        exposureMode: torchState ? 'continuous' : 'manual',
                        //fillLightMode: torchState ? 'flash' : 'off',
                        focusMode: autofocusState ? 'continuous' : 'manual'
                    }]
                });
            } else {
                track.applyConstraints({
                    advanced: [<any>{
                        focusMode: autofocusState ? 'continuous' : 'manual'
                    }]
                });
            }
            //console.log('Track Constraints:', track.getConstraints());
        });
    }

    // Correctly sets a new scanStream value.
    private setScanStream(scan$: BehaviorSubject<ResultAndError>): void {
        // cleans old stream
        this.cleanScanStream();
        // sets new stream
        this._scanStream = scan$;
    }

    // Cleans any old scan stream value.
    private cleanScanStream(): void {
        if (this._scanStream && !this._scanStream.isStopped) {
            this._scanStream.complete();
        }
        this._scanStream = null;
    }

    /**
    * Decodes values in a stream with delays between scans.
    * @param scan$ The subject to receive the values.
    * @param videoElement The video element the decode will be applied.
    * @param delay The delay between decode results.
    */
    private decodeOnSubject(
        scan$: BehaviorSubject<ResultAndError>,
        videoElement: HTMLVideoElement,
        delay: number
    ): void {
        // stops loop if scan$.isStopped
        if (scan$.isStopped) {
            return;
        }
        else if (this.isScanPaused) {
            let error = new Exception('scan paused');
            scan$.next({ error });
            // Checks every 3 seconds after scan is paused to determine if scanning should continue.
            setTimeout(() => {
                this.decodeOnSubject(scan$, videoElement, delay), 3000;
            });
        } else {
            let result: Result;
            let scanCompleted: boolean;
            try {
                scanCompleted = false;
                result = this.decode(videoElement);
                scanCompleted = true;
                scan$.next({ result });
            
            } catch (scanError) {
                let error: Exception = new Exception('scanning');
                scan$.next({ error });
                // stream cannot stop on fails.
                //if (
                //    !scanError ||
                //    // scan Failure - found nothing, no error
                //    scanError instanceof NotFoundException ||
                //    // scan Error - found the QR but got error on decoding
                //    scanError instanceof ChecksumException ||
                //    scanError instanceof FormatException
                //) {
                //    let error = scanError;
                //    error.message = 'scanning';
                //    scan$.next({ error });
                //} else {
                //    //scan$.error(error);
                //    let error = new Exception(scanError.toString());
                //    scanCompleted = true;
                //    scan$.next({ error });
                //}
            } finally {
                const timeout = !result ? 0 : delay;
                if (scanCompleted) {
                    setTimeout(() => {
                        this.isScanPaused = true;
                        console.log('Scan Paused.');
                        this.decodeOnSubject(scan$, videoElement, delay), 3000;
                    });
                } else {
                    setTimeout(() => this.decodeOnSubject(scan$, videoElement, delay), timeout);
                }
            }
        }
    }

}
