import React, { useState,useEffect } from "react";
import { HiOutlineDocumentText,HiOutlineFolder} from "react-icons/hi";
import { MdExpandMore} from "react-icons/md";
import { AiOutlineRight} from "react-icons/ai";
import Doc from './Doc'

const Tree=({documents})=>{

    return(
    <div className="grid row-auto gap-0 relative">
    {
        documents.map(document=>(
            <Doc document={document}/>
        ))
    }
    </div>
    )
}

export default Tree;
