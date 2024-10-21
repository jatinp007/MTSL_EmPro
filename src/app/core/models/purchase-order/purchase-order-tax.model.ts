export interface PurchaseOrderTaxCharge {
    id: number;
    purchaseOrderItemId: number;
    type: string;
    code: string;
    description: string;
    taxValue: number;
    secondaryTax: boolean;
    secondaryTaxValue: number;
  }