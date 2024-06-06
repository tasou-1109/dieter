import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useCookies } from "react-cookie";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./login.scss";
import { supabase } from "../supabase";

export const LogIn = () => {
  const nav = useNavigate();

  const [session, setSession] = useState(null);
  // const auth = supabase.auth.getSession();
  // console.log(auth);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(event);
    });
  }, []);

  //ページ移動用
  // const nav = useNavigate();

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

  const onLogIn = async () => {
    try {
      reset();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: mail,
        password: password,
      });
      if (error) throw error;
      nav("/dieter");
    } catch (error) {
      alert(error.message);
    }
  };

  // if (auth) return <Navigate to="/dieter" />;

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
              required: "メアドを入力してください",
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
              required: "パスワードを入力してください",
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
        <Link to="/dieter/SignUp">新規作成</Link>
      </main>
    </div>
  );
};

export default LogIn;
