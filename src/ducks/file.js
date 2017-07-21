import XLSX from 'xlsx';
import Parser from './../services/parser';

// initial state
const initialState = {
	name: undefined,
	uploadedAt: undefined,
	json: undefined
};

/**
 * Reducer - file reducer
 * @param {object} state - prev reducer state
 * @param {object} action - dispatched action
 * @return {object}
 */
export default function fileReducer(state = initialState, action) {
	switch (action.type) {
		default : {
			return state;
		}
	}
}

/**
 * Action for uploading new file
 * @return {function(*)}
 */
export function uploadFile(file) {
	return (dispatch) => {
		// read file as binary string
		const readFile = new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsBinaryString(file);
			
			reader.onload = (e) => resolve(e.target.result);
			reader.onerror = (e) => reject(e);
		});
		
		readFile.then((result) => {
				// read binary string
				return XLSX.read(result, { type: 'binary' });
			})
			.then((workbook) => {
				// define parser instance
				const parser = new Parser();
				
				// parse workbook
				return parser.parseWorkbook(workbook);
			})
			.then((parsed) => {
				console.log(parsed);
				dispatch({
					type: 'pa'
				})
			})
	}
}