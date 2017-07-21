/**
 * Helper
 * Library for insert functions from parsed excel workbook
 */
export default class Insert {
	/**
	 * Method for getting number value from cell
	 * @param {string || undefined} input - exel cell value
	 * @returns {number || string || undefined}
	 */
	static insertNumber(input = '') {
		input = input.trim().replace(/,/, '.');
		
		if(input === '') {
			input = undefined;
		}
		
		const value = parseFloat(input);
		
		if(isNaN(value)) {
			return input;
		}
		
		return value;
	}
	
	/**
	 * Method for getting string value from cell
	 * @param {string || undefined} input - exel cell value
	 * @returns {string || undefined}
	 */
	static insertString(input = '') {
		input = input.trim();
		
		if(input === '') {
			input = undefined;
		}
		
		return input;
	}
	
	/**
	 * Method for checking if cell value is empty
	 * @param {string || undefined} input - exel cell value
	 * @returns {boolean}
	 */
	static isEmpty(input = '') {
		return (input.trim() === '');
	}
}