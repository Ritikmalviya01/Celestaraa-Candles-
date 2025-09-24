import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import { useState } from "react";
import ScrollToTop from "./components/ScrollToTop";

function App() {   
  const location = useLocation();
  const hideLayoutOnPaths = [
    "/buyer",
    "/admin",
    
    
   
   
  ];

  const shouldHideLayout = hideLayoutOnPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  

  return (
     <>
      {!shouldHideLayout && <Header />}
      <main className="min-h-screen">
        <ScrollToTop />
        <Outlet />
      </main>
      {!shouldHideLayout && <Footer />}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
