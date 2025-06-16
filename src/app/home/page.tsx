"use client"

"use client"

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phoneNumber: string;
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  stitchingCost: number;
  createdAt: string;
}

const mockOrderData: Order = {
  id: "1",
  orderNumber: "ORD-12345",
  customerName: "Avinash Reddy K",
  phoneNumber: "+6245875878",
  stitchingCost: 200,
  createdAt: "2023-05-15T10:00:00Z",
  products: [
    {
      id: "1",
      name: "Kurtas Pajama",
      price: 1500,
      quantity: 2
    },
    {
      id: "2",
      name: "Sherwani",
      price: 3500,
      quantity: 1
    }
  ]
};

const OrderDetails: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrder(mockOrderData);
      } catch (err) {
        setError('Failed to fetch order data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateTotal = (): number => {
    if (!order) return 0;
    return order.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      order.stitchingCost
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>No order data available</p>;

  return (
    <div style={{
      padding: '2rem',
      display: 'wrap-flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <div className="flex justify-content-between align-items-center mb-4">
          <h1>Order Details</h1>
          <Button 
            label="New" 
            icon="pi pi-plus" 
            className="p-button-raised p-button-secondary" 
          />
        </div>

        <div style={{
          color: '#4568',
          padding: '2rem',
          marginBottom: '1rem'
        }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-6">
              <div className="field">
                <label>Name</label>
                <InputText value={order.customerName} readOnly />
              </div>
            </div>
            <div className="col-12 md:col-6">
              <div className="field">
                <label>Phone Number</label>
                <InputText value={order.phoneNumber} readOnly />
              </div>
            </div>
            <div className="col-12 md:col-6">
              <div className="field">
                <label>Order Number</label>
                <InputText value={order.orderNumber} readOnly />
              </div>
            </div>
          </div>

          <div className="mt-4 border-top-1 border-300 pt-4">
            <p className="font-semibold">Order Details</p>
            <div className="mt-2">
              <p><strong>Customer Name:</strong> {order.customerName}</p>
              <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
              <p><strong>Order Number:</strong> {order.orderNumber}</p>
            </div>
            <Button
              label="View-Details"
              icon="pi pi-eye"
              className="p-button-text"
              onClick={() => setVisible(true)}
              style={{ color: '#1976d2' }}
            />
          </div>
        </div>

        <Dialog
          header="Order Products"
          visible={visible}
          style={{ width: '50vw' }}
          onHide={() => setVisible(false)}
        >
          {order.products.map(product => (
            <Card key={product.id} title={product.name} className="mb-3">
              <div className="grid">
                <div className="col-6">
                  <p>Quantity: {product.quantity}</p>
                </div>
                <div className="col-6 text-right">
                  <p>Price: ₹{product.price.toFixed(2)}</p>
                </div>
              </div>
            </Card>
          ))}
          <div className="mt-3">
            <div className="flex justify-content-between">
              <p>Stitching Cost:</p>
              <p>₹{order.stitchingCost.toFixed(2)}</p>
            </div>
            <div className="flex justify-content-between font-bold text-xl">
              <p>Total Amount:</p>
              <p>₹{calculateTotal().toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-content-end gap-2 mt-4">
            <Button label="Send Bill" icon="pi pi-send" className="p-button-outlined" />
            <Button label="Print Bill" icon="pi pi-print" className="p-button-outlined" />
          </div>
        </Dialog>
      </div>

      <div className="flex justify-content-center" style={{ marginTop: 'auto', paddingBottom: '1rem' }}>
        <Button
          label="Receive Payment"
          icon="pi pi-check"
          className="p-button-raised"
          style={{ 
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            width: '200px'
          }}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
