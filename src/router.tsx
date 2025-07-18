import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Competition from "./pages/Competition/Competition";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import Profile from "./pages/Profile/Profile";
import Ranking from "./pages/Ranking/Ranking";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/competition" element={<Competition />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/:playerId" element={<Profile />} />
    </Routes>
  );
}
