import { loginUser } from "./UserSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";
import { UserLogin } from "./models/UserLogin";

export const useLoginUser = () => {
  const dispatch = useAppDispatch();
  return (user: UserLogin) => {
    dispatch(loginUser(user));
  };
};

export const GetUser = () => {
  return useSelector((state: RootState) => state.user);
};
