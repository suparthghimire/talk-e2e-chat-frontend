import Head from "next/head";
import { useState, useEffect } from "react";
import CryptoJs from "crypto-js";
import MessageList from "../components/MessageList";
const { io } = require("socket.io-client");
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Home() {
  const [skt, setSkt] = useState(null);
  const [PRkMe, setPRkMe] = useState(null); //my public key
  const [PUkMe, setPUkMe] = useState(null); // my private key
  const [id, setId] = useState(null); // my private key
  const [SHk, setSHK] = useState(null); //our shared key
  const [oriMsg, setOriMsg] = useState("");
  const [encryptedMessages, setEncryptedMessages] = useState([]);
  const [decryptedMessages, setDecryptedMessages] = useState([]);

  const appendDecMsg = (newVal) => {
    setDecryptedMessages([newVal, ...decryptedMessages]);
  };
  const appendEncMsg = (newVal) => {
    setEncryptedMessages([newVal, ...encryptedMessages]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (oriMsg.length > 0) {
      const AES_Enc = CryptoJs.AES.encrypt(oriMsg, String(SHk));
      const AES_Dec = CryptoJs.AES.decrypt(AES_Enc, String(SHk));
      const decMsg = AES_Dec.toString(CryptoJs.enc.Utf8);
      appendEncMsg({ id, msg: AES_Enc.toString() });
      appendDecMsg({ id, msg: decMsg.toString() });
      skt.emit("message", AES_Enc.toString());
      setOriMsg(null);
    }
  };

  useEffect(() => {
    let privateKey, publicKey, sharedKey;
    let p, g;
    let myid;

    const socket = io("http://localhost:3000");

    setSkt(socket);

    socket.emit("user_join");

    socket.on("constants", (data) => {
      p = data.p;
      g = data.g;
      myid = data.id;

      privateKey = randomIntFromInterval(1, p);
      publicKey = Math.pow(Number(g), privateKey) % p;
      setPRkMe(privateKey);
      setPUkMe(publicKey);
      setId(myid);
      socket.emit("public_key", publicKey);
    });
    socket.on("public_key", (otherPublicKey) => {
      sharedKey = Math.pow(otherPublicKey, privateKey) % p;
      setSHK(sharedKey);
    });
    socket.on("otherUsersPublicKey", (otherPublicKey) => {
      if (otherPublicKey !== "") {
        sharedKey = Math.pow(otherPublicKey, privateKey) % p;
        setSHK(sharedKey);
      }
    });
    socket.on("user_disconnected", () => {
      setSHK(null);
    });
    socket.on("message", ({ sender_id, msg }) => {
      const AES_Dec = CryptoJs.AES.decrypt(msg, String(sharedKey));
      const decMsg = AES_Dec.toString(CryptoJs.enc.Utf8);
      setEncryptedMessages((prevMsg) => [
        { id: sender_id, msg: msg },
        ...prevMsg,
      ]);
      setDecryptedMessages((prevMsg) => [
        { id: sender_id, msg: decMsg.toString() },
        ...prevMsg,
      ]);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Demo of Diffie Hellman Key Exchange</title>
        <meta
          name="description"
          content="Diffie Hellman Key Exchange Implementation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      I am Client id: <b> {id}</b>
      <br />
      Public Key <b>{PUkMe}</b>
      <br />
      Private Key <b>{PRkMe}</b>
      <br />
      Shared Key <b>{SHk}</b>
      <br />
      <hr />
      {SHk !== null && (
        <div>
          Enter Message
          <br />
          <small>
            <i>
              This Message Will be Encrypted by Using <b>AES-256 Cipher</b> with
              the help of<b> Shared Key</b>.
            </i>
          </small>
          <br />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => setOriMsg(e.target.value)}
              value={oriMsg}
            />
          </form>
          <section>
            After Decryption
            <MessageList userId={id} messages={decryptedMessages} />
          </section>
          <hr />
          <section>
            Before Decryption
            <ul>
              <MessageList userId={id} messages={encryptedMessages} />
            </ul>
          </section>
        </div>
      )}
      {SHk === null && (
        <div>
          No Other User Found.
          <br />
          You Can Emulate Other User By Opening This Endpoint on New Tab to Send
          and Recieve Messages
        </div>
      )}
    </div>
  );
}
