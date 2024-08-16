import React from 'react'
import logo from '../Assets/Images/Cragx Text-Logo - Light.png';
import { useNavigate } from 'react-router-dom';
import { changeLoadingStatus } from '../slices/LoadingStatus';
import { changeMenuStatus, changeMenubar } from '../slices/MenuStatus';
import { useDispatch, useSelector } from 'react-redux';

export const Menu = () => {

    const menu = useSelector((state) => state.menu);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("JWTtoken");
        dispatch(changeLoadingStatus(true));

        navigate('/', { replace: true });

    }

    return (
        <div className='flex h-[100vh] justify-center items-center'>
            <div className='w-[95%] h-[98vh] bg-white rounded'>
                <div className='flex flex-col justify-center items-center'>
                    {
                        menu.menumobile ?
                            <>
                                <div className='flex items-center justify-center'>
                                    <img className='w-[160px]' src={logo} alt="logo" />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div onClick={() => { dispatch(changeMenubar("closed")) }} className='text-[25px]'><i className="fa-solid fa-xmark rounded bg-[#C40C0C] text-[white] p-[5px]"></i></div>
                                </div>
                            </> :
                            <>
                                <img className='w-[200px]' src={logo} alt="logo" />
                            </>
                    }
                    <div className='w-[90%] h-[2px] bg-[#444444]'> </div>
                </div>
                <div className='flex flex-col justify-between h-[80vh]'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className={menu.page === "dashboard" ? 'activeoptions' : 'options'} onClick={() => {
                            dispatch(changeMenuStatus("dashboard"));
                            dispatch(changeLoadingStatus(true));
                            navigate('/dashboard', { replace: true });
                        }}>
                            <div className='optionname'>Dashboard</div>
                            <div className='optionicon'><i className="fa-solid fa-chart-line"></i></div>
                        </div>
                        <div className={menu.page === "billings" ? 'activeoptions' : 'options'} onClick={() => {
                            dispatch(changeMenuStatus("billings"));
                            dispatch(changeLoadingStatus(true));
                            navigate('/billings', { replace: true });
                        }}>
                            <div className='optionname'>Billings</div>
                            <div className='optionicon'><i className="fa-solid fa-money-bill"></i></div>
                        </div>
                        <div className={menu.page === "stocks" ? 'activeoptions' : 'options'} onClick={() => {
                            dispatch(changeMenuStatus("stocks"));
                            dispatch(changeLoadingStatus(true));
                            navigate('/stocks', { replace: true });
                        }}>
                            <div className='optionname'>Products</div>
                            <div className='optionicon'><i className="fa-regular fa-clipboard"></i></div>
                        </div>
                        <div className={menu.page === "generatebill" ? 'activeoptions' : 'options'} onClick={() => {
                            dispatch(changeMenuStatus("generatebill"));
                            dispatch(changeLoadingStatus(true));
                            navigate('/generatebill', { replace: true });
                        }}>
                            <div className='optionname'>Generate Bill</div>
                            <div className='optionicon'><i className="fa-regular fa-file"></i></div>
                        </div>
                        <div className={menu.page === "billhistory" ? 'activeoptions' : 'options'} onClick={() => {
                            dispatch(changeMenuStatus("billhistory"));
                            dispatch(changeLoadingStatus(true));
                            navigate('/billhistory', { replace: true });
                        }}>
                            <div className='optionname'>Bill History</div>
                            <div className='optionicon'><i className="fa-solid fa-clock-rotate-left"></i></div>
                        </div>
                    </div>
                    <div className='w-[100%] flex flex-col justify-center items-center' align="center">
                        <div className='w-[90%] h-[2px] bg-[#444444]'> </div>
                        <button onClick={logout} className='logoutbtn flex flex-row border-[3px] border-[#C40C0C] justify-between mt-[20px] mb-[10px] w-[90%] text-[17px] font-semibold text-[#ffffff] pt-[10px] pb-[10px] rounded font-ptserif bg-[#C40C0C] hover:bg-[white] hover:text-[#C40C0C] hover:border-[3px] hover:border-[#C40C0C]'>
                            <div className='ml-[7px]'>Logout</div>
                            <div className='mr-[7px]'><i className="fa-solid fa-right-from-bracket"></i></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
