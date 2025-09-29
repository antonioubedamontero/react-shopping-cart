import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { ShoppingCart } from "./shopping-cart/page/shopping-cart";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ShoppingCart />
  </StrictMode>
);
