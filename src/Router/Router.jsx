import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Set } from "../pages/Set";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dieter" element={<Home />} />
        <Route path="/dieter/Set/:date" element={<Set />} />
      </Routes>
    </BrowserRouter>
  );
};
