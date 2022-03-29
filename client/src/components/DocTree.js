import React, { useEffect } from "react";
import { HiOutlineDocumentText} from "react-icons/hi";


const Tree=({documents})=>{
    return(
    <div className="grid row-auto gap-0 relative">
    {
        documents.map(document=>(
            <div className="items-center">
                <button key={document.name} type="button" className="document inline-flex w-64 px-5 mr-5 text-sm font-small bg text-lifepad_black drop-shadow-sm hover:bg-lifepad_green hover:text-white hover:shadow-inner" >
                    <HiOutlineDocumentText className="w-4 h-4 pt-1 mr-5"/>
                    {document.name}
                </button>
            </div>
        ))
    }
    </div>
    )
}
export default Tree;