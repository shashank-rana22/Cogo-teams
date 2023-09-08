import SELECT_AGENTS_KEYS_MAPPING from '../constants/select-agents-keys-mapping';

const { SELECT_ALL, SELECT_ONLY, EXCLUDE_ONLY } = SELECT_AGENTS_KEYS_MAPPING;

const getEditAgentRadioOptions = ({ t = () => {} }) => ([
	{
		name  : SELECT_ALL,
		value : SELECT_ALL,
		label : t('allocation:select_all'),
	},
	{
		name  : SELECT_ONLY,
		value : SELECT_ONLY,
		label : t('allocation:select_only'),
	},
	{
		name  : EXCLUDE_ONLY,
		value : EXCLUDE_ONLY,
		label : t('allocation:exclude_only'),
	},
]);

export default getEditAgentRadioOptions;
