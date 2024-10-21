import { PurchaseOrderTaxCharge } from "./purchase-order-tax.model";

export interface PurchaseOrderItem {
    id: number;
    purchaseOrderId: number;
    itemCode: string;
    itemDesc: string;
    quantity: number;
    uom: string;
    prSoRfq: string;
    price: number;
    discountPercent: number;
    discountValue: number;
    netPrice: number;
    totalAmount: number;
    hsnSac: string;
    partialShipment: boolean;
    tolerance: number;
    purchaseOrderTaxCharges: PurchaseOrderTaxCharge[];
  }
  