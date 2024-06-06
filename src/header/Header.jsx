import "./header.scss";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate, Link } from "react-router-dom";

export const Header = () => {
  const nav = useNavigate();

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      setSession(event);
    });
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

  return (
    <>
      <header className="header">
        <h1 className="header__title">ダイエッター</h1>
        &emsp;
        <button onClick={(e) => handleSignOut(e)} className="header__signOut">
          サインアウト
        </button>
      </header>
    </>
  );
};
