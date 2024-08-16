import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export const BillingsContent = () => {

  const navigate = useNavigate();

  const [modal, setModal] = useState({ isopen: false, closing: false });

  const closingmenu = () => {
    setModal({ isopen: true, closing: true });

    setTimeout(() => {
      setModal({ isopen: false, closing: false });
    }, 220);
  }

  //Fetch Data
  const [stockdata, setStockdata] = useState({});
  const [stockloadingstatus, setStockloadingstatus] = useState(true);
  const [searchText, setsearchText] = useState("");
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {

    if (searchText.length > 0) {
      Axios.post(process.env.REACT_APP_API_URL + "/stocks/search", {
        product_name: searchText,
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
          setStockdata(res.data.stocks);
          setStockloadingstatus(false);
        }
      });

    } else {

      Axios.get(process.env.REACT_APP_API_URL + "/stocks", {
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
          setStockdata(res.data.stocks);
          setStockloadingstatus(false);
        }
      });

    }

  }, [searchText, navigate])

  //Adding to Cart
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addtocart = (event) => {
    const item = stockdata.find(stock => stock._id === event);

    const currentQuantity = quantity.find(data => data.product_id === item._id)?.product_quantity || 1;

    if (!quantity.find(data => data.product_id === item._id)) {
      setQuantity(prevQuantity => [
        ...prevQuantity,
        {
          product_id: event,
          product_quantity: 1
        }
      ])
    }

    setCartData(prevCartData => [
      ...prevCartData,
      {
        product_id: item._id,
        product_name: item.product_name,
        product_description: item.product_description,
        product_price: item.product_price,
        product_stocks: item.product_stocks,
        quantity: currentQuantity
      }
    ]);
  };

  useEffect(() => {
    const newTotalPrice = cartData.reduce((total, element) => {
      return total + (element.product_price * element.quantity);
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [cartData]);

  //Clear Cart
  const clearcart = () => {
    swal({
      title: "Are you sure?",
      text: "Press OK to clear the Bill",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          setCartData([]);
          setQuantity([]);
        }
      });
  }


  // submit Bill

  const [billLoading, setBillLoading] = useState(false);

  const processtobill = () => {
    setBillLoading(true);

    if (!billLoading) {
      Axios.post(process.env.REACT_APP_API_URL + "/billings", {
        products: cartData,
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
          setCartData([]);
          setQuantity([]);
          setBillLoading(false);
          closingmenu();
          swal("Good job!", "Your Bill ID " + res.data.bill_id, "success");
        }
      });
    }

  }


  return (
    <div className='h-[89vh] mt-[1vh] rounded bg-[white] w-[99%] flex flex-col items-center'>
      {
        modal.isopen ? (
          <>
            <div className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm" aria-labelledby="header-2a content-2a" aria-modal="true" tabIndex="-1" role="dialog">
              <div className={`flex w-[90%] h-[95vh] flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10 ${modal.closing ? 'animate-slideUp' : 'animate-slideDown'}`} role="document">
                <div className='flex justify-between'>
                  <div className='text-[20px] text-[black] font-ptserif font-bold'>Billings</div>
                  <div className='w-[30px] h-[30px] rounded bg-[#C40C0C] text-[25px] text-[white] font-ptserif font-bold flex justify-center items-center cursor-pointer' onClick={closingmenu}>
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <hr />
                <div className="w-[100%] rounded h-[65vh] flex flex-col justify-start items-center overflow-x-auto overflow-y-auto">

                  {

                    cartData.length > 0 ? (
                      <>
                        {
                          cartData.map((element, index) => (
                            <div className='w-full lg:w-[1000px] my-[20px] rounded flex flex-row items-center ' key={index}>

                              <div className='min-w-[340px] h-[180px] border-r-2 border-[white] bg-[#E0E0E0] rounded-l px-4'>
                                <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Product Name</p>
                                <p className='text-[16px] text-[black] font-ptserif font-bold my-[10px] overflow-hidden break-words'>{element.product_name}</p>
                                <p className='text-[16px] w-[280px] text-[black] font-ptserif font-bold my-[10px] overflow-hidden break-words'>Description - {element.product_description}</p>
                              </div>

                              <div className='min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4'>
                                <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Stock Status</p>
                                <p className='text-[25px] text-[black] font-ptserif font-bold mt-[40px]'>{element.product_stocks}</p>
                                <p className='text-[16px] text-[#40A578] font-ptserif font-bold'>Available</p>
                              </div>

                              <div className='min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4'>
                                <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Price</p>
                                <p className='text-[28px] text-[#40A578] font-ptserif font-bold mt-[50px]'>{element.product_price} &nbsp;<i className="fa-solid fa-indian-rupee-sign"></i></p>
                              </div>

                              <div className='min-w-[220px] h-[180px] flex flex-col items-center justify-center rounded-r bg-[#E0E0E0] px-4'>
                                <div>
                                  <label
                                    className='p-[8px] bg-[grey] text-[#fff] rounded mr-[5px] cursor-pointer'
                                    onClick={() => {
                                      setQuantity(prevQuantity => prevQuantity.map(q =>
                                        q.product_id === element.product_id
                                          ? { ...q, product_quantity: Math.max(1, Number(q.product_quantity) - 1) }
                                          : q
                                      ));

                                      setCartData(prevCartData => prevCartData.map(q =>
                                        q.product_id === element.product_id
                                          ? { ...q, quantity: Math.max(1, Number(q.quantity) - 1) }
                                          : q
                                      ));
                                    }}
                                  >
                                    <i className="fa-solid fa-minus"></i>
                                  </label>

                                  <input
                                    type='number'
                                    className='w-[70px] border border-[white] h-[40px] text-[20px] text-center rounded font-ptserif font-bold focus:border-[#1679AB] focus:outline-none'
                                    min="1"
                                    max={element.product_stocks}
                                    name={element.product_id}
                                    onInput={(event) => {

                                      setQuantity(prevQuantity => prevQuantity.map(q =>
                                        q.product_id === event.target.name ? {
                                          ...q, product_quantity: event.target.value <= 0 ? 1 : element.product_stocks >= event.target.value ? event.target.value : element.product_stocks
                                        } : q
                                      ));

                                      setCartData(prevCartData => prevCartData.map(q =>
                                        q.product_id === event.target.name ? {
                                          ...q, quantity: event.target.value <= 0 ? 1 : element.product_stocks >= event.target.value ? event.target.value : element.product_stocks
                                        } : q
                                      ));
                                    }}
                                    value={(() => {
                                      const data = quantity.find(data => data.product_id === element.product_id);
                                      return data ? data.product_quantity : 1;
                                    })()}
                                    align="end"
                                  />

                                  <label
                                    className='p-[8px] bg-[grey] text-[#fff] rounded ml-[5px] cursor-pointer'
                                    onClick={() => {
                                      setQuantity(prevQuantity => prevQuantity.map(q =>
                                        q.product_id === element.product_id
                                          ? { ...q, product_quantity: Math.min(element.product_stocks, Number(q.product_quantity) + 1) }
                                          : q
                                      ));

                                      setCartData(prevCartData => prevCartData.map(q =>
                                        q.product_id === element.product_id
                                          ? { ...q, quantity: Math.min(element.product_stocks, Number(q.quantity) + 1) }
                                          : q
                                      ));
                                    }}
                                  >
                                    <i className="fa-solid fa-plus"></i>
                                  </label>

                                </div>

                                <button className='text-[18px] font-semibold font-ptserif text-[white] px-[20px] bg-[#C40C0C] rounded mt-[20px] pt-[5px] pb-[5px] mb-[5px] flex justify-center items-center cursor-pointer'
                                  onClick={() => {
                                    setCartData(prevCartData => prevCartData.filter(item => item.product_id !== element.product_id))
                                    setQuantity(prevQuantity => prevQuantity.filter(item => item.product_id !== element.product_id))
                                  }}>
                                  Remove &nbsp;<i className="fa-solid fa-trash"></i>
                                </button>
                              </div>

                            </div>

                          ))
                        }
                      </>
                    ) : (
                      <p className="text-[black] font-ptserif font-bold text-[20px] mt-[40px]">No Product Found</p>
                    )

                  }

                </div>
                <hr />
                <div className='flex flex-col items-end'>
                  <table>
                    <tbody>
                      <tr align="start">
                        <td className='w-[150px] text-[16px] text-[black] font-ptserif'>Total Price</td>
                        <td className='w-[150px] text-[16px] text-[black] font-ptserif font-bold'>{totalPrice} Rs</td>
                      </tr>
                      <tr align="start">
                        <td className='w-[150px] text-[16px] text-[black] font-ptserif'>Total Item</td>
                        <td className='w-[150px] text-[16px] text-[black] font-ptserif font-bold'>{cartData.length}</td>
                      </tr>
                      <tr>
                        <td className='w-[300px]' colSpan="2"><button className='text-[18px] font-semibold font-ptserif text-[white] w-full bg-[#40A578] rounded mt-[5px] pt-[5px] pb-[5px] mb-[5px] flex justify-center items-center cursor-pointer disabled:bg-[#76c9a4] disabled:cursor-not-allowed' disabled={cartData.length === 0} onClick={cartData.length > 0 ? processtobill : undefined}>
                          {
                            !billLoading ? (
                              <>Order &nbsp;<i className="fa-solid fa-cart-shopping"></i></>

                            ) : (
                              <div className="flex justify-center rounded">
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
                            )
                          }
                        </button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </>
        ) : null
      }

      <div className='w-[98%] bg-[#D9D9D9] mt-[20px] rounded flex justify-around'>
        <div>
          <div className='text-[18px] font-semibold font-ptserif text-[#444444] pt-[20px] pb-[10px]'>
            Total Item &nbsp;<i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className='text-[20px] font-semibold font-ptserif text-[white] bg-[#40A578] rounded pt-[10px] pb-[10px] mb-[20px] flex justify-center items-center'>
            {cartData.length}
          </div>
        </div>

        <div>
          <div className='text-[18px] font-semibold font-ptserif text-[#444444] pt-[20px] pb-[10px]'>
            Total Price &nbsp;<i className="fa-solid fa-indian-rupee-sign"></i>
          </div>
          <div className='text-[20px] font-semibold font-ptserif text-[white] bg-[#40A578] rounded pt-[10px] pb-[10px] mb-[20px] flex justify-center items-center'>
            {
              totalPrice
            }
          </div>
        </div>

        <div>
          <div className='text-[18px] font-semibold font-ptserif text-[#444444] bg-[#FFDB5C] rounded mt-[20px] pt-[5px] pb-[5px] pr-[5px] pl-[5px] mb-[5px] flex justify-center items-center cursor-pointer' onClick={() => { setModal({ ...modal, isopen: true }) }}>
            View &nbsp;<i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className='text-[18px] font-semibold font-ptserif text-[#ffffff] bg-[#C40C0C] rounded mt-[14px] pt-[5px] pb-[5px] pr-[5px] sm:pr-[30px] sm:pl-[30px] pl-[5px] mb-[5px] flex justify-center items-center cursor-pointer' onClick={clearcart}>
            Clear &nbsp;<i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>


      <div className="relative mt-[20px] mb-[20px] w-[98%]  font-semibold font-ptserif text-[#444444]">
        <input
          id="id-s03"
          type="search"
          onInput={(event) => {
            setStockloadingstatus(true);
            setsearchText(event.target.value);
          }}
          name="searchtext"
          placeholder="Search Product"
          aria-label="Search content"
          className="peer relative h-12 w-full bg-[#f1f6f6] rounded border-[3px] border-[#D9D9D9] px-4 pr-12 text-[18px] text-[#444444] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <i className="fa-solid fa-magnifying-glass text-[22px] absolute right-4 top-3 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"></i>
      </div>

      <div className='w-[95%] lg:w-[98%] h-[63vh] mb-[2vh] flex flex-col items-center overflow-x-auto rounded overflow-y-auto'>

        {
          stockloadingstatus ? (
            <div className="flex justify-center bg-[#000000b0] p-[10px] rounded">
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
            <>
              {
                stockdata.length > 0 ? (
                  <>
                    {
                      stockdata
                        .filter(element => !cartData.find(data => data.product_id === element._id))
                        .map((element, index) => (

                          <div className='w-full lg:w-[1000px] my-[20px] rounded flex flex-row items-center ' key={index}>

                            <div className='min-w-[340px] h-[180px] border-r-2 border-[white] bg-[#E0E0E0] rounded-l px-4'>
                              <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Product Name</p>
                              <p className='text-[16px] text-[black] font-ptserif font-bold my-[10px] overflow-hidden break-words'>{element.product_name}</p>
                              <p className='text-[16px] w-[280px] text-[black] font-ptserif font-bold my-[10px] overflow-hidden break-words'>Description - {element.product_description}</p>
                            </div>

                            {
                              element.product_stocks > 0 ? (
                                <>
                                  <div className='min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4'>
                                    <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Stock Status</p>
                                    <p className='text-[25px] text-[black] font-ptserif font-bold mt-[40px]'>{element.product_stocks}</p>
                                    <p className='text-[16px] text-[#40A578] font-ptserif font-bold'>Available</p>
                                  </div>

                                  <div className='min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4'>
                                    <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Price</p>
                                    <p className='text-[28px] text-[#40A578] font-ptserif font-bold mt-[50px]'>{element.product_price} &nbsp;<i className="fa-solid fa-indian-rupee-sign"></i></p>
                                  </div>

                                  <div className='min-w-[220px] h-[180px] flex flex-col items-center justify-center rounded-r bg-[#E0E0E0] px-4'>
                                    <div>

                                      <label
                                        className='p-[8px] bg-[grey] text-[#fff] rounded mr-[5px] cursor-pointer'
                                        onClick={() => {
                                          const data = quantity.find(data => data.product_id === element._id);
                                          if (data) {
                                            setQuantity(prevQuantity => prevQuantity.map(q =>
                                              q.product_id === element._id
                                                ? { ...q, product_quantity: Math.max(1, Number(q.product_quantity) - 1) }
                                                : q
                                            ));
                                          }
                                        }}
                                      >
                                        <i className="fa-solid fa-minus"></i>
                                      </label>

                                      <input
                                        name="quantity"
                                        type='number'
                                        className='w-[60px] border border-[white] h-[40px] text-[20px] text-center rounded font-ptserif font-bold focus:border-[#1679AB] focus:outline-none'
                                        min="1"
                                        max={element.product_stocks}
                                        id={element._id}
                                        onInput={(event) => {
                                          const data = quantity.find(data => data.product_id === element._id);
                                          if (data) {
                                            setQuantity(prevQuantity => prevQuantity.map(q =>
                                              q.product_id === element._id
                                                ? { ...q, product_quantity: event.target.value <= 0 ? 1 : element.product_stocks >= event.target.value ? event.target.value : element.product_stocks }
                                                : q
                                            ));
                                          } else {
                                            setQuantity(prevQuantity => [
                                              ...prevQuantity,
                                              {
                                                product_id: element._id,
                                                product_quantity: event.target.value <= 0 ? 1 : element.product_stocks >= event.target.value ? event.target.value : element.product_stocks
                                              }
                                            ]);
                                          }
                                        }}
                                        value={(() => {
                                          const data = quantity.find(data => data.product_id === element._id);
                                          return data ? data.product_quantity : 1;
                                        })()}
                                      />

                                      <label
                                        className='p-[8px] bg-[grey] text-[#fff] rounded ml-[5px] cursor-pointer'
                                        onClick={() => {
                                          const data = quantity.find(data => data.product_id === element._id);
                                          if (data) {
                                            setQuantity(prevQuantity => prevQuantity.map(q =>
                                              q.product_id === element._id
                                                ? { ...q, product_quantity: Math.min(element.product_stocks, Number(q.product_quantity) + 1) }
                                                : q
                                            ));
                                          } else {
                                            setQuantity(prevQuantity => [
                                              ...prevQuantity,
                                              {
                                                product_id: element._id,
                                                product_quantity: 1
                                              }
                                            ]);
                                          }
                                        }}
                                      >
                                        <i className="fa-solid fa-plus"></i>
                                      </label>

                                    </div>
                                    <button className='text-[18px] font-semibold font-ptserif text-[white] px-[20px] bg-[#40A578] rounded mt-[20px] pt-[5px] pb-[5px] mb-[5px] flex justify-center items-center cursor-pointer'
                                      onClick={() => {
                                        addtocart(element._id)
                                      }}>
                                      Add &nbsp;<i className="fa-solid fa-cart-shopping"></i>
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className='min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4'>
                                    <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Stock Status</p>
                                    <p className='text-[18px] mt-[40px] text-[#C40C0C] font-ptserif font-bold'>Out of Stock</p>
                                  </div>
                                  <div className='min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4'>
                                    <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Price</p>
                                    <p className='text-[28px] text-[#40A578] font-ptserif font-bold mt-[50px]'>{element.product_price} &nbsp;<i className="fa-solid fa-indian-rupee-sign"></i></p>
                                  </div>

                                  <div className='min-w-[220px] h-[180px] flex flex-col items-center justify-center rounded-r bg-[#E0E0E0] px-4'>
                                    <input type='number' className='w-[70px] border border-[white] h-[40px] text-[20px] text-center rounded font-ptserif font-bold focus:border-[#1679AB] focus:outline-none' disabled value={(() => {
                                      const data = quantity.find(data => data.product_id === element._id);
                                      return data ? data.product_quantity : 1;
                                    })()} align="end" />
                                    <button disabled className='text-[18px] font-semibold font-ptserif text-[white] px-[20px] bg-[#40A578] rounded mt-[20px] pt-[5px] pb-[5px] mb-[5px] flex justify-center items-center cursor-pointer disabled:bg-[#75CFA7]' >
                                      Add &nbsp;<i className="fa-solid fa-cart-shopping"></i>
                                    </button>
                                  </div>
                                </>
                              )
                            }

                          </div>
                        ))
                    }
                  </>
                ) : (
                  <p className="text-[black] font-ptserif font-bold text-[20px] mt-[40px]">No Product Found</p>
                )

              }
            </>
          )
        }

      </div>

    </div>
  )
}
