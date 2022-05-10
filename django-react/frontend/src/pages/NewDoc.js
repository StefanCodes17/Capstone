import React, {useState, useCallback} from "react";
import {useNavigate} from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../../config";

const NewDoc = () => {
	const [name, setName] = useState("");
	const [status, setStatus] = useState("");
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	// callback for the form
	const handleCreate = useCallback((e) => {
		e.preventDefault();
		if(name.length == 0) {
			setStatus("The name can't be empty");
			setError(true);
		} else {
			setStatus("Creating...");
			setError(false);
		}
		api.post("/api/documents/doc/", {
			title: name,
			content: "[]",
			parent_folder_id: null,
		}).then(response => {
			if(response.status == 201) {
				navigate("/doc/"+response.data.id, {replace: true});
			} else {
				console.log("Not 201 after creating doc?");
			}
		}).catch(error => {
			setStatus("Failed to create document");
			setError(true);
			console.log(error);
		})
	}, [name, setStatus, setError]);

	return (
		<div>
			<Navbar />
			<div className="px-5">
				<form onSubmit={handleCreate}>
					<h1 className="text-xl">Create Document</h1>
					<input type="text" className="text-lg" placeholder="title" onChange={(e) => {setName(e.target.value);}} />
					<input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value="Create" />
				</form>

				{(status == "Creating...") && 
				<div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 shadow-md" role="alert">
	            	<p className="font-bold">{status}</p>
	            </div>
				}

				{error &&
				<div className="bg-red-100 border-t-4 mt-3 border-red-600 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
	             	<div className="flex">
	                	<div className="py-1"><svg className="fill-current h-6 w-6 text-red-600 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
	                	<div>
	                		<p className="font-bold">Error</p>
	                		<p className="text-sm">{status}</p>
	                	</div>
	            	</div>
	            </div>
				}
			</div>
		</div>
	);
}

export default NewDoc;