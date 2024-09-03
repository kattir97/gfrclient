import { createBrowserRouter, Navigate } from "react-router-dom";

import AdminHomePage from "../pages/AdminHomePage.tsx";
import { AddWord } from "../pages/AddWord.tsx";
import { Layout } from "../components/Layout.tsx";
import { EditWord } from "../pages/EditWord.tsx";
import { wordLoader } from "./loaders/wordLoader.ts";
import SearchPage from "../pages/SearchPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true, // <-- match on parent, i.e. "/"
        element: <Navigate to="home" replace />, // <-- redirect
      },
      {
        path: "home",
        element: <SearchPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "admin",
            element: <AdminHomePage />,
          },
          {
            path: "add-word",
            element: <AddWord />,
          },
          {
            path: "edit-word/:wordId",
            element: <EditWord />,
            loader: wordLoader,
          },
        ],
      },

      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
