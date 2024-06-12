import React, { useState, useEffect } from "react";
// import { Set } from "./Set.jsx";
import { Training } from "./Training";
import { Yotei } from "./Yotei";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "./home.scss";
import { Header } from "../header/Header";
import { supabase } from "../supabase";

export const Home = () => {
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
    <div>
      <Header />
      <main className="main">
        <Yotei />
        <br />

        {auth ? (
          <div className="main__mem">
            <Training />
          </div>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
};

export default Home;
