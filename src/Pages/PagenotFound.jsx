import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import pagenotfound from '../Assets/Images/PagenotFound.svg';
import { changeLoadingStatus } from "../slices/LoadingStatus.js";
import { useDispatch } from 'react-redux';

export const PagenotFound = () => {

    useEffect(()=>{
        document.title = "Stock Management - Page Not Found";
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
                <img src={pagenotfound} className='w-[400px]' alt="logo" />
                <h1 className="font-glitch text-[60px] text-[#444444]" align='center'>
                    Page Not Found
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
