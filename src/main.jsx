import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router/Router";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </AuthProvider>
);
