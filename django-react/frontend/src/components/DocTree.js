import React, { useState,useEffect } from "react";
import { HiOutlineDocumentText,HiOutlineFolder} from "react-icons/hi";
import { MdExpandMore} from "react-icons/md";
import { AiOutlineRight} from "react-icons/ai";

const Data={
    
}
const Tree=({documents})=>{

    // const[open,isOpen()] = 
    return(
    <div className="grid row-auto gap-0 relative">
    {
        documents.map(document=>(
            <div key={document.id} className="items-center mx-2">
                {
                document.hasOwnProperty("children") ?  
                    //folder
                    <Folder folder={document}/>
                    :
                    // make documents
                    <button type="button" className="document inline-flex w-64 px-5 mr-5 text-sm font-small bg text-lifepad_black drop-shadow-sm hover:bg-lifepad_green hover:text-white hover:shadow-inner">
                        <HiOutlineDocumentText className="w-4 h-4 pt-1 mr-2"/>
                        {document.title}
                    </button>
                }
            </div>
        ))
    }
    </div>
    )
}
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
export default Tree;
