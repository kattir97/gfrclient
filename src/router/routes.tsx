import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { wordLoader } from "./loaders/wordLoader.ts";
import SearchPage from "../pages/SearchPage.tsx";
import { Spin } from "antd";

// Lazy load your components
const AdminHomePage = lazy(() => import("../pages/AdminHomePage.tsx"));
const AddWord = lazy(() => import("../pages/AddWord.tsx"));
const Layout = lazy(() => import("../components/Layout.tsx"));
const EditWord = lazy(() => import("../pages/EditWord.tsx"));
const RegisterPage = lazy(() => import("../pages/RegisterPage.tsx"));
const LoginPage = lazy(() => import("../pages/LoginPage.tsx"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute.tsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.tsx"));

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
        element: (
          <Suspense fallback={<Spin fullscreen spinning={true} />}>
            {" "}
            <ProtectedRoute />
          </Suspense>
        ),
        children: [
          {
            path: "admin",
            element: (
              <Suspense fallback={<Spin fullscreen spinning={true} />}>
                <AdminHomePage />
              </Suspense>
            ),
          },
          {
            path: "add-word",
            element: (
              <Suspense fallback={<Spin fullscreen spinning={true} />}>
                <AddWord />
              </Suspense>
            ),
          },
          {
            path: "edit-word/:wordId",
            element: (
              <Suspense fallback={<Spin fullscreen spinning={true} />}>
                <EditWord />
              </Suspense>
            ),
            loader: wordLoader,
          },
        ],
      },

      {
        path: "register",
        element: (
          <Suspense fallback={<Spin fullscreen spinning={true} />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Spin fullscreen spinning={true} />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
]);
