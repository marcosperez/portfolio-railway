import { setUser } from "./UserSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";
import { User } from "./models/User";

export const useSetUser = () => {
  const dispatch = useAppDispatch();
  return (user: User) => {
    dispatch(setUser(user));
  };
};

export const GetUser = () => {
  return useSelector((state: RootState) => state.user.user);
};
