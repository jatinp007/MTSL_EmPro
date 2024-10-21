import { PurchaseOrder } from "../../../../core/models/purchase-order/purchase-order.model";

export interface PuchaseOrderResponse {
    success: boolean;
    message: string;
    data: PurchaseOrder[];
  }