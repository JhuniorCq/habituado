import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AlertHistory from "../pages/AlertHistory";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/alert-history" element={<AlertHistory />} />
    </Routes>
  );
};

export default AppRoutes;
