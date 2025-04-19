import { useState, useEffect } from "react";
import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px"}}>
      {isLoggedIn ? (
        <UserInfo onLogout={() => setIsLoggedIn(false)} />
      ) : (
      <>
      <div style={{marginTop: "20px"}}>
        <button onClick={() => setShowForm("login")}>Login</button>
        <button onClick={() => setShowForm("signup")} style={{ marginLeft: "10px" }}>SignUp</button>
      </div>
      {showForm === "login" ? (
        <LoginForm onLogin={() => setIsLoggedIn(true)}/>
      ) : (
        <SignUpForm/>
      )}
      </>
    )}
    </div>
  );
}

export default App;
