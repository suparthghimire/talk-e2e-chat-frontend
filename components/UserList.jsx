import { useSocket } from "../context/SocketContext";
import { useUser } from "../context/UserContext";
export default function UserList({ users }) {
  const socket = useSocket();
  const [user, setUser] = useUser();
  const inviteUser = (otherUserRoomId) => {
    socket.emit("invite_user", {
      otherRoom: otherUserRoomId,
      myRoom: user.rooms[0],
    });
  };
  return (
    <>
      {users.map((user, idx) => {
        console.log(user);
        return (
          <li
            className="card user-list-item text-normal w-fit-content d-flex flex-center-between"
            key={`user-${user.id}-${idx}`}
          >
            <div className="info d-flex">
              <p className="text-normal">{user.name}</p>
              <small className="badge yellow">{user.id}</small>
              <small className="badge purple">Public Key: {user.public}</small>
            </div>
            <button
              onClick={() => inviteUser(user.rooms[0])}
              className="btn btn-primary text-normal"
            >
              Send Chat Invitation
            </button>
          </li>
        );
      })}
    </>
  );
}
