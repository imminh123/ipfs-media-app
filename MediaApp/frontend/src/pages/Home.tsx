// Render Prop
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Label } from "../components/Label";
import Banner from "../assets/banner.jpg";
import DiscordLogo from "../assets/discord.png";
import { ErrorLabel } from "../components/ErrorLabel";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/shinka/auth/login`);
  };

  return (
    <div className="flex max-h-screen h-screen">
      <img className="w-2/5 object-cover h-screen" src={Banner} alt="Socotec" />

      <div className="w-3/5 h-full relative">
        <div
          onClick={handleLogin}
          className="flex items-center m-auto justify-center p-2 w-1/2 rounded-md  bg-discord-100 text-white cursor-pointer absolute top-1/2 -translate-y-1/2 m-auto left-0 right-0"
        >
          <img className="w-5 h-4 mr-2 " src={DiscordLogo} alt="discord logo" />
          <p>Sign in with Discord</p>
        </div>
      </div>
    </div>
  );
};
