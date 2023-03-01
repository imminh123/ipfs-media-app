import { createContext } from "react";

export const UserContext = createContext({
  user: {
    userId: "",
    discriminator: "",
    avatar: "",
    email: "",
  },
  setUser: () => {},
  loading: true,
});

function number() {
  let count = 0;
  return () => {
    console.log(++count);
  };
}

number();
number();
number();
number();
