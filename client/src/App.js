import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import ProtectedRouter from './pages/ProtectedRouter';
import ProtectedAdmin from './pages/ProtectedAdmin';
import Basket from './pages/Basket';
import Error404 from './pages/Error404';
import Admin from './pages/Admin';
import Orders from './pages/Admin/Orders';
import AdminProducts from './pages/Admin/Products';
import AdminProductDetail from './pages/Admin/ProductDetail';
import AdminNewProduct from './pages/Admin/NewProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path="/" element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path='/' element={<ProtectedRouter />}>
            <Route path='profile' element={<Profile />} />
            <Route path="basket" element={<Basket />} />
          </Route>
          <Route path='/' element={<ProtectedAdmin />}>
            <Route path='/admin' element={<Admin />}>
              <Route path='/admin/orders' element={<Orders />} />
              <Route path='/admin/products' element={<AdminProducts />} />
              <Route path='/admin/products/:product_id' element={<AdminProductDetail />} />
              <Route path='/admin/new-products' element={<AdminNewProduct />} />
            </Route>
          </Route>
          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;