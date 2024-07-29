import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    

    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Failed to fetch current user:", error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
        
      });
  }, [dispatch]);

  return !loading ? (
    <>
      <div className="max-h-screen flex  flex-wrap content-between base-100">
        <div className="w-full block bg-gradient-to-tr from-green-400 to-blue-400">
          <Header />
          <main className="">
            <Outlet  />
          </main>
          <Footer/>
        </div>
      </div>
    </>
  ) : null;
}

export default App;
