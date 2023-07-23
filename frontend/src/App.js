import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>

          <Route element={<PrivateComponent/>}>
            <Route path='/' element={<ProductList/>}></Route>
            <Route path='/add' element={<AddProduct/>}></Route>
            <Route path='/update/:id' element={<UpdateProduct/>}></Route>
            <Route path='/logout' element={<h1>Logout Page</h1>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
          </Route>

          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login'  element={<Login/>}></Route>
          
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
