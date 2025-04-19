import { useState, useEffect } from "react";
import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState("login");
  const [selectedCategoryId, setSelectedCategoryId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    setSelectedCategoryId(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isLoggedIn ? (
        <>
          <UserInfo onLogout={handleLogout} />
          <CategoryList onSelectCategory={setSelectedCategoryId} />
          {selectedCategoryId && (
            <ProductList categoryId={selectedCategoryId} />
          )}
        </>
      ) : (
        <>
          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setShowForm("login")}>Login</button>
            <button onClick={() => setShowForm("signup")} style={{ marginLeft: "10px" }}>SignUp</button>
          </div>
          {showForm === "login" ? (
            <LoginForm onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <SignUpForm />
          )}
        </>
      )}
    </div>
  );
}

export default App;