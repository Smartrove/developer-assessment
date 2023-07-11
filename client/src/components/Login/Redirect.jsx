import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeUsers } from "../../redux/features/slice/userSlice";

const Redirect = () => {
  const [users, setUsers] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/v1/user/all-users`
        );
        setUsers(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    dispatch(storeUsers(users));
  }, [dispatch, users]);

  return (
    <div>
      <h1 style={{ color: "#fff", textAlign: "center" }}>
        {users.map((user) => {
          return user.name;
        })}
      </h1>
    </div>
  );
};

export default Redirect;
