import { PurchaseOrderItem } from "./purchase-order-item.model";
import { PurchaseOrderPayment } from "./purchase-order-payment.model";
import { PurchaseOrderSupplier } from "./purchase-order-supplier.model";

export interface PurchaseOrder {
    id: number;
    tenant: string;
    purchaseOrderNo: string;
    businessUnit: string;
    shipTo: string;
    projectCode: string;
    buyer: string;
    category: string;
    type: string;
    nature: string;
    validFrom: string; 
    validTo: string;
    requiredDate: string;
    salesOrderRef: string;
    refDocNo: string;
    salesOrderDoc: string[];
    purchaseOrderPayment: PurchaseOrderPayment;
    purchaseOrderSupplier: PurchaseOrderSupplier;
    purchaseOrderItems: PurchaseOrderItem[];
  }