// Manifest Manager classes and components
import { IPerson } from '../../../models/interfaces/person.interface';

export interface IBarcodeParser {
    ParseBarcode(barcodeText: string): IPerson;
}