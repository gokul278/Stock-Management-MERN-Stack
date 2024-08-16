import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import swal from 'sweetalert';

export const StocksContent = () => {
  const navigate = useNavigate();

  const [newstock, setNewstock] = useState({ isopen: false, closing: false });

  const [updatestock, setUpdatestock] = useState({
    isopen: false,
    closing: false,
  });

  const [newstockdata, setNewstockdata] = useState({ product_name: "", product_description: "", product_stocks: 0, product_price: 0, loadingstatus: false, errorstatus: false, errormessage: "" });

  const [stockdata, setStockdata] = useState();

  const [stockloading, setStockloading] = useState(true);

  const handleinput = (event) => {

    setNewstockdata({
      ...newstockdata,
      [event.target.name]: event.target.value,
      errorstatus: false, errormessage: ""
    })
  };


  // Add New Product
  const addproduct = () => {

    setNewstockdata({
      ...newstockdata,
      loadingstatus: true
    })

    if (newstockdata.product_name.length > 0 && newstockdata.product_description.length > 0) {

      setStockloading(true);

      Axios.post(process.env.REACT_APP_API_URL + "/stocks", {
        product_name: newstockdata.product_name,
        product_description: newstockdata.product_description,
        product_stocks: newstockdata.product_stocks,
        product_price: newstockdata.product_price
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
          setNewstock({ isopen: true, closing: true });

          setTimeout(() => {
            setNewstock({ isopen: false, closing: false });
          }, 220);

          setNewstockdata({ product_name: "", product_description: "", product_stocks: 0, product_price: 0, loadingstatus: false, errorstatus: false, errormessage: "" })
          setTimeout(() => {
            toast('Product Added!', { theme: 'dark' }, { position: 'bottom-center' })
          }, 250)
        } else if (res.data.status === "error") {
          setNewstockdata({
            ...newstockdata,
            errorstatus: true,
            errormessage: res.data.message,
            loadingstatus: false
          })
        }
      });

    } else {

      setNewstockdata({
        ...newstockdata,
        errorstatus: true,
        errormessage: "Enter Product Name and Description",
        loadingstatus: false
      })

    }

  }


  // Search Product
  const [search, setSearch] = useState({
    searchtext: "",
  });

  const searchinput = (event) => {
    setStockloading(true);
    setSearch({
      ...search,
      [event.target.name]: event.target.value
    })
  }


  // Fetch Data
  useEffect(() => {
    if (search.searchtext.length > 0) {
      Axios.post(process.env.REACT_APP_API_URL + "/stocks/search", {
        product_name: search.searchtext,
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
          setStockloading(false);
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
          setStockloading(false);
        }
      });
    }
  },[navigate, search.searchtext]);


  // Remove Stock
  const removeStock = (event) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Stock Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          setStockloading(true);
          Axios.delete(process.env.REACT_APP_API_URL + "/stocks", {
            data: {
              product_id: event.target.name,
            },
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
              setStockloading(false);
              toast(res.data.message, { theme: 'dark' }, { position: 'bottom-center' })
            }
          });
        }
      });

  }


  //Edit Stock
  const [editstock, setEditStock] = useState({
    product_id: "",
    product_name: "",
    product_description: "",
    product_stocks: "",
    product_price: "",
    loadingstatus: false,
    errorstatus: false,
    errormessage: ""
  })

  const handleupdatestockinput = (event) => {
    setEditStock({
      ...editstock,
      errorstatus: false,
      errormessage: ""
    })

    setEditStock({
      ...editstock,
      [event.target.name]: event.target.value
    })
  }

  const updateStock = () => {
    if (!editstock.loadingstatus) {
      setEditStock({
        ...editstock,
        loadingstatus: true
      })

      Axios.patch(process.env.REACT_APP_API_URL + "/stocks", {
        product_id: editstock.product_id,
        product_name: editstock.product_name,
        product_description: editstock.product_description,
        product_stocks: editstock.product_stocks,
        product_price: editstock.product_price
      }, {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
          "Content-Type": "application/json",
        }
      }

      ).then((res) => {
        if (res.data.message === "tokenformateinvalid") {
          navigate("/unauthorized");
        } else if (res.data.message === "timeexpired") {
          navigate("/timeexpire");
        } else if (res.data.status === "success") {
          setEditStock({
            ...editstock,
            loadingstatus: false
          })

          setUpdatestock({ isopen: true, closing: true });

          setTimeout(() => {
            setUpdatestock({ isopen: false, closing: false });
          }, 220);

          setTimeout(() => {
            toast('Product Updated!', { theme: 'dark' }, { position: 'bottom-center' })
          }, 250)
        } else if (res.data.status === "error") {
          setStockloading(false);
          setEditStock({
            ...editstock,
            errorstatus: true,
            errormessage: res.data.message
          })

        }

      });

    }
  }

  return (
    <div className="h-[89vh] mt-[1vh] rounded bg-[white] w-[99%] flex flex-col items-center">
      {newstock.isopen ? (
        <>
          <div
            className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
            aria-labelledby="header-2a content-2a"
            aria-modal="true"
            tabIndex="-1"
            role="dialog"
          >
            <div
              className={`flex w-[90%] md:w-[40%] h-[95vh] flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10 ${newstock.closing ? "animate-slideUp" : "animate-slideDown"
                }`}
              role="document"
            >
              <div className="flex justify-between">
                <div className="text-[20px] text-[black] font-ptserif font-bold">
                  Add Stock
                </div>
                <div
                  className="w-[30px] h-[30px] rounded bg-[#C40C0C] text-[25px] text-[white] font-ptserif font-bold flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setNewstock({ isopen: true, closing: true });

                    setTimeout(() => {
                      setNewstock({ isopen: false, closing: false });
                    }, 220);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
              <hr />
              <div className="h-[71vh] flex flex-col justify-around">
                <div className="w-[100">
                  <label
                    className="text-[16px] font-ptserif font-semibold text-[#444444]"
                    htmlFor="useremail"
                  >
                    &nbsp;Product Name
                  </label>
                  <input
                    type="text"
                    name="product_name"
                    onInput={handleinput}
                    value={newstockdata.product_name}
                    placeholder="Enter Product Name"
                    className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div className="w-[100%]">
                  <label
                    className="text-[16px] font-ptserif font-semibold text-[#444444]"
                    htmlFor="useremail"
                  >
                    &nbsp;Product Description
                  </label>
                  <textarea
                    rows="5"
                    type="textarea"
                    name="product_description"
                    onInput={handleinput}
                    value={newstockdata.product_description}
                    placeholder="Enter Product Description"
                    className="peer mt-[5px] w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] pt-[10px] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  ></textarea>
                </div>
                <div className="w-[100%]">
                  <label
                    className="text-[16px] font-ptserif font-semibold text-[#444444]"
                    htmlFor="useremail"
                  >
                    &nbsp;Stock
                  </label>
                  <input
                    name="product_stocks"
                    onInput={handleinput}
                    value={newstockdata.product_stocks}
                    type="number"
                    className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div className="w-[100%]">
                  <label
                    className="text-[16px] font-ptserif font-semibold text-[#444444]"
                    htmlFor="useremail"
                  >
                    &nbsp;Price
                  </label>
                  <input
                    name="product_price"
                    onInput={handleinput}
                    value={newstockdata.product_price}
                    type="number"
                    className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB]  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
              </div>
              {
                newstockdata.errorstatus ? (
                  <div className="bg-[red] py-[5px] rounded font-ptserif text-[18px] text-[#fff]" align="center">
                    {newstockdata.errormessage}
                  </div>
                ) : null
              }
              <hr />
              <div>
                <button className="bg-[#40A578] text-[18px] text-[white] font-ptserif rounded w-[100%] px-[50px] py-[15px] font-semibold" onClick={addproduct}>
                  {
                    newstockdata.loadingstatus ? (
                      <div className="flex justify-center">
                        <span>Loading </span> &nbsp;&nbsp;&nbsp;
                        <div className="btnloader">
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
                        </div>
                      </div>
                    ) : (
                      <>Add Product &nbsp;<i className="fa-solid fa-cart-shopping"></i></>
                    )
                  }
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {updatestock.isopen ? (
        <>
          <div
            className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
            aria-labelledby="header-2a content-2a"
            aria-modal="true"
            tabIndex="-1"
            role="dialog"
          >
            <div
              className={`flex w-[90%] md:w-[40%] h-[95vh] flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10 ${updatestock.closing ? "animate-slideUp" : "animate-slideDown"
                }`}
              role="document"
            >
              <div className="flex justify-between">
                <div className="text-[20px] text-[black] font-ptserif font-bold">
                  Update Stock
                </div>
                <div
                  className="w-[30px] h-[30px] rounded bg-[#C40C0C] text-[25px] text-[white] font-ptserif font-bold flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setUpdatestock({ isopen: true, closing: true });

                    setTimeout(() => {
                      setUpdatestock({ isopen: false, closing: false });
                    }, 220);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
              <hr />
              <div className="h-[71vh] flex flex-col justify-around">
                <div className="w-[100">
                  <label
                    className="text-[16px] font-ptserif font-semibold text-[#444444]"
                    htmlFor="useremail"
                  >
                    &nbsp;Product Name
                  </label>
                  <input
                    value={editstock.product_name}
                    name="product_name"
                    onInput={handleupdatestockinput}
                    type="text"
                    placeholder="Enter Product Name"
                    className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div className="w-[100%]">
                  <label
                    className="text-[16px] font-ptserif font-semibold text-[#444444]"
                    htmlFor="useremail"
                  >
                    &nbsp;Product Description
                  </label>
                  <textarea
                    rows="5"
                    type="textarea"
                    value={editstock.product_description}
                    name="product_description"
                    onInput={handleupdatestockinput}
                    placeholder="Enter Product Description"
                    className="peer mt-[5px] w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] pt-[10px] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  ></textarea>
                </div>
                <div className="w-[100%]">
                  <label
                    className="text-[16px] font-ptserif font-semibold text-[#444444]"
                    htmlFor="useremail"
                  >
                    &nbsp;Stock
                  </label>
                  <input
                    type="number"
                    value={editstock.product_stocks}
                    name="product_stocks"
                    onInput={handleupdatestockinput}
                    className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div className="w-[100%]">
                  <label
                    className="text-[16px] font-ptserif font-semibold text-[#444444]"
                    htmlFor="useremail"
                  >
                    &nbsp;Price
                  </label>
                  <input
                    value={editstock.product_price}
                    name="product_price"
                    onInput={handleupdatestockinput}
                    type="number"
                    className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB]  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
              </div>
              {
                editstock.errorstatus ? (
                  <div className="bg-[red] py-[5px] rounded font-ptserif text-[18px] text-[#fff]" align="center">
                    {editstock.errormessage}
                  </div>
                ) : null
              }
              <hr />
              <div>
                <button className="bg-[#40A578] text-[18px] text-[white] font-ptserif rounded w-[100%] px-[50px] py-[15px] font-semibold" onClick={updateStock}>
                  {
                    editstock.loadingstatus ? (
                      <div className="flex justify-center">
                        <span>Loading </span> &nbsp;&nbsp;&nbsp;
                        <div className="btnloader">
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
                        </div>
                      </div>
                    ) : (
                      <>Update Product &nbsp;<i className="fa-solid fa-cart-shopping"></i></>
                    )
                  }
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="w-[98%] mt-[20px]" align="start">
        <button
          className="bg-[#40A578] text-[18px] text-[white] font-ptserif rounded px-[50px] py-[15px] font-bold"
          onClick={() => {
            setNewstock({ ...newstock, isopen: true });
          }}
        >
          Add Product &nbsp;<i className="fa-solid fa-folder-plus"></i>
        </button>
      </div>

      <div className="relative mt-[20px] mb-[20px] w-[98%]  font-semibold font-ptserif text-[#444444]">
        <input
          onInput={searchinput}
          id="id-s03"
          type="search"
          name="searchtext"
          placeholder="Search Product"
          aria-label="Search content"
          className="peer relative h-12 w-full bg-[#f1f6f6] rounded border-[#D9D9D9] px-4 pr-12 text-[18px] text-[#444444] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <i className="fa-solid fa-magnifying-glass text-[22px] absolute right-4 top-3 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"></i>
      </div>

      {
        stockloading ? (
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
          <div className="w-[95%] lg:w-[98%] h-[63vh] mb-[2vh] flex flex-col items-center overflow-x-auto rounded overflow-y-auto">
            {
              stockdata && stockdata.length > 0 ? (
                stockdata.map((stock, index) => (
                  <div className="w-full lg:w-[1000px] my-[20px] rounded flex flex-row items-center " key={index}>
                    <div className="min-w-[340px] h-[180px] border-r-2 border-[white] bg-[#E0E0E0] rounded-l px-4">
                      <p className="text-[18px] text-[black] font-ptserif font-bold my-[10px] underline">
                        Product Name
                      </p>
                      <p className="text-[16px] text-[black] font-ptserif font-bold my-[10px] overflow-hidden break-words">
                        {stock.product_name}
                      </p>
                      <p className="text-[16px] w-[280px] text-[black] font-ptserif font-bold my-[10px] overflow-hidden break-words">
                        Description - {stock.product_description}
                      </p>
                    </div>

                    {stock.product_stocks > 0 ? (

                      <div className="min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4">
                        <p className="text-[18px] text-[black] font-ptserif font-bold my-[10px] underline">
                          Stock Status
                        </p>
                        <p className="text-[25px] text-[black] font-ptserif font-bold mt-[40px]">
                          {stock.product_stocks}
                        </p>
                        <p className="text-[16px] text-[#40A578] font-ptserif font-bold">
                          Available
                        </p>
                      </div>
                    ) : (
                      <div className="min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4">
                        <p className="text-[18px] text-[black] font-ptserif font-bold my-[10px] underline">
                          Stock Status
                        </p>
                        <p className="text-[18px] mt-[40px] text-[#C40C0C] font-ptserif font-bold">
                          Out of Stock
                        </p>
                      </div>
                    )}


                    <div className="min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4">
                      <p className="text-[18px] text-[black] font-ptserif font-bold my-[10px] underline">
                        Price
                      </p>
                      <p className="text-[28px] text-[#40A578] font-ptserif font-bold mt-[50px]">
                        {stock.product_price} &nbsp;<i className="fa-solid fa-indian-rupee-sign"></i>
                      </p>
                    </div>

                    <div className="min-w-[220px] h-[180px] flex flex-col items-center justify-center rounded-r bg-[#E0E0E0] px-4">
                      <button
                        className="text-[18px] font-semibold font-ptserif text-[black] px-[20px] bg-[#FFDB5C] rounded pt-[10px] pb-[10px] flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          setUpdatestock({ ...updatestock, isopen: true });
                          setEditStock({ product_id: stock._id, product_name: stock.product_name, product_description: stock.product_description, product_stocks: stock.product_stocks, product_price: stock.product_price })
                        }}
                      >
                        Edit &nbsp;<i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button className="text-[18px] font-semibold font-ptserif text-[white] px-[20px] bg-[#C40C0C] rounded mt-[20px] pt-[10px] pb-[10px] flex justify-center items-center cursor-pointer" name={stock._id} onClick={removeStock}>
                        Remove &nbsp;<i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[black] font-ptserif font-bold text-[20px] mt-[40px]">No Product Found</p>
              )
            }


          </div>
        )
      }

    </div>
  );
};
