import PROVIDER_NUMBER_OPTIONS from '../constants/PROVIDER_NUMBER_OPTIONS.json';

const controls = ({ itemVal = {}, setItemval = () => {} }) => [
	{
		name        : 'email_id',
		label       : 'Enter Email ID',
		type        : 'async_select',
		placeholder : 'Select Email',
		asyncKey    : 'partner_users_ids',
		isClearable : 'true',
		labelKey    : 'email',
		initialCall : true,
		onChange    : (_v, obj) => { setItemval(obj); },
		span        : 7,
		rules       : { required: 'This is required' },
	},
	{
		name     : 'agent_name',
		label    : 'Agent Name',
		type     : 'input',
		value    : (itemVal?.name),
		disabled : true,
		span     : 7,
		rules    : { required: 'This is required' },
	},
	{
		name        : 'mobile_number',
		label       : 'Enter Number',
		type        : 'number',
		placeholder : 'Enter mobile number',
		value       : (itemVal?.mobile_number),
		span        : 7,
		rules       : { required: 'This is required' },
	},
	{
		name        : 'provider_number',
		label       : 'Provider Number',
		type        : 'select',
		placeholder : 'Select provider number',
		isClearable : true,
		span        : 7,
		options     : PROVIDER_NUMBER_OPTIONS,
		rules       : { required: 'This is required' },
	},
];
export default controls;
