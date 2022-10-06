import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { worker } from "./api/server";
import { fetchUsers } from "./features/users/usersSlice";

const container = document.getElementById("root")!;
const root = createRoot(container);

(function start() {
  worker.start({ onUnhandledRequest: "bypass" });
  store.dispatch(fetchUsers());
})();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
