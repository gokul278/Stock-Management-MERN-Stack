import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { changeLoadingStatus } from '../slices/LoadingStatus';
import unauthorized from "../Assets/Images/unauthorized.png"

export const Unautherized = () => {

  useEffect(() => {
    document.title = "Stock Management - Unauthorized Access";
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
        <img src={unauthorized} className='w-[400px]' alt="logo" />
        <h1 className="font-glitch text-[60px] text-[#444444]" align='center'>
          Unautherized Access
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
