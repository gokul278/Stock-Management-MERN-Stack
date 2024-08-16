import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

// Register the required elements and scales
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

export const DashboardContent = () => {

  const navigate = useNavigate();
  const current = new Date();

  const [input, setInput] = useState({ year: current.getFullYear(), month: current.getMonth() });
  const [years, setYears] = useState([]);
  const [showMonth, setShowMonth] = useState([]);

  const [loadingStatus, setLoadingStatus] = useState(true);

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
    let startYear = 2024;
    const yearArray = [];

    while (startYear <= currentYear) {
      yearArray.push(startYear);
      startYear++;
    }

    setYears(yearArray);
  }, []);

  const [sales, setSales] = useState({
    totalsalesamount: 0,
    totalsalesstock: 0
  });

  const [totaldates, setTotaldates] = useState([]);
  const [totalamounts, setTotalAmounts] = useState([]);
  const [totalStocks, setTotalStocks] = useState([]);

  useEffect(() => {
    Axios.post(process.env.REACT_APP_API_URL + "/dashboard", {
      year: input.year,
      month: parseInt(input.month) + 1
    }, {
      headers: {
        Authorization: localStorage.getItem("JWTtoken"),
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data.message === "tokenformateinvalid") {
        navigate("/unauthorized");
      } else if (res.data.message === "timeexpired") {
        navigate("/timeexpire");
      } else if (res.data.status === "success") {
        setSales({
          totalsalesamount: res.data.totalsalesamount,
          totalsalesstock: res.data.totalsalesstock
        });

        setTotaldates(res.data.dates);
        setTotalAmounts(res.data.amounts);
        setTotalStocks(res.data.stocks);
        setLoadingStatus(false);
      }
    });
  }, [input.month, input.year, navigate]);

  const graphdata = {
    labels: totaldates, // Dates on the x-axis
    datasets: [
      {
        label: 'Total Sales Price',
        data: totalamounts, // Amounts on the y-axis
        borderColor: '#40a578',
        backgroundColor: '#40a578',
        fill: true,
        borderWidth: 2
      },
      {
        label: 'Total Sales Stock',
        data: totalStocks, // Amounts on the y-axis
        borderColor: '#ffdb5c',
        backgroundColor: '#ffdb5c',
        fill: true,
        borderWidth: 2
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'category', // Use category scale
        ticks: {
          autoSkip: false
        },
      },
      y: {
        beginAtZero: true // Start y-axis at zero
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

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
            setLoadingStatus(true);
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
            setLoadingStatus(true);
          }}>
            {showMonth.map((month, index) => (
              <option className='bg-[white] text-[black]' key={index} value={index} defaultValue={index === input.month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='mt-[40px] mb-[40px] flex flex-wrap justify-center lg:justify-around'>
        <div className='w-[250px] rounded h-[150px] bg-[#40A578] flex flex-col justify-center items-center'>
          <div className='w-[50%] text-[16px] text-[black] font-ptserif font-black' align="center">Total Monthly Sales Amount</div>
          <div className='w-[100%] mt-[15px] text-[25px] text-[black] font-ptserif font-black' align="center">{loadingStatus ? (<div className="btnloader">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
            <div className="bar7"></div>
            <div className="bar8"></div>
            <div className="bar9"></div>
            <div className="bar10"></div>
            <div className="bar11"></div>
            <div className="bar12"></div>
          </div>) : (<>{sales.totalsalesamount} Rs</>)}</div>
        </div>
        <div className='w-[250px] rounded mt-[20px] lg:mt-[0px] h-[150px] bg-[#FFDB5C] flex flex-col justify-center items-center'>
          <div className='w-[50%] text-[16px] text-[black] font-ptserif font-black' align="center">Total Monthly Stock Sales</div>
          <div className='w-[100%] mt-[15px] text-[25px] text-[black] font-ptserif font-black' align="center">{loadingStatus ? (<div className="btnloader">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
            <div className="bar7"></div>
            <div className="bar8"></div>
            <div className="bar9"></div>
            <div className="bar10"></div>
            <div className="bar11"></div>
            <div className="bar12"></div>
          </div>) : (<>{sales.totalsalesstock}</>)}</div>
        </div>
      </div>

      <div className='h-[47vh]'>
        <label className='text-[black] text-[20px] font-ptserif font-bold ml-[25px]'>Analytic Graphs</label>
        <div className='mt-[10px] w-[100%] h-[43vh] overflow-x-auto'>
          <div className='flex justify-center items-center w-[1080px] lg:w-full h-[280px] lg:h-[300px] overflow-x-auto'>
            <div className='w-[1080px] lg:w-[99%] h-[280px] lg:h-[300px] rounded border-2 border-[#1679AB] bg-[#ffffff] overflow-auto flex justify-center items-center'>
              {
                loadingStatus ? (
                  <div className="flex justify-center w-[150px] h-[50px] bg-[#000000b0] p-[10px] rounded">
                    <span className="text-[20px] font-ptserif text-[#FFF]">Loading </span> &nbsp;&nbsp;&nbsp;
                    <div className="btnloader">
                      <div className="bar1 "></div>
                      <div className="bar2"></div>
                      <div className="bar3"></div>
                      <div className="bar4"></div>
                      <div className="bar5"></div>
                      <div className="bar6"></div>
                      <div className="bar7"></div>
                      <div className="bar8"></div>
                      <div className="bar9"></div>
                      <div className="bar10"></div>
                      <div className="bar11"></div>
                      <div className="bar12"></div>
                    </div>
                  </div>
                ) : (
                  <Line
                    data={graphdata}
                    options={{
                      ...options,
                      responsive: true, // Make the chart responsive
                      maintainAspectRatio: false // Prevent maintaining the aspect ratio
                    }}
                    style={{ width: '100%', height: '100%' }} // Set width and height to 100%
                  />
                )
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
