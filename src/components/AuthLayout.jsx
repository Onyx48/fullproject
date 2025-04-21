import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate;
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    console.log(
      `AuthLayout Effect :Required auth : ${authentication},Actual Status:${authStatus}`
    );

    if (authentication && authStatus != authentication) {
      console.log(
        "AuthLayout: Redirecting to /Login (authentication required, user not logged in)"
      );
      navigate("/Login");
    } else if (!authentication && authStatus !== authentication) {
      console.log(
        "AuthLayout :Redirecting to /(authentication not required,user logged in)"
      );
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading Protected Route...</h1> : <>{children}</>;
}
