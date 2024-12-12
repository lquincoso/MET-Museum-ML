import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);

  const history = useNavigate();

  const loginUser = async (email, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      console.log("Logged In");
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history("/");
    } else {
      console.log(response.status);
      console.log("there was a server issue");
    }
  };

  const registerUser = async (email, username, password, password2) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          password2,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        history("/login");
      } else {
        console.error("Registration failed:", data);
        throw new Error(
          data.detail || Object.values(data)[0]?.[0] || "Registration failed"
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history("/login");
  };

  const refreshToken = async () => {
    const refresh = authTokens.refresh;
    try {
        const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh }),
        });
        if (response.ok) {
            const data = await response.json();
            setAuthTokens((prevTokens) => ({
                ...prevTokens,
                access: data.access,
            }));
            return data.access; 
        } else {
            console.error("Failed to refresh token:", response.status);
            alert("Session expired. Please log in again.");
            logoutUser(); 
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
    }
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
