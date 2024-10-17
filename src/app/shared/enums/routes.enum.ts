export enum ApplicationRoutes {
    LOGIN = 'login',
    VERIFICATION_CODE = 'verify-code',

    // Main container for purchase order related routes
    PURCHASE_ORDER_CONTAINER = 'purchase-order',
    PURCHASE_ORDER = `${PURCHASE_ORDER_CONTAINER}/list`,
    // Routes for main functionalities
    PURCHASE_ORDER_LIST = `list`,
    CREATE_PURCHASE_ORDER = `create`,

    // Sub-routes for the creation process
    GENERAL_DETAILS = `${CREATE_PURCHASE_ORDER}/general-details`,
    SUPPLIER_PAYMENT_DETAILS = `${CREATE_PURCHASE_ORDER}/supplier-payment-details`,
    MATERIAL_DETAILS = `${CREATE_PURCHASE_ORDER}/material-details`,
    TAXES_CHARGES_DETAILS = `${CREATE_PURCHASE_ORDER}/taxes-charges-details`,
    CONFIRMATION = `${CREATE_PURCHASE_ORDER}/confirmation`,

    // Popups
    SUPPLIER_LIST_POPUP = `${PURCHASE_ORDER_CONTAINER}/supplier-list-popup`,
    MATERIAL_LIST_POPUP = `${PURCHASE_ORDER_CONTAINER}/material-list-popup`,

}