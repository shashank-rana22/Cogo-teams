import SELECT_AGENTS_KEYS_MAPPING from '../constants/select-agents-keys-mapping';

const { SELECT_ALL, SELECT_ONLY, EXCLUDE_ONLY } = SELECT_AGENTS_KEYS_MAPPING;

const EDIT_AGENTS_RADIO_OPTIONS = [
	{
		name  : SELECT_ALL,
		value : SELECT_ALL,
		label : 'Select All',
	},
	{
		name  : SELECT_ONLY,
		value : SELECT_ONLY,
		label : 'Select Only',
	},
	{
		name  : EXCLUDE_ONLY,
		value : EXCLUDE_ONLY,
		label : 'Exclude Only',
	},
];

export default EDIT_AGENTS_RADIO_OPTIONS;
