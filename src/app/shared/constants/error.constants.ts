export class ErrorConstants {

    // Partials
    static MANIFEST_MANAGER_ENCOUNTERED_ERROR: string = 'The Manifest Manager encountered the following error';
    static THE_FOLLOWING_ERROR_OCCURED: string = 'The following error occurred';

    // Error Message Titles
    static ERROR_TITLE_LOG_IN: string = 'Log In Error';
    static ERROR_TITLE_GET_AUTH_UNITS: string = 'Authorized Units Error';
    static ERROR_TITLE_GET_MANIFESTS: string = 'Manifests Retrieval Error';
    static ERROR_TITLE_ADD_MANIFEST: string = 'Add Manifest Error';
    static ERROR_TITLE_EDIT_MANIFEST: string = 'Edit Manifest Error';
    static ERROR_TITLE_DELETE_MANIFEST: string = 'Delete Manifest Error';
    static ERROR_TITLE_GET_MANIFEST_DETAILS: string = 'Manifested Personnel Retrieval Error';
    static ERROR_TITLE_ADD_PERSON: string = 'Add Person Error';
    static ERROR_TITLE_DELETE_PERSON: string = 'Delete Person Error';
    static ERROR_TITLE_GET_PERSON: string = 'View Person Error';
    static ERROR_TITLE_GET_SETTINGS: string = 'Settings Retrieval Error';
    static ERROR_TITLE_EDIT_SETTING: string = 'Edit Setting Error';
    static ERROR_TITLE_BROWSER: string = 'Browser Error';
    static ERROR_TITLE_CAMERA: string = 'Camera Error';

    // Authorization Error Messages
    static ERROR_MESSAGE_LOG_IN: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' during the log in attempt: ';

    // Authorized Units Error Messages
    static ERROR_MESSAGE_GET_AUTH_UNITS: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' while retrieving your authorized units: ';

    // Manifest Error Messages
    static ERROR_MESSAGE_GET_MANIFESTS: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' while retrieving manifests: ';
    static ERROR_MESSAGE_ADD_MANIFEST: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' while adding the manifest: ';
    static ERROR_MESSAGE_EDIT_MANIFEST: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' while editing the manifest: ';
    static ERROR_MESSAGE_DELETE_MANIFEST: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' while deleting the manifest: ';

    // Person Error Messages
    static ERROR_MESSAGE_GET_MANIFEST_DETAILS: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' while retrieving manifested personnel: ';
    static ERROR_MESSAGE_ADD_PERSON: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' while adding the person: ';
    static ERROR_MESSAGE_DELETE_PERSON: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' while deleting the person: ';
    static ERROR_MESSAGE_GET_PERSON: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' while retrieving the person\'s record: ';

    // Setting Error Messages
    static ERROR_MESSAGE_GET_SETTINGS: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' while retrieving setting: ';
    static ERROR_MESSAGE_EDIT_SETTING: string = ErrorConstants.THE_FOLLOWING_ERROR_OCCURED + ' while editing the setting: ';

    // Browser Error Messages
    static ERROR_MESSAGE_BROWSER_NOT_SUPPORTED: string = 'The current browser is not supported.  You must use Chrome for this function.';

    // Camera Error Messages
    static ERROR_MESSAGE_CAMERA_NOT_FOUND: string = 'No camera was detected for scanning.';
    static ERROR_MESSAGE_CAMERA_NOT_SUPPORTED: string = 'This operation is not supported.';
    static ERROR_MESSAGE_CAMERA_NOT_ALLOWED: string = 'The user denied access to the camera.';
    static ERROR_MESSAGE_CAMERA_NOT_READABLE: string = 'The Manifest Manager was unable to read the device to determine camera availability and access.  It may be in use by another application.';
    static ERROR_MESSAGE_CAMERA_UNKNOWN_ERROR: string = 'The Manifest Manager encountered the following unknown, camera-related error: ';
    static ERROR_MESSAGE_CAMERA_SET_LIGHT: string = ErrorConstants.MANIFEST_MANAGER_ENCOUNTERED_ERROR + ' while attempting to set the light: ';
    static ERROR_MESSAGE_CAMERA_SET_AUTOFOCUS: string = ErrorConstants.MANIFEST_MANAGER_ENCOUNTERED_ERROR + ' while attempting to set the autofocus: ';
    static ERROR_MESSAGE_CAMERA_GET_SUBSCRIPTIONS: string = ErrorConstants.MANIFEST_MANAGER_ENCOUNTERED_ERROR + ' while attempting to get required camera subscriptions: ';
}