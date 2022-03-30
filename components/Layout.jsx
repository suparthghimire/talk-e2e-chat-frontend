import Head from "next/Head";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>E2E Encryption using Diffie Hellman</title>
        <meta
          name="description"
          content="Diffie Hellman Key Exchange Implementation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <ToastContainer />
    </>
  );
}
