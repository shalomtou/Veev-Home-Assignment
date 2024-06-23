import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MyRoutes from "./routes";
import { RecoilRoot } from "recoil";

const htmlRoot = document.getElementById("root");
htmlRoot.style.margin = "10px";
htmlRoot.style.padding = "10px";

ReactDOM.createRoot(htmlRoot).render(
  <React.StrictMode>
    <RecoilRoot>
      <MyRoutes />
    </RecoilRoot>
  </React.StrictMode>
);
