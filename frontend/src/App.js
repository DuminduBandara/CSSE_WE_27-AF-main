import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoyaltyDB from './pages/loyalty/loyaltydb'
import TravelPlan from './pages/travel-plan/travel_plan';
import MyProfile from './pages/package/MyProfile';
import SinglePackage from './pages/package/SinglePackage';
import Blog from './pages/blogs/blogmain';
import Home from './pages/home';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feedback from './pages/travelPlaces/feedback';
import TravelPlace from './pages/travelPlaces/places';
import NewPlaces from './pages/travelPlaces/newplaces';
import Packages from './components/Admin/Create-Packages';
import { Context } from "./Context";
import Navbar from "./Navbar";
import Payment from './pages/payment/payment'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Inquiry from './pages/package/Inquiry';
import UserInquiries from './pages/package/UserInquiries';
import AdminInquiries from './pages/package/AdminInquiries';
import RoleProtected from './pages/RoleProtected';

function App() {

  const [status, setStatus] = useState(false);
  const token = localStorage.getItem("rfkey");
  const [cartFoodLoading, setCartFoodLoading] = useState(true);
  const [cartFoodData, setCartFoodData] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [data, setData] = useState([]);
  const [cartCount, setCartCount] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState("");
  const [orderData, setOrderData] = useState([]);

  const [isAdmin, setIsAdmin] = useState();
  const [isCustomer, setIsCustomer] = useState(true);

  const [points, setPoints] = useState(0);

  const checkLogin = async () => {
    const user = {
      refreshToken: token,
    };

    const { data: response } = await axios.post(
      "http://localhost:8080/api/refreshToken",
      user
    );
    console.log(response.error);
    if (response.error === false) {
      setStatus(true);
      console.log("setted true");
    } else {
      setStatus(false);
      console.log("setted false");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);



  const fetchRole = async () => {
    if (status == true) {
      try {
        const { data: response } = await axios.get(
          `http://localhost:8080/api/users/getId/${localStorage.getItem(
            "username"
          )}`
        );
        setIsAdmin(response.isAdmin);
        setPoints(response.userPoints);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const logOut = async () => {
    await fetch("http://localhost:8080/api/refreshToken", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("rfkey"),
      }),
    }).then((res) => {
      if (res.ok) {
        localStorage.setItem("rfkey", "");
        console.log("logged out successfully");
        window.location.reload(false);
        setStatus(false);
        console.log(status);
      } else {
        console.log("Cannot logout");
      }
    });
    localStorage.removeItem("isLogged");
  };

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
            <Route path="/" element={<Home />} />
            <Route path="/loyalty-reward" element={<LoyaltyDB />} />
            {/* <Route path="/travel-plan" element={<TravelPlan />} /> */}
            <Route path="/payment/:packageId" element={<Payment />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/package/:id" element={<SinglePackage />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inquiry" element={<Inquiry/>}/>

            <Route
              path="/travel-plan"
              element={
                <RoleProtected isAdmin={!isAdmin}>
                  <TravelPlan />
                </RoleProtected>
              }
            />

            <Route
              path="/user-inquiry"
              element={
                <RoleProtected isAdmin={!isAdmin}>
                  <UserInquiries />
                </RoleProtected>
              }
            />

            <Route
              path="/admin-inquiry"
              element={
                <RoleProtected isAdmin={!isAdmin}>
                  <AdminInquiries />
                </RoleProtected>
              }
            />

            <Route path="/feedback" element={<Feedback />} />
            <Route path="/travel-places" element={<TravelPlace />} />
            <Route path="/new-places" element={<NewPlaces />} />
            <Route path="/packages/:id" element={<Packages />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;