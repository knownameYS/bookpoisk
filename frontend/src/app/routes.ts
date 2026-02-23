import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import BookDetail from "./pages/BookDetail";
import Login from "./pages/Login";
import SearchResults from "./pages/SearchResults";
import Dashboard from "./pages/Dashboard";
import PublicProfile from "./pages/PublicProfile";
import UsersPage from "./pages/UsersPage";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "catalog", Component: Catalog },
      { path: "book/:id", Component: BookDetail },
      { path: "login", Component: Login },
      { path: "search", Component: SearchResults },
      { path: "profile", Component: Dashboard },
      { path: "user/:id", Component: PublicProfile },
      { path: "users", Component: UsersPage },
      { path: "*", Component: NotFound },
    ],
  },
]);