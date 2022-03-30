import { ToastContainer } from "react-toastify";
import HelpModal from "../components/HelpModal";
import Banner from "./Banner";
export default function Layout({ children }) {
  return (
    <>
      <Banner />
      <HelpModal />
      {children}
      <ToastContainer />
    </>
  );
}
