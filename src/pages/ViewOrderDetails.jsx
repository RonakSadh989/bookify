import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
export default function ViewOrderDetails() {
  const params = useParams();

  const firebase = useFirebase();
  const [orders, setorders] = useState([]);
  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => setorders(orders.docs));
  }, []);

  return (
    <div className="container mt-3">
      <h1>Orders</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div
            key={order.id}
            className="mt-5"
            style={{ border: "1px solid ", padding: "10px" }}>
            <h5>Order by: {data.userdisplayName}</h5>
            <h6>Qty: {data.qty}</h6>
            <p>Email: {data.userEmail}</p>
          </div>
        );
      })}
    </div>
  );
}
