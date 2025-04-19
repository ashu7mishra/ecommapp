import { useState, useEffect } from "react";
import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <h1>My App</h1>
      {isLoggedIn ? (
        <UserInfo onLogout={() => setIsLoggedIn(false)}/>
      ):(
        <>
          <SignUpForm />
        <hr/>
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
        </>
      )
      }
      
    </div>
  );
}

export default App;
