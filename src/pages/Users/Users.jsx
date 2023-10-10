import { useEffect, useState } from "react";
import UserItem from "../../components/UserItem/UserItem";
const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        let res = await fetch("http://localhost:5000/api/v1/users");
        if (res.ok) {
          let data = await res.json();
          setUsers(data);
        } else {
          console.log("Error (IN): ", res);
        }
      } catch (e) {
        console.log("Error!: ", e);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="container-full flex flex-col space-y-2 justify-center items-center">
      {users &&
        users.map((user, _) => (
          <UserItem
            key={user._id}
            firstName={user.firstName}
            lastName={user.lastName}
            userId={user._id}
            user={user}
          />
        ))}
    </div>
  );
};

export default Users;
