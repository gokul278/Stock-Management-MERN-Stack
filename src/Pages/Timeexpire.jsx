import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeLoadingStatus } from '../slices/LoadingStatus';
import timeexpired from "../Assets/Images/timeexpired.png";

export const Timeexpire = () => {

  useEffect(() => {
    document.title = "Stock Management - Time Expired";
  })

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const gobacklogin = () => {

    dispatch(changeLoadingStatus(true));

    navigate('/', { replace: true });

  }

  return (
    <div className='pagenotfound-container'>
      <div className='flex flex-col justify-center items-center pb-[40px]' style={{ height: "100vh" }}>
        <img src={timeexpired} className='w-[400px]' alt="logo" />
        <h1 className="font-glitch text-[60px] text-[#444444]" align='center'>
          Time Expired
        </h1>
        <button className="pushable mt-[20px]" onClick={gobacklogin}>
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front">
            Login Again
          </span>
        </button>
      </div>
    </div>
  )
}
