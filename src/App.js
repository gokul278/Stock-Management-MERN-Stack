import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Pages/Login.jsx';
import { Dashboard } from './Pages/Dashboard.jsx';
import { Billings } from './Pages/Billings.jsx';
import { Stocks } from './Pages/Stocks.jsx';
import { GenerateBill } from './Pages/GenerateBill.jsx';
import { BillHistory } from './Pages/BillHistory.jsx';
import { PagenotFound } from './Pages/PagenotFound.jsx';
import LoadingBar from 'react-top-loading-bar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { changeLoadingStatus } from "./slices/LoadingStatus.js";
import { changeMenubar, changeMenumobile } from './slices/MenuStatus';
import { Unautherized } from "./Pages/Unautherized.jsx";
import { Timeexpire } from "./Pages/Timeexpire.jsx";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const [loadprogress, setLoadProgress] = useState(100);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      dispatch(changeMenubar("closed"));
      dispatch(changeMenumobile(true));
    } else {
      dispatch(changeMenubar("opened"));
      dispatch(changeMenumobile(false));
    }
  })


  useEffect(() => {
    if (loading.loadstatus) {
      setLoadProgress(60);
      setTimeout(() => {
        dispatch(changeLoadingStatus(false));
        setLoadProgress(100);
      }, 200);
    }
  }, [loading.loadstatus, dispatch]);

  return (
    <div>
      <LoadingBar
        color='#1679AB'
        progress={loadprogress}
        height={3}
        onLoaderFinished={() => setLoadProgress(0)}
      />
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/billings" element={<Billings />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/generatebill" element={<GenerateBill />} />
          <Route path="/billhistory" element={<BillHistory />} />
          <Route path="/unauthorized" element={<Unautherized />} />
          <Route path="/timeexpire" element={<Timeexpire />} />
          <Route path="*" element={<PagenotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
