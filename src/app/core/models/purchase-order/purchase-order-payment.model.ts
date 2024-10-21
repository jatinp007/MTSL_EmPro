export interface PurchaseOrderPayment {
    id: number;
    purchaseOrderId: number;
    creditTerm: string;
    priceBasis: string;
    currencyExchRate: string;
    closingValue: number;
    costCentre: string;
    createdDate: string; 
    updatedDate: string; 
  }