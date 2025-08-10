import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Function to decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.exp > Date.now() / 1000) {
        // Extract user information from token
        let userRole = "USER";
        if (decodedToken.authorities && decodedToken.authorities.length > 0) {
          const roleAuthority = decodedToken.authorities.find(auth => 
            auth.authority && auth.authority.startsWith('ROLE_')
          );
          if (roleAuthority) {
            userRole = roleAuthority.authority.replace('ROLE_', '');
          }
        }
        
        return {
          username: decodedToken.sub,
          role: userRole,
          exp: decodedToken.exp
        };
      }
    }
    return null;
  });

  const login = (userData, token) => {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      let userRole = "USER";
      if (decodedToken.authorities && decodedToken.authorities.length > 0) {
        const roleAuthority = decodedToken.authorities.find(auth => 
          auth.authority && auth.authority.startsWith('ROLE_')
        );
        if (roleAuthority) {
          userRole = roleAuthority.authority.replace('ROLE_', '');
        }
      }
      
      const userInfo = {
        username: decodedToken.sub,
        role: userRole,
        exp: decodedToken.exp,
        ...userData
      };
      
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user", JSON.stringify(userInfo));
      setUser(userInfo);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Check token expiration on app load
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = decodeToken(token);
      if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
