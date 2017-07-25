import Insert from './../helpers/insert';

export default {
	description: {
		name: 'default',
		sheetName: 'default cells',
		parseWay: 'cells'
	},
	rules: {
		A1: {
			jsonWay: 'root.my_key',
			insert: Insert.insertString
		},
		A2: {
			jsonWay: 'root.my_key1',
			insert: Insert.insertNumber
		},
		A3: {
			jsonWay: 'root.my_key2.lol.lol',
			insert: (v) => Insert.insertString(v) === 'Так'
		}
	}
}