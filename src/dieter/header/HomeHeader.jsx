//import "./header.scss";
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

export const HomeHeader = () => {
  const nav = useNavigate();

  const [userId, setUserId] = useState();
  const [user_name, setUser_name] = useState();
  const [auth, setAuth] = useState(null);

  const getLogin = async () => {
    const { data } = await supabase.auth.getSession(); //メソッドで非同期処理を行う

    if (data.session) {
      if (data.session) {
        setAuth(data.session.access_token);
        const a = await supabase.auth.getUser();
        setUserId(a.data.user.id);
        setUser_name(a.data.user.user_metadata.Name);
        console.log(a.data.user.user_metadata.Name);
      } else {
        console.log(data);
      }
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
  };

  const handleLogin = () => {
    nav("/dieter/Login");
  };

  const handleCulinaryMate = () => {
    nav("/culinaryMate");
  };

  const handleTrainingRoute = () => {
    nav("/dieter/TrainingSet", {
      state: { user_id: userId, user_name: user_name },
    });
  };

  return (
    <>
      <header className="header">
        <h1 className="header__title">ダイエッター</h1>
        {auth ? (
          <>
            <button
              onClick={(e) => handleSignOut(e)}
              className="header__signOut"
            >
              サインアウト
            </button>
            <button
              onClick={() => handleCulinaryMate()}
              className="header__signOut"
            >
              食材管理へ
            </button>
            <button
              onClick={() => handleTrainingRoute()}
              className="header__signOut"
            >
              {" "}
              筋トレメニュー登録へ
            </button>
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
