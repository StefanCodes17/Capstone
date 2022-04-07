import React, { useEffect } from "react";
import { HiOutlineDocumentText,HiOutlineFolder} from "react-icons/hi";
import { MdExpandMore} from "react-icons/md";



const Data={
    
}

const Tree=({documents})=>{
    return(
    <div className="grid row-auto gap-0 relative">
    {
        documents.map(document=>(
            <div key={document.id} className="items-center mx-2">
                {
                document.hasOwnProperty("children") ?  
                    //folder
                   <div> 
                        <button type="button" className="document inline-flex w-64 px-5 mr-5 text-sm font-small bg text-lifepad_black drop-shadow-sm hover:bg-lifepad_green hover:text-white hover:shadow-inner">
                            <MdExpandMore className="w-4 h-4 pt-1"/>
                            <HiOutlineFolder  className="w-4 h-4 pt-1 mr-2" />
                            {document.title}
                        </button>
                       <Tree documents={document.children}/>
                    </div>
                    :
                    //documents
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
export default Tree;