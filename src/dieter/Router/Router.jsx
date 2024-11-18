import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Set } from "../pages/Set";
import { Login } from "../auth/Login.jsx";
import { SignUp } from "../auth/SignUp";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase.js";
import { DataDetail } from "../pages/DataDetail.jsx";
import { Edit } from "../pages/Edit.jsx";
import { App } from "../../culinaryMate/App.js";
import { Training } from "../pages/TrainingSet.jsx";

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
        <Route path="/dieter/Login" element={<Login />} />
        <Route path="/dieter/SignUp" element={<SignUp />} />
        {auth ? (
          <>
            <Route path="/dieter" element={<Home />} />
            <Route path="/dieter/Set/:date" element={<Set />} />
            <Route path="/dieter/Detail/:date" element={<DataDetail />} />
            <Route path="/dieter/Edit/:day" element={<Edit />} />
            <Route path="/dieter/Training" element={<Training />} />


            <Route path="/dieter/culinaryMate" element={<App />} />
          </>
        ) : (
          <>
            <Route path="/dieter" element={<Home />} />
            <Route path="/dieter/Login" element={<Login />} />
            <Route path="/dieter/SignUp" element={<SignUp />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
