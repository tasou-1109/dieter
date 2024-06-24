import React, { useState, useEffect } from "react";
// import { Set } from "./Set.jsx";
import { Training } from "./Training";
import { Yotei } from "./Yotei";
import "./home.scss";
import { Header } from "../header/Header";
import { supabase } from "../supabase";

export const Home = () => {
  const [auth, setAuth] = useState(null);

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState();

  const getLogin = async () => {
    const { data } = await supabase.auth.getSession(); //メソッドで非同期処理を行う

    if (data.session) {
      setAuth(data.session.access_token);
      const a = await supabase.auth.getUser();
      setUser(a.data.user.id);
      setUserName(a.data.user.user_metadata.Name);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  return (
    <div>
      <Header />
      <main className="main">
        <Yotei userId={user} auth={auth} name={userName} />
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
