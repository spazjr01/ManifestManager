// Angular libraries
import { Injectable } from '@angular/core';

// Manifest Manager classes and components
import { ScannerTipFactory } from '../models/factories/scanner-tip.factory';
import { IScannerTip } from '../models/interfaces/scanner-tip.interface';
import { ScannerConstants } from '../shared/constants/scanner.constants';

@Injectable({
  providedIn: 'root'
})

export class ScannerTipService {
    scannerTip: IScannerTip;
    constructor() {
        this.scannerTip = ScannerTipFactory.CreateGenericScannerTip();
        this.scannerTip.TopTextStart = ScannerConstants.TOP_START_TEXT;
        this.scannerTip.BottomTextStart = ScannerConstants.BOTTOM_START_TEXT;
        this.scannerTip.InformationTitle = ScannerConstants.INFO_TITLE;
        this.scannerTip.Information = ScannerConstants.DEFAULT_INFO_TEXT;
    }

    setScanInformation(torchCompatible: boolean, autofocusCompatible: boolean) {
        if (torchCompatible && autofocusCompatible) {
            this.scannerTip.Information =
                ScannerConstants.DEFAULT_INFO_TEXT +
                ScannerConstants.AUTOFOCUS_TEXT +
                ScannerConstants.LIGHT_TEXT;
        } else if (torchCompatible) {
            this.scannerTip.Information =
                ScannerConstants.DEFAULT_INFO_TEXT +
                ScannerConstants.LIGHT_TEXT;
        } else if (autofocusCompatible) {
            this.scannerTip.Information =
                ScannerConstants.DEFAULT_INFO_TEXT +
                ScannerConstants.AUTOFOCUS_TEXT
        } else {
            this.scannerTip.Information =
                ScannerConstants.DEFAULT_INFO_TEXT;
        }
    }
}
