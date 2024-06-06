import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Set } from "../pages/Set";
import { LogIn } from "../auth/LogIn.jsx";
import { SignUp } from "../auth/SignUp";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export const Router = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(event);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dieter/Login" element={<LogIn />} />
        <Route path="/dieter/SignUp" element={<SignUp />} />
        <Route path="/dieter" element={<Home />} />
        <Route path="/dieter/Set/:date" element={<Set />} />
        {/* {auth ? (
          <>
            <Route path="/dieter" element={<Home />} />
            <Route path="/dieter/Set/:date" element={<Set />} />
          </>
        ) : (
          <>
            <Route path="/dieter/Login" element={<LogIn />} />
            <Route path="/dieter/SignUp" element={<SignUp />} />
          </>
        )} */}
      </Routes>
    </BrowserRouter>
  );
};
