import Login from "./components/Login/Login";
import Redirect from "./components/Login/Redirect";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="redirect" element={<Redirect />} />
      </Routes>
    </>
  );
}

export default App;
