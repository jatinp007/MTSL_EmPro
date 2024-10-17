export enum CONSTANTS {
    UNAUTHORIZED = 'UNAUTHORIZED',
    INVALID_USER_ID = 'Invalid user id',
    DATE_MANDATORY = 'End Date is Mandatory',
    INVALID_LOGIN_CREDENTIALS = 'Invalid login credentials',
    WRONG_USERNAME_PASSWORD = 'You have entered wrong username or password',
    PAGE_NOT_FOUND = "Page Not Found",
    AG_GRID_THEME = "ag-theme-quartz",
    SUCCESS = 'Operation Completed Successfully.',
    RECORD_NOT_FOUND = 'Record not found.',
    DIALOG_BOX_CLOSE_MESSAGE = 'Are you sure want to close? You will loose your unsaved data!',
    YES = 'Yes',
    NO = 'No',
    SAVE = 'Save',
    NO_CHANGES_TO_SAVE = 'No changes to Save.',
    DELETE_RECORD_CONCENT = 'Are you sure you want to delete this record?',
    INPUT_BOX_EMPTY = "Mandatory field cannot be left blank.",
    POLICY = 'Please accept the policy to proceed.',
    CONFIGURETHEPOLICY = 'Policy is not configured.',
    ERROR = "ERROR",
    TEMP_PWD_ALERT = "Temporary password is already generated. Kindly login through mail.",
    APPNOTASSIGNED = 'App is not assigned to user',
 }
 export enum ERROR_CODES {
    SUCCESS = "0006",
    VERIFIED_STATUS = "0005",
    UNAUTHORIZED = 401,
    ISSUCCESS = "SUCCESS"
 }
 
 
 export enum AG_GRID_THEME {
    AG_THEME_QUARTZ = "ag-theme-quartz"
  }
  
 export enum RESPONSE {
    SUCCESS = "success",
    ERROR = "error"
  }
 
 export enum URL {
    // API_URL = 'http://localhost:7079',
    // API_URL = 'http://172.29.58.109:9133/ccd'
    // API_URL = 'http://172.29.58.109:7079/ccd'
    // API_URL = ' http://172.29.58.109:9133/ccd'
    ADM_BASE_URL = 'http://localhost:7079/',
 }
 
 export enum PATH {
    LOGIN = 'login',
    // for testing purpose
    GET_DEVICE_MASTER = 'api/deviceMaster',
    GET_MENUDETAILS = 'getMenuList',
    GET_CONFIGDETAILS = 'getConfigList',
    GET_MENU = 'getMainMenu',
    GET_SUBMENU = 'getSubMenu',
    GET_NESTEDMENU = 'getNestedMenu',
    CHECKISPOLICYACCEPTED = 'isPolicyAccepetedCheck',
    GET_POLICY_DETAILS = 'getPolicyDetails',
    UPDATE_POLICY_DETAILS = 'updatePolicyAcceptanceDetails',
    LAST_VISITEDTIME = 'lastvisitedtime',
    LOGOUT = 'logout1',
    CAPTCHA = 'getCaptcha',
    GET_ALL_LANGUAGE_COMBO = "getAllLanguageCombo",
    UPDATE_PREFFERED_LANGUAGE = 'updateUserPrefferedLanguage',
    GET_OKTA_DATA='getOctaData',
    GENERATE_PASSWORD = 'temppwd'
 };
 
 export enum SERVER_PATHS {
    DEV = '/',
 };
 
 export enum DATE_FORMAT {
    DATE = 'dd-MMM-yyyy'
 };
 
 export enum LOCALE {
    EN_US = 'en-US'
 };
 
 export enum SESSION_STORAGE {
    USER_DATA = 'userdata',
    TOKEN = 'token',
    PREFERREDLANG = 'preferredLang',
    USER_EMAIL = 'email',
    DOMAIN = 'domain',
    USER_NAME = 'username',
    PANEL_ID_AND_SUPER_ADMIN_DATA = "PANEL_ID_AND_SUPER_ADMIN_DATA",
 }
 
 export enum TOAST_TYPE {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    RECORD_SAVED = 'Record Saved Successfully'
 }
 
 export const DASHBOARD_DICT=[
    "70","187"
 ]
 
 export const RELEASE_NOTES = ['29','37','63','64','71','102','238','111','250','251','252' ,'287','278'];
 // export const CHANGE_PASSWORD = ['685','686','687','36','37','693','694','695','696','697','698','699','703','236','730','737','729','730','731','732','733','734','735','736','304','297','298'];
 
 export const CHANGE_PASSWORD = [685, 686, 687, 36, 37, 693, 694, 695, 696, 697, 698, 699, 703, 236, 730, 737, 729, 730, 731, 732, 733, 734, 735, 736, 304, 297, 298];
 