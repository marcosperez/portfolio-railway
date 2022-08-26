import { useEffect, useState } from "react";
import { User } from "../features/User/models/User";
import { getUsers } from "../features/User/user.api";
import "./Dashboard.scss";

function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((usersResponse) => {
      setUsers(usersResponse.data.data);
    });
  }, []);

  return <div className="Dashboard">{JSON.stringify(users)}</div>;
}

export default Dashboard;
