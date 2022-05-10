import React, { useState,useEffect, useCallback } from "react";
import { HiOutlineDocumentText,HiOutlineFolder} from "react-icons/hi";
import { MdExpandMore} from "react-icons/md";
import {BsTrash} from "react-icons/bs"
import toast, { Toaster } from 'react-hot-toast';
import Tree from './DocTree'
import api from '../../config'

const DeleteItem = (document)=>{
    const docType = document.hasOwnProperty("children") ? "folder" : "doc"
    api.delete(`/api/documents/${docType}/${document.id}/`).then(res=>{
        toast(res.message)
    }).catch(err=>{
        console.log(err)
    })
}

const DropDown = ({anchorPoint, document})=>{
    return (
        <ul
        className="absolute bg-slate-100 z-40 w-fit divide-y divide-slate-200"
        style={{
            top: anchorPoint.y - 100,
            left: anchorPoint.x
        }}
        >
            <li className="hover:bg-slate-200 cursor-pointer py-1 px-3">Move</li>
            <li className="hover:bg-slate-200 cursor-pointer py-1 px-3" onClick={()=>DeleteItem(document)}>
                <div className="flex space-x-10">
                    <p>Delete </p>
                    <BsTrash color="red" className="w-4 h-4 mt-1"/>
                </div>
            </li>
        </ul>
    )
}

const Doc = ({document}) => {

    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);

  return (
    <div key={document.id} 
    className="items-center mx-2" 
    onContextMenu={useCallback((e)=>{
        console.log(document)
        e.preventDefault()
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        setShow(!show);
    })}
    onMouseLeave={()=>{
        setShow(false)
    }}
    >
                {
                document.hasOwnProperty("children") ?  
                    //folder
                    <Folder folder={document} key={document.id} />
                    :
                    // make documents
                    <Document document={document} key={document.id} />
                }
                {
                    show && (
                        <DropDown anchorPoint={anchorPoint} document={document}/>
                    )
                }
    </div>
  )
}


const Document = ({document})=> {
    return (
        <button type="button" className="document inline-flex w-64 px-5 mr-5 text-sm font-small bg text-lifepad_black drop-shadow-sm hover:bg-lifepad_green hover:text-white hover:shadow-inner">
            <HiOutlineDocumentText className="w-4 h-4 pt-1 mr-2"/>
            {document.title}
        </button>
    );
};

const Folder = ({folder})=>{
    const[open,setOpen] = useState(false);
    const handleClick = ()=> {setOpen(!open);};

    return(
    <div> 
        <button onClick={handleClick} type="button" className="document inline-flex w-64 px-5 mr-5 text-sm font-small bg text-lifepad_black drop-shadow-sm hover:bg-lifepad_green hover:text-white hover:shadow-inner align-baseline">
            {
                open ? <MdExpandMore className="w-4 h-4 pt-1"/> : <MdExpandMore className="w-4 h-4 pt-1 -rotate-90"/>
            }
            <HiOutlineFolder  className="w-4 h-4 pt-1 mr-2" />
            {folder.title}
        </button>
       {
         open && <Tree documents={folder.children}/> 
       }
    </div>);
}


export default Doc
