// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

export default class System {
    /**
     * Makes a copy of a array.
     */
    public static arraycopy(src: any, srcPos: number, dest: any, destPos: number, length: number): void {
        // TODO: better use split or set?
        while (length--) {
            dest[destPos++] = src[srcPos++];
        }
    }

    /**
     * Returns the current time in milliseconds.
     */
    public static currentTimeMillis(): number {
        return Date.now();
    }
}
