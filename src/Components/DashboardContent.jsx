import React, { useEffect, useState } from 'react'

export const DashboardContent = () => {

  const current = new Date();

  const [input, setInput] = useState({ year: current.getFullYear(), month: current.getMonth() });

  const [years, setYears] = useState([]);

  const [showMonth, setShowMonth] = useState([]);

  useEffect(() => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    if (parseInt(currentYear) === parseInt(input.year)) {
      setShowMonth(months.slice(0, currentMonth + 1));
    } else {
      setShowMonth(months);
    }
  }, [input.month, input.year]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    let startYear = 2023;
    const yearArray = [];

    while (startYear <= currentYear) {
      yearArray.push(startYear);
      startYear++;
    }

    setYears(yearArray);
  }, []);

  // console.log(year);
  return (
    <div className='h-[89vh] mt-[1vh] rounded bg-[white] w-[99%] overflow-x-auto overflow-y-auto'>
      <div className='flex justify-items mt-[10px]'>
        <div className='flex flex-col justify-center items-center'>
          <label className='text-[black] text-[18px] font-ptserif font-bold'>Year</label>
          <select className='bg-[#1679AB] rounded text-[white] font-ptserif font-bold p-[10px] ml-[10px] mr-[10px] focus:outline-none focus-visible:border-[white] w-[80px]' name='year' value={input.year} onChange={(event) => {
            setInput({
              ...input,
              [event.target.name]: event.target.value,
              month: 0
            })
          }} >
            {years.reverse().map((yr, index) => (
              <option className='bg-[white] text-[black]' key={index} value={yr} defaultValue={yr === input.year}>{yr}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <label className='text-[black] text-[18px] font-ptserif font-bold'>Month</label>
          <select className='bg-[#1679AB] rounded text-[white] font-ptserif font-black p-[10px] w-[130px] focus:outline-none focus-visible:border-[white]' name='month' value={input.month} onChange={(event) => {
            setInput({
              ...input,
              [event.target.name]: event.target.value
            })
          }}>

            {showMonth.map((month, index) => (
              <option className='bg-[white] text-[black]' key={index} value={index} defaultValue={index === input.month}>{month}</option>
            ))}

          </select>
        </div>
      </div>

      <div className='mt-[40px] flex flex-wrap justify-center lg:justify-around'>
        <div className='w-[250px] rounded h-[150px] bg-[#40A578] flex flex-col justify-center items-center'>
          <div className='w-[50%] text-[16px] text-[black] font-ptserif font-black' align="center">Total Monthly Sales Amount</div>
          <div className='w-[100%] mt-[15px] text-[25px] text-[black] font-ptserif font-black' align="center">1,00,000 Rs</div>
        </div>
        <div className='w-[250px] rounded mt-[20px] lg:mt-[0px] h-[150px] bg-[#FFDB5C] flex flex-col justify-center items-center'>
          <div className='w-[50%] text-[16px] text-[black] font-ptserif font-black' align="center">Total Monthly Stock Sales</div>
          <div className='w-[100%] mt-[15px] text-[25px] text-[black] font-ptserif font-black' align="center">1500</div>
        </div>
      </div>
      <div className='mt-[40px]'>
        <label className='text-[black] text-[20px] font-ptserif font-bold ml-[25px]'>Analytic Graphs </label>
        <div className='flex justify-center items-center mt-[10px]'>
          <div  className='w-[1080px] h-[300px] rounded border-2 border-[#1679AB] bg-[#EBF4F6] overflow-x-auto'>

          </div>
        </div>
      </div>
    </div>
  )
}
