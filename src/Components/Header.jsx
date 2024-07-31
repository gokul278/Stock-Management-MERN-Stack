import React, { useEffect, useState } from 'react';
import user from '../Assets/Images/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenubar } from '../slices/MenuStatus';

export const Header = () => {

    const dispatch = useDispatch();

    const menu = useSelector((state) => state.menu);

    const [menuname, setMenuname] = useState("Dashboard");

    useEffect(() => {
        if (menu.page === "dashboard") {
            setMenuname("Dashboard");
        } else if (menu.page === "billings") {
            setMenuname("Billings");
        } else if (menu.page === "stocks") {
            setMenuname("Stocks");
        } else if (menu.page === "generatebill") {
            setMenuname("Generate Bill");
        } else if (menu.page === "billhistory") {
            setMenuname("Bill History");
        } else {
            setMenuname("");
        }
    }, [menu.page])

    const changestatus = () => {

        if (menu.menustatus === "opened") {
            dispatch(changeMenubar("closed"));
        } else if (menu.menustatus === "closed") {
            dispatch(changeMenubar("opened"));
        }

    }

    return (
        <div className={`w-[99%] mt-[1vh] rounded bg-[#fff] h-[8vh] flex justify-between items-center`}>
            <div onClick={changestatus} className='h-[6vh] ml-[10px] rounded bg-[#1679AB] w-[45px] text-[#fff] text-[30px] flex justify-center cursor-pointer items-center'>
                <i className="fa-solid fa-bars"></i>
            </div>
            <div className='font-dancing text-[25px] font-bold'>
                {menuname}
            </div>
            <div className='h-[6vh] mr-[10px] rounded w-[50px] flex justify-center items-center'>
                <img src={user} alt='userlogo' />
            </div>
        </div>
    )
}
