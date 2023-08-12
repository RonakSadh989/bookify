import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
export default function ViewOrders() {
  const [books, setbooks] = useState([]);
  const firebase = useFirebase();
  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase
        .fetchMyBooks(firebase.User.uid)
        .then((books) => setbooks(books.docs));
    }
  }, []);
  if (!firebase.isLoggedIn) {
    return <h1>Please Log in</h1>;
  }
  return (
    <div>
      {books.map((book) => (
        <BookCard
          link={`/book/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
}
