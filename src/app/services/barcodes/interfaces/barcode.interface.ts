// Manifest Manager classes and components
import { BarcodeType } from '../../../shared/enumerations/enumerations';
import { IBarcodeParser } from './barcode-parser.interface';

export interface IBarcode {

    ErrorText: string;
    IsValidLength: boolean;
    BarcodeText: string;
    Status: string;
    Type: BarcodeType;
    BarcodeParser: IBarcodeParser;
}