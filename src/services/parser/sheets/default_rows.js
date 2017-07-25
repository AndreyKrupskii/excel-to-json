import Insert from './../helpers/insert';

export default {
	description: {
		name: 'default rows',
		sheetName: 'default rows',
		parseWay: 'rows',
		from: 1,
		// to: 5
	},
	rules: {
		'A': {
			jsonWay: 'root.my_key',
			insert: Insert.insertString
		},
		'B': {
			jsonWay: 'root.my_key1',
			insert: Insert.insertNumber
		},
		'C': {
			jsonWay: 'root.my_key2',
			insert: (v) => Insert.insertString(v) === 'Так'
		}
	}
}