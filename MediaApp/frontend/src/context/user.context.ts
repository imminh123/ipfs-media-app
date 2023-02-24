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
