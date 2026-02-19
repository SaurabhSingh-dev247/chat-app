import "./App.css";
import LandingPage from "./components/LandingPage";
import Modal from "./UI/dialog/Modal.jsx";
import Loader from "./UI/Loader/Loader.jsx";
import DashBoard from "./components/dashboard/DashBoard.jsx";
import { openDashBoard, setUser } from "./store/auth-slice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "./api/axios.js";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dashBoardOpen = useSelector((state) => state.auth.dashBoardOpen);
  const userData = useSelector((state) => state.auth.userData);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    navigate("/");
    async function refreshPage() {
      try {
        setPageLoading(true);
        const response = await axiosInstance.post("/auth/refresh");
        dispatch(setUser({ ...response.data }));
        dispatch(openDashBoard());
        navigate("/dashboard");
      } catch (error) {
        
        console.log(error);
      } finally {
        setPageLoading(false);
      }
    }
    //refreshPage();
  }, []);

  return (
    <>
      {pageLoading && <Loader />}
      {!pageLoading && !dashBoardOpen && (
        <LandingPage isDashboardOpen={dashBoardOpen} user={userData} />
      )}
      {!pageLoading && dashBoardOpen && Object.keys(userData).length > 0 && (
        <DashBoard />
      )}
    </>
  );
}

export default App;


