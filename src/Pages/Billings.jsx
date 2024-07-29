import React, {useEffect, useState} from 'react'
import { Menu } from '../Components/Menu';
import { Header } from '../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuStatus } from '../slices/MenuStatus';

export const Billings = () => {

  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu);

  const [content, setContent] = useState(null);

  useEffect(() => {
    dispatch(changeMenuStatus("billings"));
    document.title = "Stock Management - Billings";

    if (!menu.menumobile) {
      const desktopcontent = (
        <>
          <div className={`transition-all duration-300 ease-in-out ${menu.menustatus === "opened" ? 'w-[0] lg:w-[23%]' : 'w-[0] lg:w-[23%] ml-[-23%]'}`}>
            <Menu />
          </div>
          <div className={`transition-all duration-300 ease-in-out ${menu.menustatus === "opened" ? 'w-[100%] lg:w-[77%]' : 'w-[100%] lg:w-[100%]'} h-[100vh] bg-[#E0E0E0]`}>
            <Header />
          </div>
        </>
      );
      setContent(desktopcontent);
    } else {
      const Mobilecontent = (
        <>
          <div className={`transition-all duration-300 ease-in-out ${menu.menustatus === "opened" ? 'w-[300px] fixed z-10' : 'w-[100px] ml-[-300px] fixed z-10'}`}>
            <Menu />
          </div>
          <div className={`transition-all duration-300 ease-in-out ${menu.menustatus === "opened" ? 'w-[100%] h-[100vh] bg-[#E0E0E0]' : 'w-[100%]'} h-[100vh] bg-[#E0E0E0]`}>
            <Header />
          </div>
        </>
      );
      setContent(Mobilecontent); // Clear content if menumobile is true
    }
  }, [dispatch, menu.menumobile, menu.menustatus]);

  return (
    <div className='bg-[#E0E0E0] h-[100vh] flex'>
      {content}
    </div>
  )

}
