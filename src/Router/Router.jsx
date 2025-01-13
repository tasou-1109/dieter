import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../dieter/pages/Home/Home.jsx";
import { Set } from "../dieter/pages/Set.jsx";
import { Login } from "../dieter/auth/Login.jsx";
import { SignUp } from "../dieter/auth/SignUp.jsx";
import { useEffect, useState } from "react";
import { supabase } from "../supabase.js";
import { DataDetail } from "../dieter/pages/DataDetail.jsx";
import { Edit } from "../dieter/pages/Edit.jsx";
import { App } from "../culinaryMate/App.js";
import { TrainingSet } from "../dieter/pages/TrainingSet.jsx";
import { TrainingMenus } from "../dieter/pages/TrainingMenus.jsx";
import { TrainingEdit } from "../dieter/pages/TrainingEdit.jsx";

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
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        {auth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/Set/:date" element={<Set />} />
            <Route path="/Detail/:date" element={<DataDetail />} />
            <Route path="/Edit/:day" element={<Edit />} />
            <Route path="/TrainingMenus" element={<TrainingMenus />} />
            <Route path="/TrainingSet" element={<TrainingSet />} />

            <Route
              path="/TrainingEdit/:workOut_id"
              element={<TrainingEdit />}
            />
            <Route path="/culinaryMate" element={<App />} />
          </>
        ) : (
          <>
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
