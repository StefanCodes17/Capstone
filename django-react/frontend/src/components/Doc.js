import React, { useState,useEffect, useCallback } from "react";
import { HiOutlineDocumentText,HiOutlineFolder} from "react-icons/hi";
import { MdExpandMore} from "react-icons/md";
import {BsTrash} from "react-icons/bs"
import {MdCreateNewFolder} from "react-icons/md"
import {TiDocumentAdd} from 'react-icons/ti'
import toast, { Toaster } from 'react-hot-toast';
import Tree from './DocTree'
import api from '../../config'
import { Navigate, Link, useSearchParams } from "react-router-dom";

const CreateFolder = (parent)=>{
    api.post(`/api/documents/folder/`, {
        title: "untitled Folder",
        is_root: false,
        parent_folder_id: parent.id
    }).then(res=>{
        toast.success("Successfully created folder!")
    }).catch(err=>{
        toast.error(`Error`)
    })
}
const CreateDocument = (parent)=>{
    api.post(`/api/documents/doc/`, {
        title: "Untitled Document",
        content: JSON.stringify([{"type":"paragraph","children":[{"text":"New Document"}]}]),
        parent_folder_id: parent.id
    }).then(res=>{
        toast.success("Successfully created document!")
    }).catch(err=>{
        console.log(err)
        toast.error(`Error`)
    })
}


const DeleteItem = (document)=>{
    const docType = document.hasOwnProperty("children") ? "folder" : "doc"
    api.delete(`/api/documents/${docType}/${document.id}/`).then(res=>{
        toast.success(`Successfully deleted ${docType}`)
    }).catch(err=>{
        toast.error(`Error`)
    })
}

const DropDown = ({anchorPoint, document, action, setAction, show, setShow})=>{
    console.log(document)
    const docType = document.hasOwnProperty("children") ? "folder" : "doc"
    return (
        <ul
        className="absolute bg-slate-100 z-40 w-fit divide-y divide-slate-200"
        style={{
            top: anchorPoint.y - 100,
            left: anchorPoint.x
        }}
        >
            <li className="hover:bg-slate-200 cursor-pointer py-1 px-3">Move</li>
            {
                docType != "doc" && (
                    <>
                            <li className="hover:bg-slate-200 cursor-pointer py-1 px-3" onClick={()=> {
                        setShow(!show)
                        CreateFolder(document)
                        setAction(!action)
                        }}>
                        <div className="flex space-x-10">
                            <p>Create Folder</p>
                            <MdCreateNewFolder color="black" className="w-4 h-4 mt-1"/>
                        </div>
                    </li>
                    <li className="hover:bg-slate-200 cursor-pointer py-1 px-3" onClick={()=> {
                        setShow(!show)
                        CreateDocument(document)
                        setAction(!action)
                        }}>
                        <div className="flex justify-between">
                            <p>Create Document</p>
                            <TiDocumentAdd color="black" className="w-4 h-4 mt-1"/>
                        </div>
                    </li>
                    </>
                )
            }
            <Link to={`/dashboard?doc_id=${document.id}`}>
            <li className="hover:bg-slate-200 cursor-pointer py-1 px-3" onClick={()=> {
                setAction(!action)
                setShow(!show)
                }}>
                <div className="flex justify-between">
                    <p>Open </p>
                </div>
            </li>
            </Link>
            <li className="hover:bg-slate-200 cursor-pointer py-1 px-3" onClick={()=> {
                DeleteItem(document)
                setAction(!action)
                setShow(!show)
                }}>
                <div className="flex justify-between">
                    <p>Delete </p>
                    <BsTrash color="red" className="w-4 h-4 mt-1"/>
                </div>
            </li>
        </ul>
    )
}

const Doc = ({document, action, setAction}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const docid = searchParams.get("doc_id")
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);

  return (
    <div key={document.id} 
    className="items-center mx-2" 
    onContextMenu={useCallback((e)=>{
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
                    <Folder folder={document} key={document.id}/>
                    :
                    // make documents
                    <Document document={document} key={document.id} action={action} setAction={setAction} active={document.id == docid}/>
                }
                {
                    show && (
                        <DropDown anchorPoint={anchorPoint} document={document} action={action} setAction={setAction} setShow={setShow} show={show}/>
                    )
                }
    </div>
  )
}


const Document = ({document, action, setAction,active})=> {

    const [update, setUpdate] = useState(false)
    const [title, setTitle] = useState(document.title)

    const updateDocument = ()=>{
        const docType = document.hasOwnProperty("children") ? "folder" : "doc"
        api.put(`/api/documents/${docType}/${document.id}/`, 
        {
            title: title
        }
        ).then(res=>{
            toast.success(`Successfully updated ${docType}`)
        }).catch(err=>{
            toast.error(`Error`)
        })
    }

    return (
        <button 
        onDoubleClick={()=>{
            setUpdate(true)
        }}
        onMouseLeave={()=>{
            setUpdate(false)
        }}
        type="button" 
        className={`document inline-flex w-64 px-5 mr-5 text-sm font-small bg text-lifepad_black drop-shadow-sm ${!update && "hover:bg-lifepad_green"} hover:text-white hover:shadow-inner`}>
            <HiOutlineDocumentText className="w-4 h-4 pt-1 mr-2"/>
            {update ? <form             
            onSubmit={(e)=>{
                e.preventDefault()
                updateDocument(document)
                setUpdate(!update)
                setAction(!action)
            }}><input 
            type="text"
            className="hover:outline-none hover:text-black"
            value ={title}
            onChange={(e)=>{
                setTitle(e.target.value)
            }}></input>
            <input type="submit" style={{display: 'none'}} /></form>
:
            <p className={`${active&& "font-bold"}`}>{document.title}</p>
        }

        </button>
    );
};

const Folder = ({folder})=>{
    const[open,setOpen] = useState(false);
    const handleClick = ()=> {setOpen(!open);};

    return(
    <div> 
        <button 
        onClick={handleClick} 
        type="button" 
        className="document inline-flex w-64 px-5 mr-5 text-sm font-small bg text-lifepad_black drop-shadow-sm hover:bg-lifepad_green hover:text-white hover:shadow-inner align-baseline">
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
