export enum Source { NOT_SET, SCAN, EDIPI, SSN };
export enum AddResult {
    NOT_SET,
    ADDED_WITH_AVAILABLE_POOL_DATA,
    ADDED_WITH_BARCODE_DATA_ONLY,
    ALREADY_IN_MANIFEST,
    FAILED__NOT_IN_AVAILABLE_POOL,
    FAILED__INVALID_BARCODE_ZERO_LENGTH,
    FAILED__INVALID_BARCODE_UNRECOGNIZED_LENGTH
};
export enum PersonnelType { ServiceMember, Civilian, ForeignNational };
export enum ScanStatus { Waiting, Scanned, Manifested, Failed };

export enum BarcodeType {        // The numeric value represents the length of each barcode type.
    InvalidBarcode = -1,
    NonBarcode = 0,
    OneDimensional = 18,          // 1D barcode on back of CAC
    TwoDimensional_Version1 = 88, // 2D barcode on front of CAC.  Version 1 does not have the middle initial for the name.
    TwoDimensional_Version2 = 89, // 2D barcode on front of CAC.  Version 2 has the middle initial.
    TwoDimensional_Verions3 = 99, // 2D barcode on front of CAC.  Effective Oct 2018, the SSN was removed from this barcode
    LoaId = 6                     // Letter Of Authorization barcode for SPOT Contrators
}

export enum ErrorType {
    NoError = -1, LogInError, LogOutError, GetAuthUnitsError,
    GetManifestsError, AddManifestError, EditManifestError, DeleteManifestError,
    GetManifestDetailsError, AddPersonError, DeletePersonError, ViewPersonError,
    GetSettingsError, EditSettingError, ScanningBrowserError, ScanningCameraError
}  
export enum FunctionType {
    LogIn, LogOut, GetAuthUnits,
    GetManifests, AddManifest, EditManifest, DeleteManifest, 
    GetManifestDetails, AddPerson, DeletePerson, ViewPerson,
    GetSettings, EditSetting, ScanningBrowser, ScanningCamera
}

export enum ScannerActionType {
    None, StartScanner
}

export enum CameraErrorType {
    NotSupportedError, NotAllowedError, NotFoundError, NotReadableError, UnknownError
}


