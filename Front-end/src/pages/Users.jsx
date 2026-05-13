import React, {
  useEffect,
  useState
} from "react";

import API from "../api/axios";

function Users() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const res =
        await API.get(
          "/users/all-users"
        );

      setUsers(res.data);

    } catch(err) {

      console.log(err);

    }

  };

  return (

    <div style={{ padding: "40px" }}>

      <h1 style={{ color: "white" }}>
        All Registered Users
      </h1>

      <br />

      {
        users.map((user) => (

          <div
            key={user._id}
            style={{
              background: "#11162b",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "12px",
              color: "white",
              border:
                "1px solid #2d325a"
            }}
          >

            <p>
              👤 {user.name}
            </p>

            <p>
              📧 {user.email}
            </p>

            <p>
              🔐 Role: {user.role}
            </p>

          </div>

        ))
      }

    </div>

  );

}

export default Users;