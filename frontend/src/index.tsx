import React from "react";
import ReactDOM from "react-dom/client";
// import "terminal.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./features/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SearchVideos from "./pages/SearchVideos";
import { NotFound } from "./components/shared/NotFound";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            {/* <Route path="/" element={<App />} /> */}
            <Route path="videos" element={<SearchVideos />} />
            <Route path="login" element={<Login />} />
            <Route path="admin/dashboard" element={<Dashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
      <ToastContainer autoClose={8000} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
