import React, { useEffect, useState } from 'react'
import { Document, Page, Text, View, PDFViewer, Image, pdf } from '@react-pdf/renderer';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from "../Assets/Images/Cragx Text-Logo - Light.png"

export const GenerateBillContent = () => {

  const navigate = useNavigate();

  const [billingsData, setBillingsdata] = useState([]);

  const [date, setDate] = useState({
    fromDate: "",
    toDate: ""
  })

  const [sales, setSales] = useState({
    totalsalesprice: 0,
    totalsalesstock: 0
  })

  const handleDateInput = (event) => {
    setDate({
      ...date,
      [event.target.name]: event.target.value
    })
  }


  useEffect(() => {

    if (date.fromDate.length > 0 && date.toDate.length > 0) {
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
          setSales({
            totalsalesprice: res.data.totalsalesamount,
            totalsalesstock: res.data.totalsalesstock
          })
        }
      })
    }else{
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
          setSales({
            totalsalesprice: res.data.totalsalesamount,
            totalsalesstock: res.data.totalsalesstock
          })
        }
      });
    }

  })



  // Function to handle the PDF download
  const handleDownloadPDF = async () => {
    // Create a new document
    const doc = (
      <Document>
        <Page size="A4">
          <View style={{ margin: 20, padding: 10, paddingBottom: 10 }}>
            <View><Image src={Logo} style={{ width: 150, height: 'auto' }} /></View>
            <View style={{ padding: 5, fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: 5 }}>
              <View style={{ width: "50%" }}>
                <Text style={{ marginBottom: 5 }}>Total Sales Price  : {sales.totalsalesprice} Rs</Text><Text>Total Sales Stock : {sales.totalsalesstock}</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={{ marginBottom: 5 }}>From Date : {date.fromDate}</Text><Text>To Date     : {date.toDate}</Text>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', width: '100%', backgroundColor: "#1679AB" }}>
              <Text style={{ width: "18%", textAlign: 'center', borderWidth: 1.5, padding: 10 }}>Date & Time</Text>
              <Text style={{ width: "12%", textAlign: 'center', borderWidth: 1.5, padding: 10, borderLeftColor: "#1679AB" }}>Bill ID</Text>
              <Text style={{ width: "25%", textAlign: 'center', borderWidth: 1.5, padding: 10, borderLeftColor: "#1679AB" }}>Product Name</Text>
              <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 10, borderLeftColor: "#1679AB" }}>Quantity</Text>
              <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 10, borderLeftColor: "#1679AB" }}>Price</Text>
              <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 10, borderLeftColor: "#1679AB" }}>Total Price</Text>
            </View>
            {
              billingsData.map((element) => {

                let parsedDate = new Date(element.createdAt);
                let day = String(parsedDate.getDate()).padStart(2, '0');
                let month = String(parsedDate.getMonth() + 1).padStart(2, '0');
                let year = parsedDate.getFullYear();
                let hours = String(parsedDate.getHours()).padStart(2, '0');
                let minutes = String(parsedDate.getMinutes()).padStart(2, '0');
                let formattedDate = `${day}-${month}-${year}`;
                let formattedtime = `${hours}:${minutes}`

                return element.products.map((product, index) => (
                  <>
                    {
                      index === 0 ? (
                        <>
                          <View style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', width: '100%', backgroundColor: "#fff" }}>
                            <Text style={{ width: "18%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderBottomColor: "#cde8f6", backgroundColor: "#cde8f6" }}>{formattedDate} {formattedtime}</Text>
                            <Text style={{ width: "12%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#cde8f6", borderTopColor: "#cde8f6", borderBottomColor: "#cde8f6", backgroundColor: "#cde8f6" }}>{element.bill_id}</Text>
                            <Text style={{ width: "25%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.product_name}</Text>
                            <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.quantity}</Text>
                            <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.product_price}</Text>
                            <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.quantity * product.product_price}</Text>
                          </View>
                          {
                            index === element.products.length - 1 ? (
                              <>
                                <View style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', width: '100%', backgroundColor: "#cde8f6" }}>
                                  <Text style={{ width: "18%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                                  <Text style={{ width: "12%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                                  <Text style={{ width: "55%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}>Total Bill Amount</Text>
                                  <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}>{element.total_billvalue}</Text>
                                </View>
                              </>
                            ) : null
                          }
                        </>
                      ) : (
                        <>
                          <View style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', width: '100%', backgroundColor: "#fff" }}>
                            <Text style={{ width: "18%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderBottomColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                            <Text style={{ width: "12%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#cde8f6", borderTopColor: "#cde8f6", borderBottomColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                            <Text style={{ width: "25%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.product_name}</Text>
                            <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.quantity}</Text>
                            <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.product_price}</Text>
                            <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.quantity * product.product_price}</Text>
                          </View>
                          {
                            index === element.products.length - 1 ? (
                              <>
                                <View style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', width: '100%', backgroundColor: "#cde8f6" }}>
                                  <Text style={{ width: "18%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                                  <Text style={{ width: "12%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                                  <Text style={{ width: "55%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}>Total Bill Amount</Text>
                                  <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}>{element.total_billvalue}</Text>
                                </View>
                              </>
                            ) : null
                          }
                        </>
                      )
                    }
                  </>
                ))
              })
            }
          </View>
        </Page>
      </Document>
    );

    // Generate PDF as Blob
    const pdfBlob = await pdf(doc).toBlob();

    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = 'billing_report.pdf';
    link.click();

    // Clean up the link element
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className='h-[88vh] mt-[1vh] rounded bg-[white] w-[99%]' align="center">
      <div className='mt-[40px] flex flex-col items-center sm:flex-row sm:justify-around'>
        <div className='w-[180px]' align="center">
          <div className='text-[20px] mb-[10px] text-[#444444] font-bold font-ptserif'>
            From Date
          </div>
          <div>
            <input
              type="date"
              name='fromDate'
              onInput={handleDateInput}
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
              name='toDate'
              onInput={handleDateInput}
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-[18px] text-[#444444] bg-[#E0E0E0] font-semibold font-ptserif placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#1679AB] focus:border-2 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div align="center">
        <button className='text-[20px] mt-[30px] font-semibold font-ptserif text-[white] bg-[#40A578] rounded pt-[10px] pb-[10px] px-[50px] mb-[20px] flex justify-center items-center cursor:pointer disabled:bg-[#9ce4c4] disabled:cursor-not-allowed' disabled={date.fromDate.length === 0 || date.toDate.length === 0} onClick={handleDownloadPDF}>
          <i class="fa-solid fa-download"></i> &nbsp;Download PDF
        </button>
      </div>

      {
        date.fromDate.length > 0 && date.toDate.length > 0 ? (
          <PDFViewer style={{ width: "95%", height: "59vh" }} showToolbar={false}>
            <Document>
              <Page size="A4">
                <View style={{ margin: 20, padding: 10, paddingBottom: 10 }}>
                  <View><Image src={Logo} style={{ width: 150, height: 'auto' }} /></View>
                  <View style={{ padding: 5, fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: 5 }}>
                    <View style={{ width: "50%" }}>
                      <Text style={{ marginBottom: 5 }}>Total Sales Price  : {sales.totalsalesprice} Rs</Text><Text>Total Sales Stock : {sales.totalsalesstock}</Text>
                    </View>
                    <View style={{ width: "50%" }}>
                      <Text style={{ marginBottom: 5 }}>From Date : {date.fromDate}</Text><Text>To Date     : {date.toDate}</Text>
                    </View>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', width: '100%', backgroundColor: "#1679AB" }}>
                    <Text style={{ width: "18%", textAlign: 'center', borderWidth: 1.5, padding: 10 }}>Date & Time</Text>
                    <Text style={{ width: "12%", textAlign: 'center', borderWidth: 1.5, padding: 10, borderLeftColor: "#1679AB" }}>Bill ID</Text>
                    <Text style={{ width: "25%", textAlign: 'center', borderWidth: 1.5, padding: 10, borderLeftColor: "#1679AB" }}>Product Name</Text>
                    <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 10, borderLeftColor: "#1679AB" }}>Quantity</Text>
                    <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 10, borderLeftColor: "#1679AB" }}>Price</Text>
                    <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 10, borderLeftColor: "#1679AB" }}>Total Price</Text>
                  </View>
                  {
                    billingsData.length > 0 ? (
                      <>
                        {
                          billingsData.map((element) => {

                            let parsedDate = new Date(element.createdAt);
                            let day = String(parsedDate.getDate()).padStart(2, '0');
                            let month = String(parsedDate.getMonth() + 1).padStart(2, '0');
                            let year = parsedDate.getFullYear();
                            let hours = String(parsedDate.getHours()).padStart(2, '0');
                            let minutes = String(parsedDate.getMinutes()).padStart(2, '0');
                            let formattedDate = `${day}-${month}-${year}`;
                            let formattedtime = `${hours}:${minutes}`

                            return element.products.map((product, index) => (
                              <>
                                {
                                  index === 0 ? (
                                    <>
                                      <View style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', width: '100%', backgroundColor: "#fff" }}>
                                        <Text style={{ width: "18%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderBottomColor: "#cde8f6", backgroundColor: "#cde8f6" }}>{formattedDate} {formattedtime}</Text>
                                        <Text style={{ width: "12%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#cde8f6", borderTopColor: "#cde8f6", borderBottomColor: "#cde8f6", backgroundColor: "#cde8f6" }}>{element.bill_id}</Text>
                                        <Text style={{ width: "25%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.product_name}</Text>
                                        <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.quantity}</Text>
                                        <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.product_price}</Text>
                                        <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.quantity * product.product_price}</Text>
                                      </View>
                                      {
                                        index === element.products.length - 1 ? (
                                          <>
                                            <View style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', width: '100%', backgroundColor: "#cde8f6" }}>
                                              <Text style={{ width: "18%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                                              <Text style={{ width: "12%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                                              <Text style={{ width: "55%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}>Total Bill Amount</Text>
                                              <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}>{element.total_billvalue}</Text>
                                            </View>
                                          </>
                                        ) : null
                                      }
                                    </>
                                  ) : (
                                    <>
                                      <View style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', width: '100%', backgroundColor: "#fff" }}>
                                        <Text style={{ width: "18%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderBottomColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                                        <Text style={{ width: "12%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#cde8f6", borderTopColor: "#cde8f6", borderBottomColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                                        <Text style={{ width: "25%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.product_name}</Text>
                                        <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.quantity}</Text>
                                        <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.product_price}</Text>
                                        <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderLeftColor: "#edefc9", borderTopColor: "#edefc9", backgroundColor: "#edefc9" }}>{product.quantity * product.product_price}</Text>
                                      </View>
                                      {
                                        index === element.products.length - 1 ? (
                                          <>
                                            <View style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', width: '100%', backgroundColor: "#fff" }}>
                                              <Text style={{ width: "18%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                                              <Text style={{ width: "12%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}></Text>
                                              <Text style={{ width: "55%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}>Total Bill Amount</Text>
                                              <Text style={{ width: "15%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", borderLeftColor: "#cde8f6", backgroundColor: "#cde8f6" }}>{element.total_billvalue}</Text>
                                            </View>
                                          </>
                                        ) : null
                                      }
                                    </>
                                  )
                                }
                              </>
                            ))

                          })
                        }
                      </>
                    ) : (
                      <><View style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', width: '100%', backgroundColor: "#fff" }}>
                        <Text style={{ width: "100%", textAlign: 'center', borderWidth: 1.5, padding: 5, borderTopColor: "#cde8f6", backgroundColor: "#cde8f6" }}>No Data Found</Text>
                      </View></>
                    )
                  }

                </View>
              </Page>
            </Document>
          </PDFViewer>
        ) : (
          <div className='w-full'>
            <p className='text-[25px] w-[95%] text-[#fff] font-ptserif bg-[#333333] h-[57vh] flex justify-center items-center'>Choose From and To Date</p>
          </div>
        )
      }


    </div>
  )
}
