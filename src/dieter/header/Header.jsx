//import "./header.scss";
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useNavigate, Link } from "react-router-dom";

export const Header = () => {
  const nav = useNavigate();

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

  const handleSignOut = async (e) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      nav("/dieter/Login");
    } catch (error) {
      alert(error.message);
    }
    // Nav("/dieter/Login");
  };

  const handleLogin = () => {
    nav("/dieter/Login");
  };

  const handleCulinaryMate = () => {
    nav("/culinaryMate");
  };

  return (
    <>
      <header className="header">
        <h1 className="header__title">ダイエッター</h1>
        &emsp;
        {auth ? (
          <>
            <button
              onClick={(e) => handleSignOut(e)}
              className="header__signOut"
            >
              サインアウト
            </button>
            <button onClick={() => handleCulinaryMate()}>食材管理へ</button>
          </>
        ) : (
          <>
            <button onClick={(e) => handleLogin()} className="header__signOut">
              ログイン
            </button>
            <button onClick={() => handleCulinaryMate()}>食材管理へ</button>
          </>
        )}
      </header>
    </>
  );
};
