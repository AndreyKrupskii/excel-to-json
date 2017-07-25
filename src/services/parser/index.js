/**
 * Service for parsing workbook
 */
export default class Parser {
	/**
	 * Constructor of parsing workbook service
	 */
	constructor() {
		// require sheets
		const requireContext = require.context('./sheets', false, /.+\.js$/);
		
		this.schemas = requireContext.keys()
			.map(requireContext)
			.map((v) => v.default);
	}
	
	/**
	 * Method for parsing xslx.js workbook
	 * @param {object} workbook - xslx.js workbook instance
	 * @return {object}
	 */
	parseWorkbook(workbook) {
		// root object
		const parsed = {};
		
		for (let key in workbook.Sheets) {
			// check own property
			if(!workbook.Sheets.hasOwnProperty(key)) {
				continue ;
			}
			
			// define sheet
			const sheet = workbook.Sheets[key];
			const schema = this.schemas.find((v) => {
				return v.description.sheetName === key;
			});
			
			// check schema existence
			if (!schema) {
				parsed[key] = {
					error: `Parsing schema for sheet ${key} is not fined.`
				}
			}
			
			// parse sheet according to schema parse way
			switch (schema.description.parseWay) {
				case 'cells' : {
					parsed[key] = this.parseViaCells(sheet, schema);
					break ;
				}
				case 'rows' : {
					parsed[key] = this.parseViaRows(sheet, schema);
					break ;
				}
				case 'columns' : {
					parsed[key] = this.parseViaColumns(sheet, schema);
					break ;
				}
			}
		}
		
		return parsed;
	}
	
	/**
	 * Method for parsing workbook cells
	 * @param {object} sheet - workbook sheet
	 * @param {object} schema - sheet schema
	 * @return {object}
	 */
	parseViaCells(sheet, schema) {
		// root object
		const parsed = {};
		
		for (let key in schema.rules) {
			// check own property
			if(!schema.rules.hasOwnProperty(key)) {
				continue ;
			}
			
			// define rule
			const rule = schema.rules[key];
			const path = rule.jsonWay.split('.');
			
			// insert value into root object
			let knot = parsed;
			
			for (let i = 0, length = path.length; i < length; i++) {
				// create next knot if it is not exist
				if (!knot[path[i]]) {
					knot[path[i]] = {};
				}
				
				// check if we should insert value or go to the next knot
				if (i === length - 1) {
					knot[path[i]] = rule.insert(
						sheet[key] && sheet[key].w
					);
				} else {
					knot = knot[path[i]];
				}
			}
		}
		
		return parsed;
	}
	
	/**
	 * Method for parsing workbook rows
	 * @param {object} sheet - workbook sheet
	 * @param {object} schema - sheet schema
	 * @return {Array}
	 */
	parseViaRows(sheet, schema) {
		// define parse limits
		let from = schema.description.from || 'A';
		let to = schema.description.to;
		
		// get limit to
		if (!to) {
			// initial to value
			to = from;
			
			while(sheet[`${to}1`]) {
				let toCode = to.charCodeAt(0);
				to = String.fromCharCode(toCode + 1);
			}
		}
		
		// generate parsing schema description
		const description = {
			...schema.description,
			parseWay: 'cells'
		};
		
		// get limits codes
		const fromCode = from.charCodeAt(0);
		const toCode = to.charCodeAt(0);
		
		// parse through the rows
		const parsed = [];
		
		for (let i = fromCode; i < toCode; i++) {
			// generate rules
			const rules = {};
			
			for (let key in schema.rules) {
				// check own property
				if(!schema.rules.hasOwnProperty(key)) {
					continue ;
				}
				
				const iteratorChar = String.fromCharCode(i);
				
				// set rule
				rules[`${iteratorChar}${key}`] = { ...schema.rules[key] };
			}
			
			// parse row
			parsed.push(
				this.parseViaCells(sheet, {
					description,
					rules
				})
			);
		}
		
		return parsed;
	}
	
	/**
	 * Method for parsing workbook columns
	 * @param {object} sheet - workbook sheet
	 * @param {object} schema - sheet schema
	 * @return {Array}
	 */
	parseViaColumns(sheet, schema) {
		// define parse limits
		let from = schema.description.from || 0;
		let to = schema.description.to;
		
		// get limit to
		if (!to) {
			// initial to value
			to = from;
			
			while(sheet[`A${to}`]) {
				to++;
			}
		}
		
		// generate parsing schema description
		const description = {
			...schema.description,
			parseWay: 'cells'
		};
		
		// parse through the rows
		const parsed = [];
		
		for (let i = from; i < to; i++) {
			// generate rules
			const rules = {};
			
			for (let key in schema.rules) {
				// check own property
				if(!schema.rules.hasOwnProperty(key)) {
					continue ;
				}
				
				// set rule
				rules[`${key}${i}`] = { ...schema.rules[key] };
			}
			
			// parse column
			parsed.push(
				this.parseViaCells(sheet, {
					description,
					rules
				})
			);
		}
		
		return parsed;
	}
}