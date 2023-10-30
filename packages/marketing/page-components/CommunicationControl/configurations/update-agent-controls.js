import PROVIDER_NUMBER_OPTIONS from '../constants/PROVIDER_NUMBER_OPTIONS.json';

const controls = ({ item = {} }) => [
	{
		name  : 'agent_name',
		label : 'Name',
		type  : 'input',
		span  : 7,
		value : item?.agent_data?.name,
		rules : { required: 'This is required' },
	},
	{
		name  : 'mobile_number',
		label : 'Number',
		type  : 'number',
		span  : 7,
		value : Number(item?.mobile_number),
		rules : { required: 'This is required' },
	},
	{
		name        : 'provider_number',
		label       : 'Provider Number',
		type        : 'select',
		placeholder : 'Select provider number',
		isClearable : true,
		span        : 7,
		value       : item?.provider_number,
		options     : PROVIDER_NUMBER_OPTIONS,
		rules       : { required: 'This is required' },
	},
];
export default controls;
