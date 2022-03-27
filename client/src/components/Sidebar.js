import React, { useState } from 'react';
import "../assets/tailwind.css"
import DocTree from './DocTree';
import {Link } from 'react-router-dom'
import Hamburger from './Hamburger'
import { RiAddBoxLine} from "react-icons/ri";
import {BiFolderPlus} from "react-icons/bi"

export default function Sidebar(){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className={`bg-sidebar_background_color w-80 h-screen shadow-xl ${isOpen?'translate-x-0':'-translate-x-full'} ease-in-out duration-300 relative`}>
                    <Link to="/editor">
                        <button className="absolute right-0"> 
                            <RiAddBoxLine className='h-10 w-10 fill-lifepad_black shadow-sm hover:fill-lifepad_green'/>
                        </button>
                    </Link>
                    {/* <button className="absolute right-0 top-10"> 
                            <BiFolderPlus className='h-10 w-10 fill-lifepad_black shadow-sm hover:fill-lifepad_green '/>
                    </button> */}
                    <DocTree>
                    </DocTree>
                </div>
        </>
    )
}