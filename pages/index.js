import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Index() {
  const [name, setName] = useState("");
  const [user, setUser] = useUser();
  const socket = useSocket();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 0) {
      socket.emit("user_join", { name });
      socket.on("constants", (data) => {
        const privateKey = randomIntFromInterval(1, data.p);
        const publicKey = Math.pow(Number(data.g), privateKey) % data.p;
        socket.emit("update_user", { id: data.id, name, publicKey });
        socket.on("user_updated", (newUser) => {
          setUser({
            ...data,
            name: name,
            private: privateKey,
            public: publicKey,
            rooms: newUser.rooms,
          });
          toast.success("Room Joined", { autoClose: 1000 });
          router.push("/users");
        });
        socket.on("user_update_failed", () => {
          console.log("Error While Updating User");
        });
      });
    }
  };
  useEffect(() => {
    console.log("user change", user);
  }, [user]);
  return (
    <div className="center-screen">
      <div className="card d-grid shadow-sm gap">
        <h1>Login</h1>
        <form action="#" onSubmit={handleSubmit}>
          <div className="d-grid grid-column gap login-form-div">
            <label htmlFor="name" className="text-normal">
              Enter Your Name
            </label>
            <input
              id="name"
              type="text"
              className="form-control text-normal"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn btn-primary text-normal" type="submit">
              Join Others
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
