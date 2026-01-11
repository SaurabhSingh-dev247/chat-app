import "./App.css";
import LandingPage from "./components/LandingPage";
import DashBoard from "./components/dashboard/DashBoard";
import Modal from "./UI/dialog/Modal.jsx";
import Loader from "./UI/Loader/Loader.jsx";
import { openDashBoard, setUser } from "./store/auth-slice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "./api/axios.js";

function App() {
  const dispatch = useDispatch();
  const dashBoardOpen = useSelector((state) => state.auth.dashBoardOpen);
  const user = useSelector((state) => state.auth.user)
  const [pageLoading, setPageLoading] = useState(false);
  console.log("User: ",user)
  
  useEffect(() => {
    async function refreshPage() {
      try {
        setPageLoading(true);
        const response = await axiosInstance.post("/auth/refresh");
        dispatch(setUser({ ...response.data }));
        dispatch(openDashBoard());
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoading(false);
      }
    }
    refreshPage();
  }, []);

  return (
    <>
      <Modal open={pageLoading} onClose={() => setPageLoading(false)}>
        {pageLoading && <Loader />}
      </Modal>
      {!dashBoardOpen && <LandingPage />}
      {dashBoardOpen && <DashBoard />}
    </>
  );
}

export default App;
