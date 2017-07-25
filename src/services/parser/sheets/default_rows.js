import Insert from './../helpers/insert';

export default {
	description: {
		name: 'default rows',
		sheetName: 'default rows',
		parseWay: 'rows',
		from: 'A',
		// to: 'J'
	},
	rules: {
		1: {
			jsonWay: 'root.my_key',
			insert: Insert.insertString
		},
		2: {
			jsonWay: 'root.my_key1',
			insert: Insert.insertNumber
		},
		3: {
			jsonWay: 'root.my_key2',
			insert: (v) => Insert.insertString(v) === 'Так'
		}
	}
}