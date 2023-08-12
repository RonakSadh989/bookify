import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: "AIzaSyBh6OcfMlS7Y41xlLLDjts_VrKGjJ2Nc9g",
  authDomain: "bookify-6b527.firebaseapp.com",
  projectId: "bookify-6b527",
  storageBucket: "bookify-6b527.appspot.com",
  messagingSenderId: "867366659920",
  appId: "1:867366659920:web:47047ee49ad7b9af7cee55",
  measurementId: "G-0C8BJRT3MG",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
  const [User, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  const isLoggedIn = User ? true : false;

  const signUp = (email, password) => {
    // Sign up using auth
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((value) => console.log(value), alert("Signed in"))
      .catch((err) => console.log(err), alert("Error Occured"));
  };
  const signIn = (email, password) => {
    // Sign In using Auth
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((value) => console.log(value), alert("Signed in"))
      .catch((err) => console.log(err), alert("Error Occured"));
  };
  const signUpGoogle = () => {
    // sign up using google
    signInWithPopup(firebaseAuth, googleProvider)
      .then((value) => console.log(value), alert("Signed in"))
      .catch((err) => console.log(err), alert("Error Occured"));
  };
  const CreateNewListing = async (name, isbn, price, coverPic) => {
    // create list
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );
    const uploadResult = await uploadBytes(imageRef, coverPic);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: User.uid,
      userEmail: User.email,
      userdisplayName: User.displayName,
      photoURL: User.photoURL,
    });
  };
  const listAllBooks = () => {
    // listing books
    return getDocs(collection(firestore, "books"));
  };
  const getImageURL = (path) => {
    // get book image url
    return getDownloadURL(ref(storage, path));
  };
  const getBookById = async (id) => {
    // get book ID
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };
  const placeOrder = async (bookId, qty) => {
    // place order
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: User.uid,
      userEmail: User.email,
      userdisplayName: User.displayName,
      photoURL: User.photoURL,
      qty: Number(qty),
    });
    return result;
  };
  const fetchMyBooks = async (userID) => {
    if (!User) return null;
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userID));
    const result = await getDocs(q);
    return result;
  };
  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };
  return (
    <FirebaseContext.Provider
      value={{
        signUp,
        signIn,
        signUpGoogle,
        CreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        isLoggedIn,
        User,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
