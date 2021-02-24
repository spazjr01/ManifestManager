// Manifest Manager classes and components
import { IScannerTip } from '../interfaces/scanner-tip.interface';
import { ScannerTip } from '../scanner-tip.model';

export class ScannerTipFactory {
    static CreateGenericScannerTip(): IScannerTip {
        return new ScannerTip();
    }

    static CreateScannerTip(
        title: string,
        information: string,
        informationTitle: string,
        topTextStart: string,
        topTextProcessing: string,
        topTextSuccess: string,
        topTextError: string,
        bottomTextStart: string,
        bottomTextProcessing: string,
        bottomTextSuccess: string,
        bottomTextError: string
    ) {
        let scannerTip: IScannerTip = this.CreateGenericScannerTip();
        scannerTip.Title = title;
        scannerTip.Information = information;
        scannerTip.InformationTitle = informationTitle;
        scannerTip.TopTextStart = topTextStart;
        scannerTip.TopTextProcessing = topTextProcessing;
        scannerTip.TopTextSuccess = topTextSuccess;
        scannerTip.TopTextError = topTextError;
        scannerTip.BottomTextStart = bottomTextStart;
        scannerTip.BottomTextProcessing = bottomTextProcessing;
        scannerTip.BottomTextSuccess = bottomTextProcessing;
        scannerTip.BottomTextError = bottomTextError;
        return scannerTip;
    }
}