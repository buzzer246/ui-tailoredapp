import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

interface OrderReceiptProps {
  orderNumber: string;
  productName: string;
  trailDate: string;
  deliveryDate: string;
  receivedDate: string;
}

const OrderReceiptCard: React.FC<OrderReceiptProps> = ({
  orderNumber = '8',
  productName = 'Kurtas Pajama',
  trailDate = '2023-06-15',
  deliveryDate = '2023-06-20',
  receivedDate = '2023-06-18',
}) => {
  const header = (
    <div className="flex justify-content-between align-items-center">
      <div>
        <Tag value="New" severity="success" icon="pi pi-check" />
      </div>
      <div className="text-right">
        <span className="text-sm">Below order no:</span>
        <span className="font-bold ml-1">{orderNumber}</span>
      </div>
    </div>
  );

  const footer = (
    <div className="flex justify-content-center">
      <span className="text-sm">
        <i className="pi pi-calendar mr-1"></i>
        Received with Date: {receivedDate}
      </span>
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        title="Order Receipt"
        subTitle="Stitching Details"
        header={header}
        footer={footer}
        className="md:w-25rem"
      >
        <div className="flex justify-content-between mb-3">
          <div className="font-bold">Product Name:</div>
          <div>{productName}</div>
        </div>

        <Divider />

        <div className="flex justify-content-between mb-3">
          <div className="font-bold">Status:</div>
          <Tag value="Accepted" severity="info" icon="pi pi-thumbs-up" />
        </div>

        <Divider />

        <div className="flex justify-content-between mb-3">
          <div className="font-bold">Trail Date:</div>
          <div>
            <i className="pi pi-calendar mr-1"></i>
            {trailDate}
          </div>
        </div>

        <Divider />

        <div className="flex justify-content-between">
          <div className="font-bold">Delivery Date:</div>
          <div>
            <i className="pi pi-calendar mr-1"></i>
            {deliveryDate}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderReceiptCard;
