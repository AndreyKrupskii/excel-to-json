// import fs from 'fs';
// normalizedPath = require("path").join(__dirname, "routes");
//
// require("fs").readdirSync(normalizedPath).forEach(function(file) {
// 	require("./routes/" + file);
// });

/**
 * Service for parsing workbook
 */
export default class Parser {
	/**
	 * Constructor of parsing workbook service
	 */
	constructor() {
		this.schemas = [
			require('./sheets/default').default
		];
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
			}
		}
		
		return parsed;
	}
	
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
				if (!knot[path[i]]) {
					knot[path[i]] = {};
				}
				
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
}