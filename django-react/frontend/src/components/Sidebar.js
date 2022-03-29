import React, { useState } from 'react';
import "../assets/tailwind.css"
import DocTree from './DocTree';
import {Link } from 'react-router-dom'
import Hamburger from './Hamburger'
import { RiAddBoxLine} from "react-icons/ri";
import {BiFolderPlus} from "react-icons/bi"
import {useSelector} from "react-redux"
import {getUser} from '../state/slices/userSlice'

export default function Sidebar(){
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(getUser);
    return(
        <>
            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className={`bg-sidebar_background_color w-80 h-screen shadow-xl ${isOpen?'translate-x-0':'-translate-x-full'} ease-in-out duration-300 relative`}>
                <p className="pl-1 leading-10 text-left font-sans font-bold text-lifepad_black text-2xl truncate border-r-[40px] border-transparent">
                    Hi, {user?.username}
                    <Link to="/editor">
                        <button className="absolute right-0"> 
                            <RiAddBoxLine className='h-10 w-10 fill-lifepad_black shadow-sm hover:fill-lifepad_green hover:shadow-inner'/>
                        </button>
                    </Link>
                    {/* <button className="absolute right-10 top-0"> 
                            <BiFolderPlus className='h-10 w-10 fill-lifepad_black shadow-sm hover:fill-lifepad_green '/>
                    </button> */}
                </p>
                    <DocTree>
                    </DocTree>
                </div>
        </>
    )
}