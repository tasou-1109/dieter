import { useNavigate } from "react-router-dom";

export const Header = (title) => {
  const nav = useNavigate();

  const handleHome = () => {
    nav("/dieter");
  };

  return (
    <header className="header">
      <h1>{title["title"]}</h1>
      <button onClick={(e) => handleHome(e)} className="header__signOut">
        ホームへ
      </button>
    </header>
  );
};
