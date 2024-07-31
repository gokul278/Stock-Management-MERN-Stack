import React, { useState } from 'react'

export const BillingsContent = () => {

  const [modal, setModal] = useState({ isopen: false, closing: false });

  const closingmenu = () => {
    setModal({ isopen: true, closing: true });

    setTimeout(() => {
      setModal({ isopen: false, closing: false });
    }, 220);
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
                      <input type='number' className='w-[70px] border border-[white] h-[40px] text-[20px] text-[black] text-center rounded font-ptserif font-bold focus:border-[#1679AB] focus:outline-none' align="end" />
                      <button className='text-[18px] font-semibold font-ptserif text-[white] px-[20px] bg-[#C40C0C] rounded mt-[20px] pt-[5px] pb-[5px] mb-[5px] flex justify-center items-center cursor-pointer'>
                        Remove &nbsp;<i class="fa-solid fa-trash"></i>
                      </button>
                    </div>

                  </div>

                </div>
                <hr />
                <div className='flex flex-col items-end'>
                  <table>
                    <tr align="start">
                      <td className='w-[150px] text-[16px] text-[black] font-ptserif'>Total Price</td>
                      <td className='w-[150px] text-[16px] text-[black] font-ptserif font-bold'>10,000 Rs</td>
                    </tr>
                    <tr align="start">
                      <td className='w-[150px] text-[16px] text-[black] font-ptserif'>Total Item</td>
                      <td className='w-[150px] text-[16px] text-[black] font-ptserif font-bold'>500</td>
                    </tr>
                    <tr>
                      <td className='w-[300px]' colSpan="2"><button className='text-[18px] font-semibold font-ptserif text-[white] w-full bg-[#40A578] rounded mt-[5px] pt-[5px] pb-[5px] mb-[5px] flex justify-center items-center cursor-pointer'>
                        Order &nbsp;<i class="fa-solid fa-cart-shopping"></i>
                      </button></td>
                    </tr>
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
            Total Item &nbsp;<i class="fa-solid fa-cart-shopping"></i>
          </div>
          <div className='text-[20px] font-semibold font-ptserif text-[white] bg-[#40A578] rounded pt-[10px] pb-[10px] mb-[20px] flex justify-center items-center'>
            5
          </div>
        </div>

        <div>
          <div className='text-[18px] font-semibold font-ptserif text-[#444444] pt-[20px] pb-[10px]'>
            Total Price &nbsp;<i class="fa-solid fa-indian-rupee-sign"></i>
          </div>
          <div className='text-[20px] font-semibold font-ptserif text-[white] bg-[#40A578] rounded pt-[10px] pb-[10px] mb-[20px] flex justify-center items-center'>
            1,00,000
          </div>
        </div>

        <div>
          <div className='text-[18px] font-semibold font-ptserif text-[#444444] bg-[#FFDB5C] rounded mt-[20px] pt-[5px] pb-[5px] pr-[5px] pl-[5px] mb-[5px] flex justify-center items-center cursor-pointer' onClick={() => { setModal({ ...modal, isopen: true }) }}>
            View &nbsp;<i class="fa-solid fa-cart-shopping"></i>
          </div>
          <div className='text-[18px] font-semibold font-ptserif text-[#ffffff] bg-[#C40C0C] rounded mt-[14px] pt-[5px] pb-[5px] pr-[5px] sm:pr-[30px] sm:pl-[30px] pl-[5px] mb-[5px] flex justify-center items-center cursor-pointer'>
            Clear &nbsp;<i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>


      <div className="relative mt-[20px] mb-[20px] w-[98%]  font-semibold font-ptserif text-[#444444]">
        <input
          id="id-s03"
          type="search"
          name="id-s03"
          placeholder="Search Product"
          aria-label="Search content"
          className="peer relative h-12 w-full bg-[#f1f6f6] rounded border-[3px] border-[#D9D9D9] px-4 pr-12 text-[18px] text-[#444444] outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#1679AB] focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
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
            <input type='number' className='w-[70px] border border-[white] h-[40px] text-[20px] text-center rounded font-ptserif font-bold focus:border-[#1679AB] focus:outline-none' align="end" />
            <button className='text-[18px] font-semibold font-ptserif text-[white] px-[20px] bg-[#40A578] rounded mt-[20px] pt-[5px] pb-[5px] mb-[5px] flex justify-center items-center cursor-pointer'>
              Add &nbsp;<i class="fa-solid fa-cart-shopping"></i>
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
            <input type='number' className='w-[70px] border border-[white] h-[40px] text-[20px] text-center rounded font-ptserif font-bold focus:border-[#1679AB] focus:outline-none' disabled align="end" />
            <button disabled className='text-[18px] font-semibold font-ptserif text-[white] px-[20px] bg-[#40A578] rounded mt-[20px] pt-[5px] pb-[5px] mb-[5px] flex justify-center items-center cursor-pointer disabled:bg-[#75CFA7]'>
              Add &nbsp;<i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>

        </div>

      </div>



    </div>
  )
}
