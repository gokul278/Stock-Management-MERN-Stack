import React from 'react'

export const BillHistoryContent = () => {
  return (
    <div className='h-[89vh] mt-[1vh] rounded bg-[white] w-[99%]'>
      <div className='mt-[40px] flex justify-around'>
        <div className='w-[160px]' align="center">
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
        <div className='w-[160px]' align="center">
          <div className='text-[20px] mb-[10px] text-[#444444] font-bold font-ptserif'>
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
      <div className='h-[68vh] mt-[3vh] w-[100%] flex flex-col items-center overflow-x-auto overflow-y-auto'>
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
              <tr>
                <td rowSpan="4">2024/06/23<br />20:05:00</td>
                <td rowSpan="4">1002</td>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td colSpan="3">Total Bill Amount</td>
                <td>3000</td>
              </tr>
              <tr>
                <td rowSpan="4">2024/06/23<br />20:05:00</td>
                <td rowSpan="4">1002</td>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td colSpan="3">Total Bill Amount</td>
                <td>3000</td>
              </tr>
              <tr>
                <td rowSpan="4">2024/06/23<br />20:05:00</td>
                <td rowSpan="4">1002</td>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td colSpan="3">Total Bill Amount</td>
                <td>3000</td>
              </tr>
              <tr>
                <td rowSpan="4">2024/06/23<br />20:05:00</td>
                <td rowSpan="4">1002</td>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td colSpan="3">Total Bill Amount</td>
                <td>3000</td>
              </tr>
              <tr>
                <td rowSpan="4">2024/06/23<br />20:05:00</td>
                <td rowSpan="4">1002</td>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td colSpan="3">Total Bill Amount</td>
                <td>3000</td>
              </tr>
              <tr>
                <td rowSpan="4">2024/06/23<br />20:05:00</td>
                <td rowSpan="4">1002</td>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>ABCDEFG</td>
                <td>2</td>
                <td>5</td>
                <td>10</td>
              </tr>
              <tr>
                <td colSpan="3">Total Bill Amount</td>
                <td>3000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
