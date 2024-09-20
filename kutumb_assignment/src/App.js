import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import QuoteListPage from "./pages/QuotePage";
import CreateQuotePage from "./pages/CreateQuotepage";
import "./App.css"
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <div>
        {token && <button onClick={handleLogout}>Logout</button>}

        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/quotes" />
              ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/quotes"
            element={
              token ? <QuoteListPage token={token} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/create-quote"
            element={
              token ? <CreateQuotePage token={token} /> : <Navigate to="/" />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
