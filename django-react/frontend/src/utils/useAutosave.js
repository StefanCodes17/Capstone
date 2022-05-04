import {useState, useCallback, useEffect} from "react";
import debounce from "lodash.debounce";

const DEBOUNCE_SAVE_DELAY_MS = 2000;

export default function useAutosave(dataToSave, callback) {
	// This should mirror what's in the database
	const [data, setData] = useState(dataToSave);

	// This function should update local data (setData) and persistent storage
	const saveData = useCallback(newData => {
		const p = new Promise((resolve, reject)=>{
			if(true){
				window.localStorage.setItem("doc", JSON.stringify(newData))
				resolve({
					status: "200",
					data:{
						message: "Successfully saved document"
					}
				})
			}
			if(false){
				reject(
					{
						status: "409",
						data:{
							message: "Failure to save document"
						}
					}
				)
			}
		})
		p.then(res =>{
			callback(res)	
		}).catch(err=>{
			callback(err)
		})
		setData(newData);
	}, []);

	// Throttle the saveData function, so it doesn't run too often
	const debouncedSave = useCallback(
    	debounce(
    		(newData) => {
    			saveData(newData);
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
    			debouncedSave(data);
    		}
    	}, 
    	[data, debouncedSave]
    );

    return [data, setData];

}