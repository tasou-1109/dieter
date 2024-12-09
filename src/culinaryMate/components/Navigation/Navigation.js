import React from "react";
import "./Navigation.css";

const Navigation = ({ currentPage, onNavigate }) => {
  return (
    <nav className="navigation">
      <button
        className={`nav-link ${currentPage === "home" ? "active" : ""}`}
        onClick={() => onNavigate("home")}
      >
        ホーム
      </button>
      <button
        className={`nav-link ${currentPage === "about" ? "active" : ""}`}
        onClick={() => onNavigate("about")}
      >
        About
      </button>
      <button
        className={`nav-link ${currentPage === "contact" ? "active" : ""}`}
        onClick={() => onNavigate("contact")}
      >
        お問い合わせ
      </button>
      <button
        className={`nav-link ${currentPage === "food" ? "active" : ""}`}
        onClick={() => onNavigate("food")}
      >
        食材管理
      </button>
      <button
        className={`nav-link ${currentPage === "settings" ? "active" : ""}`}
        onClick={() => onNavigate("settings")}
      >
        設定
      </button>
    </nav>
  );
};

export default Navigation;
