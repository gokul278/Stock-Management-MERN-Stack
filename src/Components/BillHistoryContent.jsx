import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';

export const BillHistoryContent = () => {

  const navigate = useNavigate();

  //Fetch Data
  const [billingsData, setBillingsdata] = useState([]);

  const [totalsales, setTotalsales] = useState({
    totalsalesamount: 0,
    totalsalesstock: 0
  });

  //set Date
  const [date, setDate] = useState({
    fromDate: "",
    toDate: "",
    loadingStatus: false,
    setStatus: false
  })

  const handleDateInput = (event) => {
    setDate({
      ...date,
      [event.target.name]: event.target.value
    })
  }

  const submitDate = () => {
    setDate({
      ...date,
      loadingStatus: true
    })

    if (!date.loadingStatus) {

      setDate({
        ...date,
        setStatus: true
      })

    }
  }

  useEffect(() => {
    if (date.setStatus) {
      Axios.post(process.env.REACT_APP_API_URL + "/billings/searchdate", {
        fromDate: date.fromDate,
        toDate: date.toDate
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
          setBillingsdata(res.data.billings);
          setTotalsales({
            totalsalesamount: res.data.totalsalesamount,
            totalsalesstock: res.data.totalsalesstock
          });
          setDate((prevDate) => ({
            ...prevDate,
            loadingStatus: false
          }));
        }
      })

    } else {
      Axios.get(process.env.REACT_APP_API_URL + "/billings", {
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
          setBillingsdata(res.data.billings);
          setTotalsales({
            totalsalesamount: res.data.totalsalesamount,
            totalsalesstock: res.data.totalsalesstock
          })
        }
      });
    }
  });

  const clearInput = () => {
    setDate({
      fromDate: "",
      toDate: "",
      loadingStatus: false,
      setStatus: false
    });

    // Reset the fetched data as well
    setBillingsdata([]);
    setTotalsales({
      totalsalesamount: 0,
      totalsalesstock: 0
    });
  };


  return (
    <div className='h-[89vh] mt-[1vh] rounded bg-[white] w-[99%]'>
      <div className='mt-[40px] flex justify-around flex-wrap gap-3'>
        <div className='w-[160px]' align="center">
          <div className='text-[20px] mb-[10px] text-[#444444] font-bold font-ptserif'>
            From Date
          </div>
          <div>
            <input
              type="date"
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-[18px] text-[#444444] bg-[#E0E0E0] font-semibold font-ptserif placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#1679AB] focus:border-2 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              name='fromDate'
              onInput={handleDateInput}
              value={date.fromDate}
            />
          </div>
        </div>
        <div className='w-[160px]' align="center">
          <div className='text-[20px] mb-[10px] text-[#444444] font-bold font-ptserif'>
            To Date
          </div>
          <div>
            <input
              type="date"
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-[18px] text-[#444444] bg-[#E0E0E0] font-semibold font-ptserif placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#1679AB] focus:border-2 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              name='toDate'
              onInput={handleDateInput}
              value={date.toDate}
            />
          </div>
        </div>
        <div className='w-[160px] flex flex-col justify-center items-center gap-2' align="center">
          <button className=' py-[5px] w-[100%] bg-[#1679AB] rounded text-[#fff] text-[16px] font-ptserif disabled:bg-[#6bb5da] disabled:cursor-not-allowed' disabled={date.fromDate.length === 0 || date.toDate.length === 0}
            onClick={submitDate}>
            {
              date.loadingStatus ? (
                <div className="flex justify-center rounded">
                  <span className="text-[16px] font-ptserif text-[#FFF]">Loading </span> &nbsp;&nbsp;&nbsp;
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
                <>Set</>
              )
            }
          </button>
          <button className=' py-[5px] w-[100%] rounded text-[#fff] text-[16px] font-ptserif bg-[#C40C0C] disabled:bg-[#ed6666] disabled:cursor-not-allowed' disabled={date.fromDate.length === 0 || date.toDate.length === 0} onClick={clearInput}>Clear  &nbsp;<i className="fa-solid fa-trash"></i></button>
        </div>
      </div>
      <div className='h-[66vh] mt-[1vh] w-[100%] flex flex-col items-center overflow-x-auto overflow-y-auto'>
        <div className='w-[1020px]'>
          <table className='billhistory'>
            <thead>
              <tr>
                <th scope='row' className='w-[150px]'>Date & Time</th>
                <th scope='row' className='w-[150px]'>Bill ID</th>
                <th scope='row' className='w-[210px]'>Product Name</th>
                <th scope='row' className='w-[170px]'>Quantity</th>
                <th scope='row' className='w-[170px]'>Price</th>
                <th scope='row' className='w-[170px]'>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {
                billingsData.length > 0 ? (
                  <>{
                    billingsData.map((element) => (
                      <React.Fragment key={element.bill_id}>



                        {

                          element.products.map((product, index) => {

                            let parsedDate = new Date(element.createdAt);
                            let day = String(parsedDate.getDate()).padStart(2, '0');
                            let month = String(parsedDate.getMonth() + 1).padStart(2, '0');
                            let year = parsedDate.getFullYear();
                            let hours = String(parsedDate.getHours()).padStart(2, '0');
                            let minutes = String(parsedDate.getMinutes()).padStart(2, '0');
                            let formattedDate = `${day}-${month}-${year}`;
                            let formattedtime = `${hours}:${minutes}`

                            return (
                              <React.Fragment key={index}>
                                {
                                  index === 0 ? (
                                    <tr>
                                      <td rowSpan={element.products.length + 1} className='bg-[#cde8f6]'>{formattedDate} <br /> {formattedtime}</td>
                                      <td rowSpan={element.products.length + 1} className='bg-[#cde8f6]'>{element.bill_id}</td>
                                      <td className='bg-[#edefc9]'>{product.product_name}</td>
                                      <td className='bg-[#edefc9]'>{product.quantity}</td>
                                      <td className='bg-[#edefc9]'>{product.product_price}</td>
                                      <td className='bg-[#edefc9]'>{product.quantity * product.product_price}</td>
                                    </tr>
                                  ) : (
                                    <tr>
                                      <td className='bg-[#edefc9]'>{product.product_name}</td>
                                      <td className='bg-[#edefc9]'>{product.quantity}</td>
                                      <td className='bg-[#edefc9]'>{product.product_price}</td>
                                      <td className='bg-[#edefc9]'>{product.quantity * product.product_price}</td>
                                    </tr>
                                  )
                                }
                              </React.Fragment>
                            )
                          })

                        }

                        <tr>
                          <td colSpan="3" className='bg-[#cde8f6]'>Total Bill Amount</td>
                          <td className='bg-[#cde8f6]'>{element.total_billvalue}</td>
                        </tr>

                      </React.Fragment>
                    ))
                  }</>
                ) : (<>
                  <tr>
                    <td colSpan="6">No Bill Found</td>
                  </tr>
                </>)
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex justify-center'><div className='w-[90%] flex mt-[1vh] flex-wrap gap-5'><div className='text-[18px] text-[black] font-ptserif'>Total Sales Amount : <span className='bg-[#1679AB] px-[5px] rounded text-[#fff]'>{totalsales.totalsalesamount} &nbsp;<i className="fa-solid fa-indian-rupee-sign text-[16px]"></i></span></div><div className='text-[18px] text-[black] font-ptserif'>Total Stock Sales : <span className='bg-[#1679AB] px-[5px] rounded text-[#fff]'>{totalsales.totalsalesstock}</span></div></div></div>
    </div>
  )
}
