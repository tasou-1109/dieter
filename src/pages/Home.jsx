import React from "react";
// import { Set } from "./Set.jsx";
import { Training } from "./Training";
import { Yotei } from "./Yotei";
import "./home.scss";
import { supabase } from "../supabase";

export const Home = () => {
  console.log(supabase.auth.getSession());
  return (
    <div>
      <main className="main">
        <Yotei />
        <br />

        <div className="main__mem">
          <Training />
        </div>
      </main>
    </div>
  );
};

export default Home;
