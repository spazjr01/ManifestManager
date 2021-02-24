// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import GridSampler from './GridSampler';
//import DefaultGridSampler from './DefaultGridSampler';

//export default class GridSamplerInstance {

//    private static gridSampler: GridSampler = new DefaultGridSampler();

//    /**
//     * Sets the implementation of GridSampler used by the library. One global
//     * instance is stored, which may sound problematic. But, the implementation provided
//     * ought to be appropriate for the entire platform, and all uses of this library
//     * in the whole lifetime of the JVM. For instance, an Android activity can swap in
//     * an implementation that takes advantage of native platform libraries.
//     *
//     * @param newGridSampler The platform-specific object to install.
//     */
//    public static setGridSampler(newGridSampler: GridSampler): void {
//        GridSamplerInstance.gridSampler = newGridSampler;
//    }

//    /**
//     * @return the current implementation of GridSampler
//     */
//    public static getInstance(): GridSampler {
//        return GridSamplerInstance.gridSampler;
//    }

//}
