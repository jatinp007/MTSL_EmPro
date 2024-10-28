import { Component } from '@angular/core';
@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrl: './material-details.component.css'
})
export class MaterialDetailsComponent {
  displayedColumns = [
    'nhash',
    'materialServices',
    'quantity',
    'uom',
    'price',
    'discount',
    'discountValue',
    'netPrice',
    'totalPrice',
    'stockToDate',
    'prSoRfq',
    'partialShipment',
    'tolerance',
    'hsnSacCode',
    'costCentre',
    'projectCode',
    'brandName',
    'supplierCode',
    'remarks',
  ];
  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  nhash: number;
  materialServices: string;
  quantity: string;
  uom: string;
  price: string;
  discount: string;
  discountValue: string;
  netPrice: string;
  totalPrice: string;
  stockToDate: string;
  prSoRfq: string;
  partialShipment: string;
  tolerance: string;
  hsnSacCode: string;
  costCentre: string;
  projectCode: string;
  brandName: string;
  supplierCode: string;
  remarks: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    nhash: 1,
    materialServices: 'Material A',
    quantity: '100',
    uom: 'kg',
    price: '10.00',
    discount: '5%',
    discountValue: '0.50',
    netPrice: '9.50',
    totalPrice: '950.00',
    stockToDate: '50',
    prSoRfq: 'PR001',
    partialShipment: 'Yes',
    tolerance: '5%',
    hsnSacCode: '1234',
    costCentre: 'CC001',
    projectCode: 'PC001',
    brandName: 'Brand X',
    supplierCode: 'SC001',
    remarks: 'Sample remark 1'
  },
  {
    nhash: 2,
    materialServices: 'Material B',
    quantity: '200',
    uom: 'kg',
    price: '15.00',
    discount: '10%',
    discountValue: '1.50',
    netPrice: '13.50',
    totalPrice: '2700.00',
    stockToDate: '100',
    prSoRfq: 'PR002',
    partialShipment: 'No',
    tolerance: '10%',
    hsnSacCode: '2345',
    costCentre: 'CC002',
    projectCode: 'PC002',
    brandName: 'Brand Y',
    supplierCode: 'SC002',
    remarks: 'Sample remark 2'
  },
  {
    nhash: 3,
    materialServices: 'Material C',
    quantity: '150',
    uom: 'kg',
    price: '20.00',
    discount: '15%',
    discountValue: '3.00',
    netPrice: '17.00',
    totalPrice: '2550.00',
    stockToDate: '75',
    prSoRfq: 'PR003',
    partialShipment: 'Yes',
    tolerance: '15%',
    hsnSacCode: '3456',
    costCentre: 'CC003',
    projectCode: 'PC003',
    brandName: 'Brand Z',
    supplierCode: 'SC003',
    remarks: 'Sample remark 3'
  },
  {
    nhash: 4,
    materialServices: 'Material A',
    quantity: '100',
    uom: 'kg',
    price: '10.00',
    discount: '5%',
    discountValue: '0.50',
    netPrice: '9.50',
    totalPrice: '950.00',
    stockToDate: '50',
    prSoRfq: 'PR001',
    partialShipment: 'Yes',
    tolerance: '5%',
    hsnSacCode: '1234',
    costCentre: 'CC001',
    projectCode: 'PC001',
    brandName: 'Brand X',
    supplierCode: 'SC001',
    remarks: 'Sample remark 1'
  },
  {
    nhash: 5,
    materialServices: 'Material B',
    quantity: '200',
    uom: 'kg',
    price: '15.00',
    discount: '10%',
    discountValue: '1.50',
    netPrice: '13.50',
    totalPrice: '2700.00',
    stockToDate: '100',
    prSoRfq: 'PR002',
    partialShipment: 'No',
    tolerance: '10%',
    hsnSacCode: '2345',
    costCentre: 'CC002',
    projectCode: 'PC002',
    brandName: 'Brand Y',
    supplierCode: 'SC002',
    remarks: 'Sample remark 2'
  },
  {
    nhash: 6,
    materialServices: 'Material C',
    quantity: '150',
    uom: 'kg',
    price: '20.00',
    discount: '15%',
    discountValue: '3.00',
    netPrice: '17.00',
    totalPrice: '2550.00',
    stockToDate: '75',
    prSoRfq: 'PR003',
    partialShipment: 'Yes',
    tolerance: '15%',
    hsnSacCode: '3456',
    costCentre: 'CC003',
    projectCode: 'PC003',
    brandName: 'Brand Z',
    supplierCode: 'SC003',
    remarks: 'Sample remark 3'
  }
];

