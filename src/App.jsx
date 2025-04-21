import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import authservice from "./appwrite/auth";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("App.jsx useEffect running : checking current user...");
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          console.log(
            "App.jsx useeffect : User found ,dispatched login",
            userData
          );
        } else {
          dispatch(logout());
          console.log("App.jsx useEffect:No user found,dispatched logout");
        }
      })
      .catch((error) => {
        console.error(
          "App.jsx useEffect : Error checking current user:",
          error
        );

        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
        console.log("App.jsx useEffect: Loading finished");
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-200">
      {" "}
      {/* Your main layout */}
      <div className="w-full block">
        <Header /> {/* Header will read Redux state later */}
        <main className="flex-grow">
          <Outlet /> {/* Your routed page content */}
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <h1>Loading Application...</h1>
    </div>
  );
}

export default App;
