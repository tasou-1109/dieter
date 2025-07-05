import React, { useEffect, useState } from "react";
import { useNavigate, Navigate, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../scss/signup.scss";
import { getSession,signUp } from "../api_Connect/authAPI"; // 追加

export const SignUp = () => {
  //ページ移動用
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

  //バリデーション用
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //ユーザ情報
  var mail;
  var name;
  var pass;

  //エラー
  const [signError, setSignError] = useState("");

  //入力情報登録
  const handleMailChange = (e) => (mail = e.target.value);
  const handleNameChange = (e) => (name = e.target.value);
  const handlePasswordChange = (e) => (pass = e.target.value);

  //作成ボタン押下処理
  const onSignUp = async () => {
    try {
      reset();
      const { error } = await signUp(mail, pass, {
        data: { Name: name },
      });
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
        <h2>新規作成</h2>
        <p className="error-Mes">{signError}</p>

        <form onSubmit={handleSubmit(onSignUp)} className="signup-Form">
          <br />
          <label>ユーザ名</label>
          <br />
          <input
            {...register("name", {
              required: "名前を入力してください",
            })}
            className="signup-Form__user-Set"
            type="text"
            onChange={(e) => handleNameChange(e)}
            id="signup-Form__name-Set"
          />
          <div id="signup-Form__error_name">
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <br />

          <label>メールアドレス</label>
          <br />
          <input
            {...register("mail", {
              required: "メアドを入力してください",
            })}
            className="signup-Form__mail-log"
            type="text"
            onChange={(e) => handleMailChange(e)}
          />
          <div id="signup-Form__error_mail">
            {errors.mail && <span>{errors.mail.message}</span>}
          </div>
          <br />

          <br />
          <label>パスワード</label>
          <br />

          <input
            {...register("password", {
              required: "パスワードを入力してください",
              // minLength: {
              //   value: 8,
              //   message: "8文字以上24文字以下にしてください",
              // },
              // maxLength: {
              //   value: 24,
              //   message: "8文字以上24文字以下にしてください",
              // },
              // pattern: {
              //   value: /^[a-zA-Z0-9.?/-]/,
              //   message: "パスワードの形式が違います",
              // },
            })}
            className="signup-Form__pass-Set"
            type="password"
            onChange={(e) => handlePasswordChange(e)}
          />
          <div id="signup-Form__error_pass">
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <br />

          <br />
          <input
            type="submit"
            value="作成"
            id="signup-Form__sign-Button"
          ></input>
        </form>
        <br />
        <Link to="/Login" id="link-Log">
          ログイン
        </Link>
      </main>
    </div>
  );
};
