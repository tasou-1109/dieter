import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useCookies } from "react-cookie";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./login.scss";
import { supabase } from "../supabase";

export const LogIn = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  //ページ移動用
  const nav = useNavigate();

  const auth = supabase.auth.getSession();

  //状態管理
  // const [, setCookie] = useCookies();
  // const [, setToken] = useState();
  //バリデーション
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //ユーザ情報
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  //エラー
  const [logError, setLogError] = useState();

  const handleMailChange = (e) => setMail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onLogIn = () => {
    reset();

    //APIへ送るデータセット
    const data = {
      email: mail,
      password: password,
    };

    //APIへのデータ送信
  };
  if (auth) return <Navigate to="/" />;

  return (
    <div>
      <main className="login">
        <h2>ログイン</h2>
        <p id="error">{logError}</p>

        <form onSubmit={handleSubmit(onLogIn)} className="login-Form">
          <label>メールアドレス</label>
          <br />
          <input
            {...register("mail", {
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "メールアドレスの形式が違います",
              },
            })}
            id="login-Form__email-Set"
            type="text"
            onChange={(e) => handleMailChange(e)}
            aria-label="mailLog"
          />
          <div id="login-Form__errorM">
            {errors.mail && <span>{errors.mail.message}</span>}
          </div>
          <br />
          <br />
          <label>パスワード</label>
          <br />
          <input
            {...register("password", {
              minLength: {
                value: 8,
                message: "8文字以上24文字以下にしてください",
              },
              maxLength: {
                value: 24,
                message: "8文字以上24文字以下にしてください",
              },
              pattern: {
                value: /^[a-zA-Z0-9.?/-]/,
                message: "パスワードの形式が違います",
              },
            })}
            id="login-Form__password-Set"
            type="text"
            onChange={(e) => handlePasswordChange(e)}
            aria-label="passLog"
          />
          <div id="login-Form__errorP">
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <br />
          <br />
          <input type="submit" id="login-Form__login-Button" value="ログイン" />
        </form>

        <br />
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};

export default LogIn;
