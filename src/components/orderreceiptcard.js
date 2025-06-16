import OrderReceiptCard from './orderreceiptcard';

function OrderReceiptCard() {
  return (
    <div className="App">
      <OrderReceiptCard 
        orderNumber="8"
        productName="Kurtas Pajama"
        trailDate="2023-06-15"
        deliveryDate="2023-06-20"
        receivedDate="2023-06-18"
      />
    </div>
  );
}

export default OrderReceiptCard;
