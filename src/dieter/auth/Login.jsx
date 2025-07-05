import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useCookies } from "react-cookie";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../scss/login.scss";
import { apiClient } from "../api_Connect/apiClient"; // 追加
import { getSession } from "../api_Connect/authAPI"; // 追加

export const Login = () => {
  const nav = useNavigate();

  const [auth, setAuth] = useState(null);

  const getLogin = async () => {
    const { data } = await getSession(); // authAPI経由で取得
    if (data && data.session) {
      setAuth(data.session);
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //ユーザ情報
  var mail;
  var password;

  //エラー
  const [logError] = useState();

  const handleMailChange = (e) => {
    mail = e.target.value;
  };
  const handlePasswordChange = (e) => {
    password = e.target.value;
  };

  const onLogIn = async () => {
    try {
      const { data, error } = await apiClient.signIn(mail, password);
      reset();
      if (error) throw error;
      nav("/");
    } catch (error) {
      alert(error.message);
    }
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div>
      <main className="main">
        <h2>ログイン</h2>
        <p id="error">{logError}</p>

        <form onSubmit={handleSubmit(onLogIn)} className="login-Form">
          <label>メールアドレス</label>
          <br />
          <input
            {...register("mail", {
              required: "メアドを入力してください",
            })}
            type="text"
            className="login-Form__email-Set"
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
            })}
            className="login-Form__password-Set"
            type="password"
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
        <Link to="/SignUp">新規作成</Link>
      </main>
    </div>
  );
};
