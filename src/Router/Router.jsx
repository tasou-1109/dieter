import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Set } from "../pages/Set";
import { LogIn } from "../auth/LogIn.jsx";
import { SignUp } from "../auth/SignUp";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export const Router = () => {
  const [auth, setAuth] = useState(null);

  const getLogin = async () => {
    const { data } = await supabase.auth.getSession(); //メソッドで非同期処理を行う

    if (data.session) {
      setAuth(data.session);
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dieter/Login" element={<LogIn />} />
        <Route path="/dieter/SignUp" element={<SignUp />} />
        {/* <Route path="/dieter" element={<Home />} />
        <Route path="/dieter/Set/:date" element={<Set />} /> */}
        {auth ? (
          <>
            <Route path="/dieter" element={<Home />} />
            <Route path="/dieter/Set/:date" element={<Set />} />
          </>
        ) : (
          <>
            <Route path="/dieter" element={<Home />} />
            <Route path="/dieter/Login" element={<LogIn />} />
            <Route path="/dieter/SignUp" element={<SignUp />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
