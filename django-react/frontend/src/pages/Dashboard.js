import React, {useState, useEffect} from 'react'
import {useSelector} from "react-redux"
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {getUser} from '../state/slices/userSlice'
import { Navigate, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import DocEditor from '../components/DocEditor';
import api from '../../config'

const Dashboard = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const docid = searchParams.get("doc_id")

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
            console.log(error)
            setFilesStatus("Failed to fetch your files. Try reloading the page.");
        });
    }, [action]);
 
  return (
    <div>  
      <Navbar/>
      {files && <Sidebar files={files} filesStatus={filesStatus} action={action} setAction={setAction} doc_id={docid}/>}
      <DocEditor doc_id={docid}/>
    </div>
  )
}

export default Dashboard
