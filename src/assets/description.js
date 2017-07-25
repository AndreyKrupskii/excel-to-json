export default {
	"description": {
		"name": "description: schema name",
		"sheetName": "description: excel table name",
		"parseWay": "description: parse way, enum: {'cells', 'rows', 'columns'}",
		"from": "description: start knot to parse sheet (require parseWay['rows'|'columns'])",
		"to": "description: end knot to parse sheet (require parseWay['rows'|'columns'])"
	},
	"rules": {
		"A1": {
			"jsonWay": "description: way in future parsed JSON, separated by dot",
			"insert": "description: insert function"
		},
		"A2": {
			"jsonWay": "description: way in future parsed JSON, separated by dot",
			"insert": "description: insert function"
		},
		"A3": {
			"jsonWay": "description: way in future parsed JSON, separated by dot",
			"insert": "description: insert function"
		}
	}
}