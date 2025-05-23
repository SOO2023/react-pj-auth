import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuthCxt = () => {
  return useContext(AuthContext);
};

export default useAuthCxt;
