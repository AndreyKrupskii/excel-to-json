import XLSX from 'xlsx';
import Parser from './../services/parser';
import description from './../assets/description';

// constants
import { PREPEND_PARSED_FILE } from './history';
export const ADD_FILE = 'parser/file/ADD_FILE';

// initial state
const initialState = {
	name: 'default',
	uploadedAt: +(new Date()),
	json: JSON.stringify(description, null, 2)
};

/**
 * Reducer - file reducer
 * @param {object} state - prev reducer state
 * @param {object} action - dispatched action
 * @return {object}
 */
export default function fileReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_FILE : {
			return {
				...state,
				...action.payload
			}
		}
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
				// prepare payload
				const payload = {
					name: file.name,
					json: JSON.stringify(parsed, null, 2),
					uploadedAt: +(new Date())
				};
				
				// dispatch actons
				dispatch({
					type: ADD_FILE,
					payload
				});
				
				dispatch({
					type: PREPEND_PARSED_FILE,
					payload
				});
			})
	}
}

/**
 * Action for adding new/old file
 * @param {object} file - parsed file instance
 * @return {object}
 */
export function addFile(file) {
	return {
		type: ADD_FILE,
		payload: file
	}
}