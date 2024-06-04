import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Navigate, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Compressor from "compressorjs";
import "./signup.scss";
import { supabase } from "../supabase.js";

export const SignUp = () => {
  //ページ移動用
  const nav = useNavigate();

  //状態関係
  const auth = supabase.auth.getSession(); //画像格納用multipart/form-data
  // const icon = new FormData();

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

  //アイコン画像の圧縮とAPIへの画像送信
  // const handleIconSet = (e) => {
  //   const data = e.target.files[0];

  //   new Compressor(data, {
  //     quality: 0.6,
  //     success(result) {
  //       icon.append("icon", result);
  //     },
  //     error(err) {
  //       console.log("アイコンの設定に失敗しました" + err);
  //     },
  //   });
  // };

  //作成ボタン押下処理
  const onSignUp = async () => {
    reset();

    //APIに送るデータのセット
    // const data = {
    //   email: mail,
    //   name: name,
    //   password: password,
    // };

    await supabase.auth.signUp({
      DisplayName: name,
      email: mail,
      password: password,
    });

    //APIにデータ送信

    //既に登録済みだった時の処理
    if (auth) return <Route element={<Navigate to="/dieter" />}></Route>;
  };

  return (
    <div>
      <main className="main">
        <h2>新規作成</h2>
        <p className="error-Mes">{signError}</p>

        <form onSubmit={handleSubmit(onSignUp)} className="signup-Form">
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

          {/* <br />
          <label className="signup-Form__icon">アイコン設定</label>
          <br />

          <input
            className="signup-Form__icon-Set"
            type="file"
            id="icon"
            accept=".jpg,.png"
            onChange={(e) => handleIconSet(e)}
          />
          <br /> */}

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

export default SignUp;
