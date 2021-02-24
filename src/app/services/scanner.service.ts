// Angular libraries
import { Injectable, ElementRef } from '@angular/core';

// Manifest Manager classes and components
import BarcodeFormat from '../zxing-scanner-library/core/BarcodeFormat';
import Exception from '../zxing-scanner-library/core/Exception';
import Result from '../zxing-scanner-library/core/Result';
import { BrowserPDF417ContinuousReader } from '../zxing-scanner-library/core/pdf417/browser-pdf417-continuous-reader';
import { ResultAndError } from '../zxing-scanner-library/core/ResultAndError';
import { Subscription, Subject } from 'rxjs';
import { AudioService } from '../services/audio.service';
import { ScannerConstants } from '../shared/constants/scanner.constants';
import { ManifestManagerErrorFactory } from '../models/factories/manifest-manager-error.factory';
import { IManifestManagerError } from '../models/interfaces/manifest-manager-error.interface';
import { FunctionType } from '../shared/enumerations/enumerations';
import { ErrorConstants } from '../shared/constants/error.constants';
import { CameraErrorType } from '../shared/enumerations/enumerations';
import { ManifestManagerError } from '../models/manifest-manager-error.model';

@Injectable({
    providedIn: 'root'
})

export class ScannerService {
    private _bardcodeReader: BrowserPDF417ContinuousReader;
    private _selectedCamera: MediaDeviceInfo;
    private _scannerEnabled: boolean;
    private _isAutoStarting: boolean;
    private _hasPermission: boolean | null;
    private _autostarting: boolean | null;
    private _scanResult: string;
    private _scanFailure: Exception | undefined;
    private _scanError: Error;
    private _camerasFound: MediaDeviceInfo[];
    private _userHasPermissionToUseCamera: boolean;
    private _hasCamera: boolean;
    private _decodingSubscription: Subscription;
    private _scanningCount: number;
    private _allowedBarcodeFormats: BarcodeFormat[];

    PreviewElement: ElementRef<HTMLVideoElement>;
    HasNavigator: boolean;
    MediaDeviceSuported: boolean;
    PermissionError: any;
    ScannerStatusChanged: Subject<string>;
    ScanSuccessChanged: Subject<string>;

    constructor(
        private _audioService: AudioService
    ) {
        this._selectedCamera = null;
        this._scannerEnabled = false;
        this.initializeAudio();
        this._allowedBarcodeFormats = [BarcodeFormat.PDF_417];
        this.ScannerStatusChanged = new Subject<string>();
        this.ScanSuccessChanged = new Subject<string>();
        this._scanningCount = 1;
    }

    private initializeAudio() {
        this._audioService.preload('scanned', '../../../assets/audio/scanned.mp3');
        this._audioService.preload('success', '../../../assets/audio/success.mp3');
        this._audioService.preload('error', '../../../assets/audio/error.mp3');
    }

    get codeReader(): BrowserPDF417ContinuousReader {
        return this._bardcodeReader;
    }

    get isScanningPaused(): boolean {
        return this.getCodeReader().isScanPaused;
    }

    setIsScanningPaused(value: boolean): void {
        this.getCodeReader().isScanPaused = value;
    }

    get device() { return this._selectedCamera; }
    set device(device: MediaDeviceInfo | null) {
        // In order to change the device the codeReader gotta be resetted
        this._stopCamera();
        this._selectedCamera = device;
        // If enabled, start scanning.
        if (this._scannerEnabled && device !== null) {
            this.scanFromDevice(device.deviceId);
        }
    }

    get isAutstarting(): boolean | null { return this._isAutoStarting; }
    set initializing(state: boolean | null) {
        this._isAutoStarting = state;
        this._autostarting = state;
    }

    async setTorch(torchOn: boolean, autofocusOn: boolean | null): Promise<boolean> {
            try {
                await this.getCodeReader().setTorch(torchOn, autofocusOn);
                return (torchOn);
            }
            catch (error) {
                throw (ManifestManagerErrorFactory.CreateManifestManagerError(
                    FunctionType.ScanningCamera,
                    ErrorConstants.ERROR_MESSAGE_CAMERA_SET_LIGHT
                ));
            }
    }

    async setAutofocus(autofocusOn: boolean, torchOn: boolean | null): Promise<boolean> {
            try {
                this.getCodeReader().setAutofocus(autofocusOn, torchOn);
                return(autofocusOn);
            }
            catch (error) {
                throw (ManifestManagerErrorFactory.CreateManifestManagerError(
                    FunctionType.ScanningCamera,
                    ErrorConstants.ERROR_MESSAGE_CAMERA_SET_AUTOFOCUS
                ));
            }
    }

    get scannerEnabled(): boolean { return this._scannerEnabled; }
    async enableCamera(enabled: boolean): Promise<boolean> {
        try {
            if (!enabled) {
                await this.stopCamera();
                this._scannerEnabled = enabled;
                return enabled;
            } else if (this.device) {
                this._scannerEnabled = enabled;
                return enabled;
            }
            else {
                this._scannerEnabled = enabled;
                await this.initializeCamera();
                return enabled;
            }
        }
        catch (error) {
            this._scannerEnabled = !enabled;
            throw (this.createCameraError(error));
        }
    }

    private async initializeCamera(): Promise<IManifestManagerError> {
        this.initializing = true;
        try {
            if (this._hasPermission) {
                const devices: MediaDeviceInfo[] = await this.getCameras();
                this.selectCameraForScanning([...devices]);
                this.initializing = false;
                return ManifestManagerErrorFactory.CreateNoError();
            }
            else {
                throw(ManifestManagerErrorFactory.CreateManifestManagerError(
                    FunctionType.ScanningCamera,
                    ErrorConstants.ERROR_MESSAGE_CAMERA_NOT_ALLOWED
                ));
            }
        }
        catch (error) {
            this.initializing = false;
            throw (this.createCameraError(error));
        }
    }

    stopScanning(): void {
        this.initializing = null;
        if (this._decodingSubscription) {
            this._decodingSubscription.unsubscribe();
        }
        this.stopCamera();
    }

    async getCameras(): Promise<MediaDeviceInfo[]> {
        // Permissions aren't needed to get devices, but to access them and their info.
        const cameras = await this.getCodeReader().listVideoInputDevices() || [];
        this._hasCamera = cameras && cameras.length > 0;

        // This stores discovered devices and updates information.
        this._camerasFound = [...cameras];
        return cameras;
    }

    getCodeReader(): BrowserPDF417ContinuousReader {
        if (!this._bardcodeReader) {
            this._bardcodeReader = new BrowserPDF417ContinuousReader(500);
        }

        return this._bardcodeReader;
    }

    isCurrentDevice(device: MediaDeviceInfo) {
        return this.device && device && device.deviceId === this.device.deviceId;
    }

    restart(): void {
        const prevDevice = this._stopCamera();
        if (!prevDevice) {
            return;
        }
        this._bardcodeReader = undefined;
        this.device = prevDevice;
    }

    private getCameraErrorType(errorName: string): CameraErrorType {
        try {
            let cameraErrorType: CameraErrorType;
            cameraErrorType = CameraErrorType[errorName];
            return cameraErrorType;
        }
        catch (error) {
            console.log('Error converting Camera Error to Manifest Manager Camera Error Type:', error);
            return CameraErrorType.UnknownError;
        }
    } 

    // TODO: Move Error Handling to different service - possibly - there are too many functions 
    // in this class.  Functional areas that can be separated out should be separated
    // into a separate service and injected into this service to be called.
    createCameraError(error: unknown): IManifestManagerError {
        if (error instanceof ManifestManagerError) {
            return error;
        } else if (error instanceof DOMException) {
            return this.CreateCameraPermissionManifestManagerError(error);
        } else {
            return ManifestManagerErrorFactory.CreateManifestManagerError(
                FunctionType.ScanningCamera,
                ErrorConstants.ERROR_MESSAGE_CAMERA_UNKNOWN_ERROR + error
            );
        }
    }

    private CreateCameraPermissionManifestManagerError(err: DOMException): IManifestManagerError {
        // Failed to grant permission to video input
        let errorMessage: string;

        let permission: boolean;
        let cameraErrorType: CameraErrorType = this.getCameraErrorType(err.name);
        // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException
        // for explanation on possible errors.
        switch (cameraErrorType) {
            // This is usually caused by not secure origins.
            case CameraErrorType.NotSupportedError:
                permission = null;
                this._hasCamera = null;
                errorMessage = ErrorConstants.ERROR_MESSAGE_CAMERA_NOT_SUPPORTED;
                break;
            // User denied permission.
            case CameraErrorType.NotAllowedError:
                permission = false;
                this._hasCamera = true;
                errorMessage = ErrorConstants.ERROR_MESSAGE_CAMERA_NOT_ALLOWED;
                break;
            // The device has no attached input devices.
            case CameraErrorType.NotFoundError:
                permission = null;
                this._hasCamera = false;
                errorMessage = ErrorConstants.ERROR_MESSAGE_CAMERA_NOT_FOUND;
                break;
            // The device camera was not readable.
            case CameraErrorType.NotReadableError:
                permission = null;
                this._hasCamera = false;
                errorMessage = ErrorConstants.ERROR_MESSAGE_CAMERA_NOT_READABLE;
                break;
            default:
                permission = null;
                this._hasCamera = null;
                errorMessage = ErrorConstants.ERROR_MESSAGE_CAMERA_UNKNOWN_ERROR + err;
                break;
        }
        this.setUserPermissionToUseCamera(permission);

        return ManifestManagerErrorFactory.CreateManifestManagerError(
            FunctionType.ScanningCamera,
            errorMessage,
            null
        );
    }

    getAnyVideoDevice(): Promise<MediaStream> {
        var constraints = {
            audio: false,
            video: {
                height: 480,
                weight: 640
            }
        }
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    async askPermissionFromUser(): Promise<IManifestManagerError> {
        let stream: MediaStream;
        let permission: boolean;
        try {
            // Will try to ask for permission
            stream = await this.getAnyVideoDevice();
            permission = !!stream;
            await this.setUserPermissionToUseCamera(permission);
            await this.terminateStream(stream);
            return (ManifestManagerErrorFactory.CreateNoError());
        }
        catch (error) {
            this.terminateStream(stream);
            throw this.createCameraError(error);
        }
    }
    
    setUserPermissionToUseCamera(hasPermission: boolean | null): void {
        this._hasPermission = hasPermission;
        this._userHasPermissionToUseCamera = hasPermission;
    }

    terminateStream(stream: MediaStream) {
        if (stream) {
            stream.getTracks().forEach(t => t.stop());
        }
        stream = undefined;
    }

    private selectCameraForScanning(devices: MediaDeviceInfo[]) {

        // This selects the rear camera by default, otherwise take the last camera.
        const matcher = ({ label }) => /back|trás|rear|traseira|environment|ambiente/gi.test(label);
        this.device = devices.find(matcher) || devices.pop();
        
        if (!this.device) {
            throw new Error(ErrorConstants.ERROR_MESSAGE_CAMERA_NOT_FOUND);
        }
    }

    private dispatchScanSuccess(result: Result): void {
        this._audioService.play('scanned');
        this.ScannerStatusChanged.next(ScannerConstants.BOTTOM_SUCCESS);
        this.ScanSuccessChanged.next(result.getText());
        this._scanResult = result.getText();
    }
    
    private dispatchScanContinue(reason?: Exception): void {
        let numberOfDots: number;
        // Note from Richard: I might look at potentially scaling
        // this interval, based on processor speed later.  Though,
        // this is not a big deal.
        if (this._scanningCount < 15) {
            numberOfDots = 0;
        } else if (this._scanningCount < 30) {
            numberOfDots = 1;
        } else if (this._scanningCount < 45) {
            numberOfDots = 2;
        } else if (this._scanningCount < 60) {
            numberOfDots = 3;
        } else if (this._scanningCount < 75) {
            numberOfDots = 4;
        } else {
            numberOfDots = 5;
        }
        switch (numberOfDots) {
            case 0: {
                this.ScannerStatusChanged.next(ScannerConstants.BOTTOM_SCANNING_ZERO);
                this._scanningCount++;
                break;
            }
            case 1: {
                this.ScannerStatusChanged.next(ScannerConstants.BOTTOM_SCANNING_ONE);
                this._scanningCount++;
                break;
            }
            case 2: {
                this.ScannerStatusChanged.next(ScannerConstants.BOTTOM_SCANNING_TWO);
                this._scanningCount++;
                break;
            }
            case 3: {
                this.ScannerStatusChanged.next(ScannerConstants.BOTTOM_SCANNING_THREE);
                this._scanningCount++;
                break;
            }
            case 4: {
                this.ScannerStatusChanged.next(ScannerConstants.BOTTOM_SCANNING_FOUR);
                this._scanningCount++;
                break;
            }
            default: {
                this.ScannerStatusChanged.next(ScannerConstants.BOTTOM_SCANNING_FIVE);
                if (this._scanningCount = 90) {
                    this._scanningCount = 1;
                }
                break;
            }
        }
        
        this._scanFailure = reason;
    }

    private dispatchScanError(error: Exception): void {
        this._audioService.play('error');
        this.ScannerStatusChanged.next(ScannerConstants.BOTTOM_ERROR);
        this._scanError = error;
        this.ScanSuccessChanged.next('ERROR' + error.message);
    }

    private getBarcodeFormatOrFail(format: string | BarcodeFormat): BarcodeFormat {
        return typeof format === 'string'
            ? BarcodeFormat[format.trim().toUpperCase()]
            : format;
    }

    public stopCamera(): void {
        this._stopCamera();
    }

    private _stopCamera(): MediaDeviceInfo {

        if (!this._bardcodeReader) {
            return;
        }
        const device = this.device;
        // do not set this.device inside this method, it would create a recursive loop
        this._selectedCamera = null;
        this._bardcodeReader.stopScanning();
        return device;
    }

    private scanFromDevice(deviceId: string): void {
        const videoElement = this.PreviewElement.nativeElement;

        const codeReader = this.getCodeReader();
        
        const decodingStream = codeReader.StartContinuousDecodeFromInputVideoDevice(deviceId, videoElement);
        if (!decodingStream) {
            throw new Error('Undefined decoding stream, aborting.');
        }
        const next = (x: ResultAndError) => this._onDecodeResult(x.result, x.error);
        const error = (err: any) => this._onDecodeError(err);
        const complete = () => {
            this.stopCamera();
        };
        this._decodingSubscription = decodingStream.subscribe(next, error, complete);
        this.ScannerStatusChanged.next(ScannerConstants.BOTTOM_START_TEXT);
    }

    private _onDecodeError(err: any) {
        this.dispatchScanError(err);
        //this.reset();
    }

    private _onDecodeResult(result: Result, error: Exception): void {
        if (result) {
            this.dispatchScanSuccess(result);
        } else if (error && error.message === 'scan paused') {
            // Do nothing.
        } else {
            this.dispatchScanContinue(error);
        }
    }
}
