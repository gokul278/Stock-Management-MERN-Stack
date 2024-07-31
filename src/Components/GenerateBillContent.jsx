import React from 'react'

export const GenerateBillContent = () => {
  return (
    <div className='h-[88vh] mt-[1vh] rounded bg-[white] w-[99%]'>
      <div className='mt-[40px] flex flex-col items-center sm:flex-row sm:justify-around'>
        <div className='w-[180px]' align="center">
          <div className='text-[20px] mb-[10px] text-[#444444] font-bold font-ptserif'>
            From Date
          </div>
          <div>
            <input
              type="date"
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-[18px] text-[#444444] bg-[#E0E0E0] font-semibold font-ptserif placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#1679AB] focus:border-2 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
        </div>
        <div className='w-[180px]' align="center">
          <div className='text-[20px] mt-[20px] sm:mt-[0px] mb-[10px] text-[#444444] font-bold font-ptserif'>
            To Date
          </div>
          <div>
            <input
              type="date"
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-[18px] text-[#444444] bg-[#E0E0E0] font-semibold font-ptserif placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#1679AB] focus:border-2 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div align="center">
        <button className='text-[20px] mt-[30px] font-semibold font-ptserif text-[white] bg-[#40A578] rounded pt-[10px] pb-[10px] px-[50px] mb-[20px] flex justify-center items-center'>
        <i class="fa-solid fa-download"></i> &nbsp;Download PDF
        </button>
      </div>
    </div>
  )
}
