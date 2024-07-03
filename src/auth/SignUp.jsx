import React, { useEffect, useState } from "react";
import { useNavigate, Navigate, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./signup.scss";
import { supabase } from "../supabase.js";

export const SignUp = () => {
  //ページ移動用
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

  //バリデーション用
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //ユーザ情報
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //エラー
  const [signError, setSignError] = useState("");

  //入力情報登録
  const handleMailChange = (e) => setMail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  //作成ボタン押下処理
  const onSignUp = async () => {
    try {
      reset();
      const { error } = await supabase.auth.signUp({
        email: mail,
        password: password,
        options: {
          data: {
            Name: name,
          },
        },
      });
      if (error) throw error;
      nav("/dieter");
    } catch (error) {
      alert(error.message);
    }
  };

  if (auth) return <Navigate to="/dieter" />;

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
              minLength: { value: 2, message: "2文字以上にしてください" },
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
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "メールアドレスの形式が違います",
              },
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
        <Link to="/dieter/Login" id="link-Log">
          ログイン
        </Link>
      </main>
    </div>
  );
};
