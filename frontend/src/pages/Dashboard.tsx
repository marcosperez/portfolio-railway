import { useGetUsersQuery } from "../features/User/GetUsers.slice";
import "./Dashboard.scss";

function Dashboard() {
  const { data: users, isFetching, isLoading } = useGetUsersQuery();

  console.log(users);

  if (isFetching) return <div className="Dashboard">isFetching</div>;

  if (isLoading) return <div className="Dashboard">isLoading</div>;

  return <div className="Dashboard">{JSON.stringify(users)}</div>;
}

export default Dashboard;
