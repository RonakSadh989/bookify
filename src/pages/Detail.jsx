import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function BookDetailPage() {
  const params = useParams();
  const [data, setdata] = useState(null);
  const [url, seturl] = useState(null);
  const [qty, setQty] = useState(null);
  const firebase = useFirebase();
  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setdata(value.data()));
  }, []);
  useEffect(() => {
    if (data) {
      const imageURl = data.imageURL;
      firebase.getImageURL(imageURl).then((url) => seturl(url));
    }
  }, [data]);

  if (data == null) {
    return <h1>Loading...</h1>;
  }
  const place = async () => {
    const result = await firebase.placeOrder(params.bookId, qty);
    console.log("Order Placed:", result);
  };
  return (
    <div className="container">
      <h1>{data.name}</h1>
      <img src={url} alt="" width="50%" style={{ borderRadius: "10px" }} />
      <h1>Details</h1>
      <h4>Price : Rs.{data.price}</h4>
      <h4>ISBN : Rs.{data.isbn}</h4>
      <h1>Owner Details: </h1>
      <p>Name : {data.userdisplayName}</p>
      <p>Email : {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Quantity:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Quantity"
          onChange={(e) => {
            setQty(e.target.value);
          }}
          value={qty}
        />
      </Form.Group>
      <Button variant="success" onClick={place}>
        Buy Now
      </Button>
    </div>
  );
}
