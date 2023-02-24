import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./context/user.context";
import { useEffect, useState } from "react";
import { UserProfile } from "./interface/users.interface";
import ky from "ky";
import { Spinner } from "./components/Spinner/Spinner";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);
  let params = window.location.search.substring(1);
  const access_token = params.split("=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);

      if (access_token) {
        const res = await ky.get("https://discord.com/api/users/@me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const user: any = await res.json();
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser({
            avatar: user.avatar,
            discriminator: user.discriminator,
            email: user.email,
            userId: user.id,
          });
        }
        navigate("/");
      }

      try {
        const storedValue: any = localStorage.getItem("user");
        const user = JSON.parse(storedValue);
        if (user.id) {
          setUser({
            avatar: user.avatar,
            discriminator: user.discriminator,
            email: user.email,
            userId: user.id,
          });
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }

      setLoading(false);
    };
    checkUser();
  }, []);

  return (
    // @ts-ignore
    <UserContext.Provider value={{ user, setUser, loading }}>
      {loading ? (
        <section className="absolute left-0 right-0 m-auto h-full">
          <Spinner />
        </section>
      ) : (
        <Routes>
          <Route path="login" element={<Home />} />
          <Route path=":id" element={<Home />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </UserContext.Provider>
  );
}

export default App;
