import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthGuard = (props) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(true)

  const auth = getAuth();

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("email", user?.email);
        localStorage.setItem("uid", user?.uid);
        localStorage.setItem("accessToken", user?.accessToken);
        setIsLoading(false);
      } else {
        signOut(auth).then(() => {
          // Sign-out successful.
          navigate("/auth/login");
          setAnchorEl(null);
        });
        setIsLoading(false);
      }
    });
    setIsLoading(false);
  }, []);

  return !isLoading && (
    <div className="w-full h-full">{children}</div>
  )
};

export default AuthGuard;
