// Manifest Manager classes and components
import { IScannerTip } from './interfaces/scanner-tip.interface';

export class ScannerTip implements IScannerTip {
    Title: string;
    Information: string;
    InformationTitle: string;
    TopTextStart: string;
    TopTextProcessing: string;
    TopTextSuccess: string;
    TopTextError: string;
    BottomTextStart: string;
    BottomTextProcessing: string;
    BottomTextSuccess: string;
    BottomTextError: string;

    constructor() {
        this.Title = '';
        this.Information = '';
        this.InformationTitle = '';
        this.TopTextStart = '';
        this.TopTextProcessing = '';
        this.TopTextSuccess = '';
        this.TopTextError = '';
        this.BottomTextStart = '';
        this.BottomTextProcessing = '';
        this.BottomTextSuccess = '';
        this.BottomTextError = '';
    }
}