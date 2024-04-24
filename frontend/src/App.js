import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoyaltyDB from './pages/loyalty/loyaltydb';
import TravelPlan from './pages/travel-plan/travel_plan';
import MyProfile from './pages/package/MyProfile';
import SinglePackage from './pages/package/SinglePackage';
import Blog from './pages/blogs/blogmain';
import Home from './pages/home';
import Register from './pages/Register';
import Login from './pages/Login';
import Feedback from './pages/travelPlaces/feedback';
import TravelPlace from './pages/travelPlaces/places';
import NewPlaces from './pages/travelPlaces/newplaces';
import Packages from './components/Admin/Create-Packages';
import { Context } from './Context';
import Navbar from './Navbar';
import Payment from './pages/payment/payment';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Inquiry from './pages/package/Inquiry';
import UserInquiries from './pages/package/UserInquiries';
import AdminInquiries from './pages/package/AdminInquiries';
import RoleProtected from './pages/RoleProtected';
import NotFound from './pages/404';
import CurrencyConvertor from './pages/CurrencyConvertor';
import Weather from './pages/Weather';
import StatusProtected from './pages/StatusProtected';

function App() {
  const [status, setStatus] = useState(false);
  const token = localStorage.getItem('rfkey');
  const [cartFoodLoading, setCartFoodLoading] = useState(true);
  const [cartFoodData, setCartFoodData] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [data, setData] = useState([]);
  const [cartCount, setCartCount] = useState('');
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState('');
  const [orderData, setOrderData] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(true);

  const [points, setPoints] = useState(0);

  const checkLogin = async () => {
    const user = {
      refreshToken: token,
    };

    const { data: response } = await axios.post(
      'http://localhost:8080/api/refreshToken',
      user
    );
    console.log(response.error);
    if (response.error === false) {
      setStatus(true);
      console.log('setted true');

      const { data: response } = await axios.get(
        `http://localhost:8080/api/users/getId/${localStorage.getItem(
          'username'
        )}`
      );
      setIsAdmin(response.isAdmin);
      setPoints(response.userPoints);
      localStorage.setItem('isAdmin', response.isAdmin);
      console.log(response);
    } else {
      setStatus(false);
      console.log('setted false');
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // const fetchRole = async () => {
  //   if (status === true) {
  //     try {
  //       const { data: response } = await axios.get(
  //         `http://localhost:8080/api/users/getId/${localStorage.getItem(
  //           "username"
  //         )}`
  //       );
  //       setIsAdmin(response.isAdmin);
  //       setPoints(response.userPoints);
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   }
  // };

  // console.log(isAdmin);

  // useEffect(() => {
  //   fetchRole();
  // }, []);

  const logOut = async () => {
    await fetch('http://localhost:8080/api/refreshToken', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem('rfkey'),
      }),
    }).then((res) => {
      if (res.ok) {
        localStorage.setItem('rfkey', '');
        localStorage.setItem('isAdmin', false);
        console.log('logged out successfully');
        window.location.reload(false);
        setStatus(false);
        console.log(status);
      } else {
        console.log('Cannot logout');
      }
    });
    localStorage.removeItem('isLogged');
  };

  let logStatus = localStorage.getItem('isLogged');

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar
            setStatus={setStatus}
            status={status}
            logOut={logOut}
            isAdmin={isAdmin}
          />
          <Routes>
            <Route path="/" element={isAdmin ? <TravelPlan /> : <Home />} />

            <Route path="/home" element={<Home />} />
            <Route
              path="/loyalty-reward"
              element={
                <StatusProtected>
                  <LoyaltyDB />
                </StatusProtected>
              }
            />
            <Route
              path="/payment/:packageId"
              element={
                <StatusProtected>
                  <Payment />
                </StatusProtected>
              }
            />
            <Route
              path="/payment"
              element={
                <StatusProtected>
                  <Payment />
                </StatusProtected>
              }
            />
            <Route
              path="/profile"
              element={
                <StatusProtected>
                  <MyProfile />
                </StatusProtected>
              }
            />
            <Route
              path="/package/:id"
              element={
                <StatusProtected>
                  <SinglePackage />
                </StatusProtected>
              }
            />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/register" element={!logStatus ? <Register /> : <Home/>} />
            <Route path="/login" element={!logStatus ? <Login /> : <Home/>} />
            <Route
              path="/inquiry"
              element={
                <StatusProtected>
                  <Inquiry />
                </StatusProtected>
              }
            />
            <Route path="/convertor" element={<CurrencyConvertor />} />
            <Route path="/weather" element={<Weather />} />

            <Route
              path="/travel-plan"
              element={
                <StatusProtected>
                  {isAdmin ? <TravelPlan /> : <NotFound />}
                </StatusProtected>
              }
            />

            <Route
              path="/user-inquiry"
              element={
                <StatusProtected>
                  <RoleProtected isAdmin={!isAdmin}>
                    <UserInquiries />
                  </RoleProtected>
                </StatusProtected>
              }
            />

            <Route
              path="/admin-inquiry"
              element={
                <StatusProtected>
                  <RoleProtected isAdmin={isAdmin}>
                    <AdminInquiries />
                  </RoleProtected>
                </StatusProtected>
              }
            />

            <Route path="/feedback" element={<Feedback />} />
            <Route path="/travel-places" element={<TravelPlace />} />
            <Route
              path="/new-places"
              element={
                <StatusProtected>
                  <NewPlaces />
                </StatusProtected>
              }
            />
            <Route
              path="/packages/:id"
              element={
                <StatusProtected>
                  <Packages />
                </StatusProtected>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
