import "bootstrap/dist/css/bootstrap.min.css"
// PAGES
import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login"
import Home from "./pages/Home";
import Booklist from "./pages/Booklist";
import BookDetailPage from "./pages/Detail";
import ViewOrders from "./pages/ViewOrders";
import ViewOrderDetails from "./pages/ViewOrderDetails";
import MyNav from "./components/Navbar"
// CSS
import './App.css';

import { Routes, Route} from "react-router-dom";


function App() {
  return (
   <>
   <MyNav/>
    <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/register" element={<RegisterPage/>}/>
     <Route path="/login" element={<LoginPage/>}/>
     <Route path="/book/list" element={<Booklist/>}/>
     <Route path="/book/orders" element={<ViewOrders/>}/>
     <Route path="/book/view/:bookId" element={<BookDetailPage/>}/>
     <Route path="/book/orders/:bookId" element={<ViewOrderDetails/>}/>
    </Routes>
   </>

  );
}

export default App;
