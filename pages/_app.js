import "../styles/globals.css";
import SocketProvider from "../context/SocketContext";
import UserProvider from "../context/UserContext";
import Layout from "../components/Layout";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </SocketProvider>
  );
}

export default MyApp;
