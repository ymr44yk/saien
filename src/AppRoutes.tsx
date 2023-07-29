import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Register } from "./Register";
import Data from "./Data";
import Master from "./Master";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "Register", element: <Register /> },
    { path: "Data", element: <Data /> },
    { path: "Master", element: <Master/>}
]);

