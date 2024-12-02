// App.js
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import { supabase } from "../supabase";
import "./App.css";

export const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Culinary-Mate</h1>
      </header>
      <div className="App-content">{session ? <Home /> : <Login />}</div>
    </div>
  );
};

// export default App;
