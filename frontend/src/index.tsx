import React from "react";
import ReactDOM from "react-dom/client";
// import "terminal.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { store } from "./features/store";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <>
        <App />
        {/* <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter> */}
      </>
      <ToastContainer autoClose={8000} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
