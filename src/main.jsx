import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Protected from "./components/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import AllPosts from "./pages/AllPosts.jsx";
import AddPost from "./pages/AddPost.jsx";
import AuthLayout from "./components/AuthLayout.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/Login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/Signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/",
      },
      {
        path: "/all-posts",
        element: (
          <Protected authencation={true}>
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          
          <Protected authentication>
            <AddPost />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
