import Head from "next/Head";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
