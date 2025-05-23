import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get("/users");
        setUsers(response?.data ?? []);
        setError("");
      } catch (error) {
        if (error.isAxiosError && !error.response) {
          setError({
            status: 503,
            message: "Server might be temporarily unavailable.",
          });
        } else {
          setError({
            status: error.response?.status || 500,
            message:
              typeof error.response?.data?.detail === "string"
                ? error.response.data.detail
                : error.message || "Unknown error occurred",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);
  
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      {error ? (
        <div style={{ color: "red" }}>
          {error.status}: {error.message}
        </div>
      ) : (
        ""
      )}
      {users.length > 0 ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <div>Oops! List is empty</div>
      )}
    </div>
  );
};

export default UserList;
