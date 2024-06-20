import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NextUIProvider>
      <main className="max-w-[1440px] m-auto  h-screen overflow-auto max-lg:p-3 max-sm:p-2 p-8 pt-0 pl-0  pr-0">
        <App />
      </main>
    </NextUIProvider>
  </BrowserRouter>
);
