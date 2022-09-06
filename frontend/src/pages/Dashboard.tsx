import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../features/hooks";
// import { useGetUsersQuery } from "../features/User/GetUsers.slice";
import { logoutUser } from "../features/User/LoginUserSlice";
import "./Dashboard.scss";

function Dashboard() {
  // const { data: users, isFetching, isLoading } = useGetUsersQuery();
  // if (isFetching) return <div className="Dashboard">isFetching</div>;
  // if (isLoading) return <div className="Dashboard">isLoading</div>;

  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser({}));
    navigate(`/login`);
  };

  return (
    <div className="Dashboard">
      <div>DASHBOARD</div>
      <div className="logout-btn" onClick={logout}>
        Logout
      </div>
    </div>
  );
}

export default Dashboard;
