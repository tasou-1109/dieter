//import "./header.scss";
import React, { useEffect, useState } from "react";
import { getSessionDetail, signOut } from "../api_Connect/authAPI"; // 変更
import { useNavigate } from "react-router-dom";

export const HomeHeader = () => {
  const nav = useNavigate();

  const [userId, setUserId] = useState();
  const [user_name, setUser_name] = useState();
  const [auth, setAuth] = useState(null);

  const getLogin = async () => {
    const session = await getSessionDetail();
    if (session) {
      setAuth(session.session);
      setUserId(session.user_id);
      setUser_name(session.user_name);
    } else {
      alert("未ログインで続行します");
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  const handleSignOut = async (e) => {
    try {
      const { error } = await signOut(); // authAPIのsignOutを呼び出す
      if (error) throw error;
      nav("/Login");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = () => {
    nav("/Login");
  };

  const handleCulinaryMate = () => {
    nav("/culinaryMate");
  };

  const handleTrainingRoute = () => {
    nav("/TrainingSet", {
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
              onClick={(e) => handleCulinaryMate()}
              className="header__signOut"
            >
              食材管理へ
            </button>
            <button
              onClick={(e) => handleTrainingRoute()}
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
            {/* <button onClick={() => handleCulinaryMate()}>食材管理へ</button> */}
          </>
        )}
      </header>
    </>
  );
};
