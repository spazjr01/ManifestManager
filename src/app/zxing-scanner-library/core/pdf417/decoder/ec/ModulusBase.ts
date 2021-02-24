// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

import IllegalArgumentException from '../../../IllegalArgumentException';
import ArithmeticException from '../../../ArithmeticException';
import Exception from '../../../Exception';

export default class ModulusBase {

    protected /*final*/ logTable: Int32Array | undefined;
    protected /*final*/ expTable: Int32Array | undefined;
    protected /*final*/ modulus: number | undefined;

    add(a: number, b: number): number {
        if (this.modulus) {
            return (a + b) % this.modulus;
        }
        throw new Exception('number is undefined.');
    }

    subtract(a: number, b: number): number {
        if (this.modulus) {
            return (this.modulus + a - b) % this.modulus;
        }
        throw new Exception('number is undefined.');
    }

    exp(a: number): number {
        if (this.expTable) {
            return this.expTable[a];
        }
        throw new Exception('expTable is undefined.');
    }

    log(a: number): number {
        if (a === 0) {
            throw new IllegalArgumentException();
        }
        if (this.logTable) {
            return this.logTable[a];
        }
        throw new Exception('logTable is undefined.');
    }

    inverse(a: number): number {
        if (a === 0) {
            throw new ArithmeticException();
        }
        if (this.expTable && this.modulus && this.logTable) {
            return this.expTable[this.modulus - this.logTable[a] - 1];
        }
        throw new Exception('expTable or modulus or logTable is undefined. Run debugger to verify.');
     }

    multiply(a: number, b: number): number {
        if (a === 0 || b === 0) {
            return 0;
        }
        if (this.expTable && this.logTable && this.modulus) {
            return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.modulus - 1)];
        }
        throw new Exception('expTable or logTable or modulus is undefined.  Run debugger to verify.');
    }

    getSize(): number {
        if (this.modulus) {
            return this.modulus;
        }
        throw new Exception('modulus is undefined.');
    }

    equals(o: Object): boolean {
        return o === this;
    }
}
