import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Set } from "../pages/Set";
import { LogIn } from "../auth/LogIn";
import { SignUp } from "../auth/SignUp";

import { supabase } from "../supabase";

export const Router = () => {
  const auth = supabase.auth.getSession();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        {auth ? (
          <>
            <Route path="/dieter" element={<Home />} />
            <Route path="/Set/:date" element={<Set />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LogIn />} />
            <Route path="/SignUp" element={<SignUp />} />
          </>
        )}

        {/* {auth ? (
          <>
            <Route path="/dieter" element={<Home />} />
            <Route path="/dieter/Set/:date" element={<Set />} />
          </>
        ) : (
          <>
            <Route path="/dieter/login" element={<LogIn />} />
            <Route path="/dieter/SignUp" element={<SignUp />} />
          </>
        )} */}
      </Routes>
    </BrowserRouter>
  );
};
