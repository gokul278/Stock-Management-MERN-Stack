import React, { useEffect } from 'react'
import cragxlogo from '../Assets/Images/Cragx Text-Logo - Light.png'

export const Login = () => {

  useEffect(()=>{
    document.title = "Stock Management - Login";
  })

  return (
    <div className='logincontainer flex flex-col items-center justify-center'>
      <div className='bg-[#ffffff] w-[90%] md:w-[600px] rounded-[5px] flex flex-col items-center justify-center' style={{ boxShadow: '0px 0px 76px #000000' }}>
        <img src={cragxlogo} className='w-[200px]' alt='company Logo' />
        <div align="start" className='w-[90%]'>
          <h1 className='text-[35px] font-dancing'>Login</h1>
        </div>
        <div align="start" className='w-[90%] mt-[30px]'>
          <label className='text-[17px] font-ptserif font-semibold text-[#444444]' htmlFor='useremail'>&nbsp;User Email</label>
          <input
            id="useremail"
            type="text"
            placeholder="Enter User Email"
            className="peer mt-[2px] relative h-14 w-full font-ptserif font-semibold rounded border-[3px] border-transparent bg-[#D9D9D9] px-3 text-[16px] text-[#444444]  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[3px] focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
        </div>
        <div align="start" className='w-[90%] mt-[20px]'>
          <label className='text-[17px] font-ptserif font-semibold text-[#444444]' htmlFor='password'>&nbsp;Password</label>
          <div className='flex items-center justify-center'>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="peer mt-[2px] relative h-14 w-full font-ptserif font-semibold rounded border-[3px] border-transparent bg-[#D9D9D9] px-3 text-[16px] text-[#444444] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[3px] focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
            <div className='w-[50px] ml-[5px] h-[60px] rounded text-[20px] text-[#444444] bg-[#D9D9D9] flex items-center justify-center'><i class="fa-solid fa-eye"></i></div>
          </div>
        </div>
        <div className='w-[90%] mt-[15px] mb-[30px]' align="center">
          <button className="pushable mt-[20px]">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">
              Submit
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
