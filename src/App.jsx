import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SmoothScroll from "./components/SmoothScroll";
import Home from "./pages/Home";
import Stories from "./pages/Stories";
import Stats from "./pages/Stats";
import Petitions from "./pages/Petitions";
import ContactUs from "./pages/ContactUs";

const pages = {
  "/": Home,
  "/stories": Stories,
  "/stats": Stats,
  "/petitions": Petitions,
  "/contact-us": ContactUs,
};

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const Page = pages[pathname] || Home;

  useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname);

    window.addEventListener("popstate", updatePathname);
    window.addEventListener("app:navigate", updatePathname);

    return () => {
      window.removeEventListener("popstate", updatePathname);
      window.removeEventListener("app:navigate", updatePathname);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-950 pb-24 text-white md:pb-0">
      <SmoothScroll />
      <Navbar />
      <Page />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
