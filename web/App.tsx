import type React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import * as Pages from "./pages";

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/faq" element={<Pages.FAQ />} />
        <Route path="/privacy" element={<Pages.Privacy />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
      <Footer />
    </>
  );
};
