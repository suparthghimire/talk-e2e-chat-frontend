import { ToastContainer } from "react-toastify";
import HelpModal from "../components/HelpModal";
export default function Layout({ children }) {
  return (
    <>
      <HelpModal />
      {children}
      <ToastContainer />
    </>
  );
}
