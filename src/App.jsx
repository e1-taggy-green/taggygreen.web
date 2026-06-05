import { useEffect } from "react";
import Home from "./pages/Home";

export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  return <Home />;
}