import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authencation = true }) {
  const navigate = useNavigate;
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    console.log(
      `AuthLayout Effect :Required auth : ${authencation},Actual Status:${authStatus}`
    );

    if (authenaction && authStatus != authentication) {
      console.log(
        "AuthLayout: Redirecting to /Login (authentication required, user not logged in)"
      );
      navigate("/Login");
    } else if (!authencation && authStatus !== authencation) {
      console.log(
        "AuthLayout :Redirecting to /(authentication not required,user logged in)"
      );
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authencation]);

  return loader ? <h1>Loading Protected Route...</h1> : <>{children}</>;
}
