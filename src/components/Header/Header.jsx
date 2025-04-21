import React from "react";
import Container from "../Container/Container.jsx";
import { Logo } from "../Logo/Logo.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn.jsx";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/Login", active: !authStatus },
    { name: "Signup", slug: "/Signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: !authStatus },
    { name: "Add Post", slug: "/add-post", active: !authStatus },
  ];
  return (
    <header className="bg-gray-500">
      <Container>
        <nav className=" flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <nav>
            <ul className="flex ml-auto items-center gap-x-6">
              {navItems.map((items) =>
                items.active ? (
                  <li key={items.name}>
                    <Link
                      to={items.slug}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {items.name}
                    </Link>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}

              {/* all part deleted becaused used map.array and slug <li>
                <Link
                  to="/"
                  className="inline-block px-6 py-2 duration-200 hover:bg-gray-700 rounded-full"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Login"
                  className="inline-block px-6 py-2 duration-200 hover:bg-gray-700 rounded-full"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="inline-block px-6 py-2 duration-200 hover:bg-gray-700 rounded-full"
                >
                  Signup
                </Link>
              </li> */}
            </ul>
          </nav>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
