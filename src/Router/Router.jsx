import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Set } from "../pages/Set";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Set/:date" element={<Set />} />
      </Routes>
    </BrowserRouter>
  );
};
