import { ToastContainer } from "react-toastify";
import HelpModal from "../components/HelpModal";
import Banner from "./Banner";
import Head from "next/head";
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Talk - E2E Chat Application</title>
      </Head>
      {/* <Banner /> */}
      <HelpModal />
      {children}
      <ToastContainer />
    </>
  );
}
