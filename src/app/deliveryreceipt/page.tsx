"use client"

import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';

interface DeliveryReceipt {
  id: string;
  orderNumber: string;
  deliveryDate: string;
  trialDate: string;
  type: string;
  status: string;
  items: {
    name: string;
    type: 'top' | 'bottom';
  }[];
  priceBreakup: {
    stitchingCost: number;
    additionalCharges: number;
    discount: number;
    totalCost: number;
  };
  customerName: string;
}

export const fetchDeliveryReceipt = async (): Promise<DeliveryReceipt> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: '12345',
    orderNumber: 'ORD-2023-0567',
    deliveryDate: '2023-12-15',
    trialDate: '2023-12-10',
    type: 'Stitching',
    status: 'Accepted',
    customerName: 'John Doe',
    items: [
      { name: 'Kurta Pajama', type: 'top' },
      { name: 'Kurta Pajama', type: 'bottom' }
    ],
    priceBreakup: {
      stitchingCost: 1200,
      additionalCharges: 200,
      discount: 100,
      totalCost: 1300
    }
  };
};

const DeliveryReceipt: React.FC = () => {
  const [receipt, setReceipt] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDeliveryReceipt();
        setReceipt(data);
      } catch (error) {
        console.error('Error fetching receipt:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getSeverity = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      default:
        return 'info';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <ProgressSpinner />
      </div>
    );
  }

  if (!receipt) {
    return <div>Error loading receipt data</div>;
  }

  return (
    <div className="p-4">
      <Card>
        <div className="flex justify-content-between align-items-center mb-4">
          <h1 className="text-2xl font-bold">Delivery Receipt</h1>
          <Button label="New" icon="pi pi-plus" className="p-button-raised p-button-primary" />
        </div>

        <div className="grid">
          <div className="col-12 md:col-6">
            <div className="field">
              <label className="font-bold block mb-2">Customer Name</label>
              <div>{receipt.customerName}</div>
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="field">
              <label className="font-bold block mb-2">Order Number</label>
              <div>{receipt.orderNumber}</div>
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="field">
              <label className="font-bold block mb-2">Delivery Date</label>
              <div>{receipt.deliveryDate}</div>
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="field">
              <label className="font-bold block mb-2">Trial Date</label>
              <div>{receipt.trialDate}</div>
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="field">
              <label className="font-bold block mb-2">Type</label>
              <div>{receipt.type}</div>
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="field">
              <label className="font-bold block mb-2">Status</label>
              <Tag value={receipt.status} severity={getSeverity(receipt.status)} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold mb-3">Items</h3>
          <div className="grid">
            {receipt.items.map((item: any, index: number) => (
              <div key={index} className="col-12 md:col-6">
                <Card className="mb-3">
                  <div className="font-bold">{item.name} ({item.type})</div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold mb-3">Price Breakup</h3>
          <div className="grid">
            <div className="col-12 md:col-6">
              <div className="field grid">
                <label className="col-6 font-bold">Stitching Cost:</label>
                <div className="col-6">₹{receipt.priceBreakup.stitchingCost}</div>
              </div>
              <div className="field grid">
                <label className="col-6 font-bold">Additional Charges:</label>
                <div className="col-6">₹{receipt.priceBreakup.additionalCharges}</div>
              </div>
              <div className="field grid">
                <label className="col-6 font-bold">Discount:</label>
                <div className="col-6">- ₹{receipt.priceBreakup.discount}</div>
              </div>
              <div className="field grid mt-3 pt-2">
                <label className="col-6 font-bold text-lg">Total Cost:</label>
                <div className="col-6 text-lg font-bold">₹{receipt.priceBreakup.totalCost}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DeliveryReceipt;
