import React from "react";
// import { Set } from "./Set.jsx";
import { Training } from "./Training";
import { Yotei } from "./Yotei";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "./home.scss";
import { Header } from "../header/Header";
import { supabase } from "../supabase";

export const Home = () => {
  console.log(supabase.auth.getSession());
  return (
    <div>
      <Header />
      <main className="main">
        <Yotei />
        <br />

        <Link to="/dieter/Login">ログイン</Link>

        <div className="main__mem">
          <Training />
        </div>
      </main>
    </div>
  );
};

export default Home;
