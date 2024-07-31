import React, { useState } from 'react'

export const StocksContent = () => {

  const [newstock, setNewstock] = useState({ isopen: false, closing: false });

  const [updatestock, setUpdatestock] = useState({ isopen: false, closing: false });

  return (
    <div className='h-[89vh] mt-[1vh] rounded bg-[white] w-[99%] flex flex-col items-center'>

      {
        newstock.isopen ? (
          <>
            <div className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm" aria-labelledby="header-2a content-2a" aria-modal="true" tabIndex="-1" role="dialog">
              <div className={`flex w-[90%] md:w-[40%] h-[95vh] flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10 ${newstock.closing ? 'animate-slideUp' : 'animate-slideDown'}`} role="document">
                <div className='flex justify-between'>
                  <div className='text-[20px] text-[black] font-ptserif font-bold'>Add Stock</div>
                  <div className='w-[30px] h-[30px] rounded bg-[#C40C0C] text-[25px] text-[white] font-ptserif font-bold flex justify-center items-center cursor-pointer' onClick={() => {
                    setNewstock({ isopen: true, closing: true });

                    setTimeout(() => {
                      setNewstock({ isopen: false, closing: false });
                    }, 220);
                  }}>
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <hr />
                <div className='h-[71vh] flex flex-col justify-around'>
                  <div className='w-[100'>
                    <label className='text-[16px] font-ptserif font-semibold text-[#444444]' htmlFor='useremail'>&nbsp;Product Name</label>
                    <input
                      type="text"
                      placeholder="Enter Product Name"
                      className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                  <div className='w-[100%]'>
                    <label className='text-[16px] font-ptserif font-semibold text-[#444444]' htmlFor='useremail'>&nbsp;Product Description</label>
                    <textarea
                      rows="5"
                      type="textarea"
                      placeholder="Enter Product Description"
                      className="peer mt-[5px] w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] pt-[10px] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    ></textarea>
                  </div>
                  <div className='w-[100%]'>
                    <label className='text-[16px] font-ptserif font-semibold text-[#444444]' htmlFor='useremail'>&nbsp;Stock</label>
                    <input
                      type="number"
                      className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                  <div className='w-[100%]'>
                    <label className='text-[16px] font-ptserif font-semibold text-[#444444]' htmlFor='useremail'>&nbsp;Price</label>
                    <input
                      type="number"
                      className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB]  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                </div>
                <hr />
                <div>
                  <button className='bg-[#40A578] text-[18px] text-[white] font-ptserif rounded w-[100%] px-[50px] py-[15px] font-semibold'>Add Product &nbsp;<i class="fa-solid fa-cart-shopping"></i></button>
                </div>
              </div>
            </div>
          </>
        ) : null
      }

      {
        updatestock.isopen ? (
          <>
            <div className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm" aria-labelledby="header-2a content-2a" aria-modal="true" tabIndex="-1" role="dialog">
              <div className={`flex w-[90%] md:w-[40%] h-[95vh] flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10 ${updatestock.closing ? 'animate-slideUp' : 'animate-slideDown'}`} role="document">
                <div className='flex justify-between'>
                  <div className='text-[20px] text-[black] font-ptserif font-bold'>Update Stock</div>
                  <div className='w-[30px] h-[30px] rounded bg-[#C40C0C] text-[25px] text-[white] font-ptserif font-bold flex justify-center items-center cursor-pointer' onClick={() => {
                    setUpdatestock({ isopen: true, closing: true });

                    setTimeout(() => {
                      setUpdatestock({ isopen: false, closing: false });
                    }, 220);
                  }}>
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <hr />
                <div className='h-[71vh] flex flex-col justify-around'>
                  <div className='w-[100'>
                    <label className='text-[16px] font-ptserif font-semibold text-[#444444]' htmlFor='useremail'>&nbsp;Product Name</label>
                    <input
                      type="text"
                      placeholder="Enter Product Name"
                      className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                  <div className='w-[100%]'>
                    <label className='text-[16px] font-ptserif font-semibold text-[#444444]' htmlFor='useremail'>&nbsp;Product Description</label>
                    <textarea
                      rows="5"
                      type="textarea"
                      placeholder="Enter Product Description"
                      className="peer mt-[5px] w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] pt-[10px] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    ></textarea>
                  </div>
                  <div className='w-[100%]'>
                    <label className='text-[16px] font-ptserif font-semibold text-[#444444]' htmlFor='useremail'>&nbsp;Stock</label>
                    <input
                      type="number"
                      className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                  <div className='w-[100%]'>
                    <label className='text-[16px] font-ptserif font-semibold text-[#444444]' htmlFor='useremail'>&nbsp;Price</label>
                    <input
                      type="number"
                      className="peer mt-[2px] relative h-12 w-full font-ptserif font-semibold rounded border-[2px] border-[#444444] bg-[white] px-3 text-[16px] text-[#444444] hover:shadow-md hover:shadow-[#1679AB]  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                </div>
                <hr />
                <div>
                  <button className='bg-[#40A578] text-[18px] text-[white] font-ptserif rounded w-[100%] px-[50px] py-[15px] font-semibold'>Update Product &nbsp;<i class="fa-solid fa-cart-shopping"></i></button>
                </div>
              </div>
            </div>
          </>
        ) : null
      }

      <div className='w-[98%] mt-[20px]' align="start">
        <button className='bg-[#40A578] text-[18px] text-[white] font-ptserif rounded px-[50px] py-[15px] font-bold' onClick={() => { setNewstock({ ...newstock, isopen: true }) }}>Add Product &nbsp;<i class="fa-solid fa-folder-plus"></i></button>
      </div>

      <div className="relative mt-[20px] mb-[20px] w-[98%]  font-semibold font-ptserif text-[#444444]">
        <input
          id="id-s03"
          type="search"
          name="id-s03"
          placeholder="Search Product"
          aria-label="Search content"
          className="peer relative h-12 w-full bg-[#f1f6f6] rounded border-[#D9D9D9] px-4 pr-12 text-[18px] text-[#444444] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <i class="fa-solid fa-magnifying-glass text-[22px] absolute right-4 top-3 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"></i>
      </div>

      <div className='w-[95%] lg:w-[98%] h-[63vh] mb-[2vh] flex flex-col items-center overflow-x-auto rounded overflow-y-auto'>

        <div className='w-full lg:w-[1000px] my-[20px] rounded flex flex-row items-center '>

          <div className='min-w-[340px] h-[180px] border-r-2 border-[white] bg-[#E0E0E0] rounded-l px-4'>
            <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Product Name</p>
            <p className='text-[16px] text-[black] font-ptserif font-bold my-[10px] overflow-hidden break-words'>ABCDEFGH</p>
            <p className='text-[16px] w-[280px] text-[black] font-ptserif font-bold my-[10px] overflow-hidden break-words'>Description - dfjsdfjbsdjfksdssfsdfsdfxsdsfbhjhsdfbjhsdf</p>
          </div>

          <div className='min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4'>
            <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Stock Status</p>
            <p className='text-[25px] text-[black] font-ptserif font-bold mt-[40px]'>5</p>
            <p className='text-[16px] text-[#40A578] font-ptserif font-bold'>Available</p>
          </div>

          <div className='min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4'>
            <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Price</p>
            <p className='text-[28px] text-[#40A578] font-ptserif font-bold mt-[50px]'>50 &nbsp;<i class="fa-solid fa-indian-rupee-sign"></i></p>
          </div>

          <div className='min-w-[220px] h-[180px] flex flex-col items-center justify-center rounded-r bg-[#E0E0E0] px-4'>
            <button className='text-[18px] font-semibold font-ptserif text-[black] px-[20px] bg-[#FFDB5C] rounded pt-[10px] pb-[10px] flex justify-center items-center cursor-pointer' onClick={() => { setUpdatestock({ ...updatestock, isopen: true }) }}>
              Edit &nbsp;<i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button className='text-[18px] font-semibold font-ptserif text-[white] px-[20px] bg-[#C40C0C] rounded mt-[20px] pt-[10px] pb-[10px] flex justify-center items-center cursor-pointer'>
              Remove &nbsp;<i class="fa-solid fa-trash"></i>
            </button>
          </div>

        </div>


        <div className='w-full lg:w-[1000px] my-[20px] rounded flex flex-row items-center '>

          <div className='min-w-[340px] h-[180px] border-r-2 border-[white] bg-[#E0E0E0] rounded-l px-4'>
            <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Product Name</p>
            <p className='text-[16px] text-[black] font-ptserif font-bold my-[10px] overflow-hidden break-words'>ABCDEFGH</p>
            <p className='text-[16px] w-[280px] text-[black] font-ptserif font-bold my-[10px] overflow-hidden break-words'>Description - dfjsdfjbsdjfksdssfsdfsdfxsdsfbhjhsdfbjhsdf</p>
          </div>

          <div className='min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4'>
            <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Stock Status</p>
            <p className='text-[18px] mt-[40px] text-[#C40C0C] font-ptserif font-bold'>Out of Stock</p>
          </div>

          <div className='min-w-[220px] h-[180px] border-r-2 border-[white] flex flex-col items-center bg-[#E0E0E0] px-4'>
            <p className='text-[18px] text-[black] font-ptserif font-bold my-[10px] underline'>Price</p>
            <p className='text-[28px] text-[#40A578] font-ptserif font-bold mt-[50px]'>50 &nbsp;<i class="fa-solid fa-indian-rupee-sign"></i></p>
          </div>

          <div className='min-w-[220px] h-[180px] flex flex-col items-center justify-center rounded-r bg-[#E0E0E0] px-4'>
            <button className='text-[18px] font-semibold font-ptserif text-[black] px-[20px] bg-[#FFDB5C] rounded pt-[10px] pb-[10px] flex justify-center items-center cursor-pointer' onClick={() => { setUpdatestock({ ...updatestock, isopen: true }) }}>
              Edit &nbsp;<i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button className='text-[18px] font-semibold font-ptserif text-[white] px-[20px] bg-[#C40C0C] rounded mt-[20px] pt-[10px] pb-[10px] flex justify-center items-center cursor-pointer'>
              Remove &nbsp;<i class="fa-solid fa-trash"></i>
            </button>
          </div>

        </div>

      </div>


    </div>
  )
}
