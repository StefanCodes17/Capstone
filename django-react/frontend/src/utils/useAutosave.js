import {useState, useCallback, useEffect} from "react";
import debounce from "lodash.debounce";
import api from '../../config'

const DEBOUNCE_SAVE_DELAY_MS = 2000;

export default function useAutosave({loadedData, doc_id}, callback) {
	// This should mirror what's in the database
	const [data, setData] = useState(loadedData);

	// This function should update local data (setData) and persistent storage
	const saveData = useCallback((newData, doc_id) => {
		window.localStorage.setItem("doc", JSON.stringify(newData))
		api.put(`/api/documents/doc/${doc_id}/`, {
			content: JSON.stringify(newData)
		}).then(res =>{
			callback({
				status:200,
				data:{
					message: "Succesfully saved document"
				}
			})	
		}).catch(err=>{
			console.log(err)
			callback({
				status:400,
				data:{
					message: "Failed to save document"
				}
			})
		})
		setData(newData);
	}, []);

	// Throttle the saveData function, so it doesn't run too often
	const debouncedSave = useCallback(
    	debounce(
    		(newData, doc_id) => {
    			saveData(newData, doc_id);
    		}, 
    		DEBOUNCE_SAVE_DELAY_MS
    	),
    	[]
    );

    // This effect only runs when `data` changes, because we don't want to save
    // when nothing has changed!
    useEffect(
    	() => {
    		if(data) { //save if data is not null
    			debouncedSave(data, doc_id);
    		}
    	}, 
    	[data, debouncedSave]
    );

    return [data, setData];

}
