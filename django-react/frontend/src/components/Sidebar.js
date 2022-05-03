import React, { useState, useEffect } from 'react';
import "../assets/tailwind.css"
import axios from 'axios';

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
    const [files, setFiles] = useState([]); //contains actual tree structure
    const [filesStatus, setFilesStatus] = useState("Loading..."); //status message
    // Load folders and documents
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/api/documents/tree`, {}, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            },
        }).then((response) => { //success
            if(response.status == 200) {
                setFiles(response.data);
                setFilesStatus("");
            }
        }).catch(error => { //failure
            setFilesStatus("Failed to fetch your files. Try reloading the page.");
        });
    }, []);

    return(
        <div style={{position: "absolute"}}>
            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className={`bg-sidebar_background_color w-80 h-screen shadow-xl ${isOpen?'translate-x-0':'-translate-x-full'} ease-in-out duration-300 relative`} style={{zIndex: 100}}>
                <p className="pl-1 leading-10 text-left font-sans font-bold text-lifepad_black text-2xl truncate border-r-[40px] border-transparent">
                    Hi, {user?.username}
                    <Link to="/editor">
                        <button className="absolute right-0 bg-transparent"> 
                            <RiAddBoxLine className='h-10 w-10 fill-lifepad_black hover:fill-lifepad_green'/>
                        </button>
                    </Link>
                    {/* <button className="absolute right-10 top-0 bg-transparent"> 
                            <BiFolderPlus className='h-10 w-10 fill-lifepad_black hover:fill-lifepad_green '/>
                    </button> */}
                </p>
                <hr className='shadow-sm fill-lifepad_black'/>
                    <p>{filesStatus}</p>
                    <DocTree documents={files}/>
                </div>
        </div>
    )
}