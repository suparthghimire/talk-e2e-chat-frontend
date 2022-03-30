import { useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { CALC_PRIVATE_KEY, CALC_PUBLIC_KEY } from "../utils/helpers";
import Head from "next/head";
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
        const privateKey = CALC_PRIVATE_KEY(data.p);
        const publicKey = CALC_PUBLIC_KEY(data.p, data.g, privateKey);
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

  return (
    <>
      <Head>
        <title>Talk - Login</title>
        <meta
          name="description"
          content="Diffie Hellman Key Exchange Implementation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="center-screen">
        <div className="card d-grid shadow-sm gap">
          <h1>Login</h1>
          <form action="#" onSubmit={handleSubmit} autoComplete="off">
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
    </>
  );
}
