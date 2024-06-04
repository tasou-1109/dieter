import "./header.scss";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const auth = supabase.auth.getSession();
  const Nav = useNavigate();
  const [userName, setUserName] = useState();

  const handleSignOut = () => {
    supabase.auth.signOut();
    Nav("/login");
  };

  const goLogin = () => {
    Nav("/login");
  };

  // useEffect(() => {
  //     if(auth){
  //         setUserName(supabase)
  //     }
  // })

  return (
    <>
      {auth ? (
        <header className="header">
          <h1 className="header__title">ダイエッター</h1>
          <h3 className="header__name">ユーザ名：{userName}</h3>
          &emsp;
          <button onClick={handleSignOut()} className="header__signOut">
            サインアウト
          </button>
        </header>
      ) : (
        <header className="header">
          <h1 className="header__title">ダイエッター</h1>
          <h3 className="header__name">ユーザ名</h3>
          &emsp;
          <button onClick={goLogin()} className="header__signOut">
            ログイン
          </button>
        </header>
      )}
    </>
  );
};
