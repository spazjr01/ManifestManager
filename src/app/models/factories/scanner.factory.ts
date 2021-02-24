// Manifest Manager classes and components
import { IScanner } from '../interfaces/scanner.interface';
import { Scanner } from '../scanner.model';

export class ScannerFactory {
    static CreateScanner(): IScanner {
        return new Scanner();
    }
}