import React, { useEffect, useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { BiCategoryAlt } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { IoIosColorPalette } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';

const SideBar = () => {
    const [active, setActive] = useState(0);
     const admin=useSelector(store=>store.admin);
    const navigator=useNavigate();
     useEffect(
        ()=>{
            if(admin.data == null){
                navigator('/admin/login');
            }
        },[admin]
     )
    const items = [
        {
            name: "Dashboard",
            icon: <MdDashboard />,
            url: "/admin",
            children: []
        },
        {
            name: "Transactions",
            icon: <GrTransaction />,
            url: "/admin/transaction",
            children: []
        },
        {
            name: "Orders",
            icon: <GrTransaction />,
            url: "/admin/order",
            children: []
        },
        {
            name: "Category",
            icon: <BiCategoryAlt />,
            url: null,
            children: [
                {
                    name: "Add",
                    url: "/admin/category/add"
                },
                {
                    name: "View",
                    url: "/admin/category/view"
                },
            ]
        },

        {
            name: "Product",
            icon: <FaSitemap />,
            url: null,
            children: [
                {
                    name: "Add",
                    url: "/admin/Product/add"
                },
                {
                    name: "View",
                    url: "/admin/Product/view"
                },
            ]
        },
        {
            name: "Color",
            icon: <IoIosColorPalette />
            ,
            url: null,
            children: [
                {
                    name: "Add",
                    url: "/admin/color/add"
                },
                {
                    name: "View",
                    url: "/admin/color/view"
                },
            ]
        },
        {
            name: "Account Setting",
            icon: <IoIosSettings />,
            url: "/admin/account-setting",
            children: []
        },
        {
            name: "Logout",
            icon: <CiLogout />,
            url: "/admin/logout",
            children: []
        }
    ];

    return (
        <div className='h-[100vh] bg-gradient-to-r from-violet-600 to-indigo-600 p-2'>
            <div className='text-3xl text-white p-3 text-center font-bold'>Admin Panel</div>
            <hr />
            <ul className='flex flex-col gap-2 mt-5 px-2 text-white text-[18px]'>
                {items.map((item, index) => (
                    <ListItem index={index} activeHandler={setActive} active={active} data={item} key={index} />
                ))}
            </ul>
        </div>
    );
};

export default SideBar;

const ListItem = ({ index, data, activeHandler, active }) => {
    return (
        <>
            {data.children.length === 0 ? (
                <Link to={data.url} >
                    <li onClick={()=>activeHandler(index)} className={`text-gray-400 hover:text-white flex items-center gap-3 ${active==index ? 'text-white' : ''}`}>{data.icon}{data.name}</li>
                </Link>
            ) : (
                <>
                    <li onClick={
                    ()=>{
                        if(index==active){
                         activeHandler(null);
                        }
                        else{
                            activeHandler(index);
                        }
                    }
                } className={`select-none text-gray-400 hover:text-white relative flex-wrap flex items-center gap-3 cursor-pointer ${active==index ? 'text-white' : ''}`}>
                        {data.icon}{data.name}
                        <FaCaretDown className={` duration-300 absolute top-[5px] right-[20px] ${index==active ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </li>
                    <ul className={`w-full bg-white text-black rounded ${index==active ? 'block' : 'hidden'}`}>
                        {data.children.map((child, index) => (
                           
                             <Link onClick={(e)=>e.stopPropagation()} to={child.url} key={index}>
                            <li className=''>{child.name}</li>
                        </Link>
                        
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};
