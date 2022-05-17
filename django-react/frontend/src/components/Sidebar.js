import React, { useState, useEffect, useCallback } from 'react';
import "../assets/tailwind.css"
import api from '../../config';

import DocTree from './DocTree';
import {Link } from 'react-router-dom'
import Hamburger from './Hamburger'
import { RiAddBoxLine} from "react-icons/ri";
import {MdCreateNewFolder} from "react-icons/md"
import {TiDocumentAdd} from 'react-icons/ti'
import {useSelector} from "react-redux"
import {getUser} from '../state/slices/userSlice'
import toast, { Toaster } from 'react-hot-toast';

const CreateFolder = (document)=>{
    api.post(`/api/documents/folder/`, {
        title: "Folder",
        is_root: true,
    }).then(res=>{
        toast.success("Successfully created folder!")
    }).catch(err=>{
        toast.error(`Error`)
    })
}
const CreateDocument = (parent)=>{
    api.post(`/api/documents/doc/`, {
        title: "Document",
        content:"New document.",
    }).then(res=>{
        toast.success("Successfully created document!")
    }).catch(err=>{
        toast.error(`Error`)
    })
}


const DropDown = ({anchorPoint, action, setAction, show, setShow})=>{
    return (
        <ul
        className="absolute bg-slate-100 w-fit divide-y divide-slate-200"
        style={{
            top: anchorPoint.y - 75,
            left: anchorPoint.x,
            zIndex: 200,
        }}
        >
            <li className="hover:bg-slate-200 cursor-pointer py-1 px-3">Move</li>
            <li className="hover:bg-slate-200 cursor-pointer py-1 px-3" onClick={()=> {
                setShow(!show)
                CreateFolder()
                setAction(!action)
                }}>
                <div className="flex space-x-10">
                    <p>Create Folder</p>
                    <MdCreateNewFolder color="black" className="w-4 h-4 mt-1"/>
                </div>
            </li>
            <li className="hover:bg-slate-200 cursor-pointer py-1 px-3" onClick={()=> {
                setShow(!show)
                CreateDocument()
                setAction(!action)
                }}>
                <div className="flex justify-between">
                    <p>Create Document</p>
                    <TiDocumentAdd color="black" className="w-4 h-4 mt-1"/>
                </div>
            </li>
        </ul>
    )
}


export default function Sidebar(){
    // whether hamburger menu is open or closed
    const [isOpen, setIsOpen] = useState(false);
    //Handles right click
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    // logged in user
    const user = useSelector(getUser);
    const [files, setFiles] = useState([]); //contains actual tree structure
    const [filesStatus, setFilesStatus] = useState("Loading..."); //status message for files
    //Handle updating files
    const [action, setAction] = useState(false)
    // Load folders and documents
    useEffect(() => {
        api.get('/api/documents/tree').then((response) => { //success
            if(response.status == 200) {
                setFiles(response.data);
                setFilesStatus("");
            }
        }).catch(error => { //failure
            setFilesStatus("Failed to fetch your files. Try reloading the page.");
        });
    }, [action, files]);

    return(
        <div 
        style={{position: "absolute"}}
        onContextMenu={useCallback((e)=>{
            e.preventDefault()
            setAnchorPoint({ x: e.clientX, y: e.clientY });
            setShow(!show);
        })}
        onMouseLeave={()=>{
            setShow(false)
        }}
        >
                        <Toaster
            position="top-center"
            reverseOrder={false}
            />
            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className={`bg-sidebar_background_color w-80 h-screen shadow-xl ${isOpen?'translate-x-0':'-translate-x-full'} ease-in-out duration-300 relative`} style={{zIndex: 100}}>
                <p className="pl-1 leading-10 text-left font-sans font-bold text-lifepad_black text-2xl truncate border-r-[40px] border-transparent">
                    Hi, {user?.username}
                        <button className="absolute right-0 bg-transparent"> 
                            <RiAddBoxLine className='h-10 w-10 fill-lifepad_black hover:fill-lifepad_green'/>
                        </button>
                    {/* <button className="absolute right-10 top-0 bg-transparent"> 
                            <BiFolderPlus className='h-10 w-10 fill-lifepad_black hover:fill-lifepad_green '/>
                    </button> */}
                </p>
                <hr className='shadow-sm fill-lifepad_black'/>
                    <p>{filesStatus}</p>
                    <DocTree documents={files} action={action} setAction={setAction} depth={0}/>
                </div>
                {
                    show && (
                        <DropDown anchorPoint={anchorPoint} action={action} setAction={setAction} setShow={setShow} show={show}/>
                    )
                }
        </div>
    )
}