import TEUS_OPTIONS from '../../../../../config/TEUS_OPTIONS.json';

const tradeOptions = [
	{
		value : 'import',
		label : 'Import',
	},
	{
		value : 'export',
		label : 'Export',
	},
];
const getAirCustoms = ({ organization_id = '', params = {} }) => {
	const customs = [{
		name               : 'location_pairs',
		type               : 'fieldArray',
		noDeleteButtonTill : 1,
		controls           : [
			{
				span         : 3,
				type         : 'select',
				name         : 'location_id',
				params,
				label        : 'Location',
				grouped      : ['city', 'country'],
				placeholder  : 'Search location...',
				rules        : { required: 'Origin is required' },
				initiallCall : true,
				asyncKey     : 'list_locations',
			},
			{
				span        : 3,
				type        : 'select',
				name        : 'trade_type',
				label       : 'Trade Type',
				placeholder : 'Select',
				options     : tradeOptions,
				rules       : { required: 'Trade Type is required' },
			},
			{
				span        : 3,
				name        : 'total_teus',
				label       : 'Total Kgs (yearly)',
				type        : 'select',
				placeholder : 'Kgs',
				options     : TEUS_OPTIONS,
				rules       : { required: 'Total Kgs is required' },
			},
			{
				type         : 'async_select',
				name         : 'user_id',
				label        : 'Select User Name',
				asyncKey     : 'list_organization_users',
				labelKey     : 'name',
				span         : 3,
				initiallCall : true,

				params: {
					filters: {
						organization_id,
					},
				},
			},
		],
	}];
	return customs;
};
export default getAirCustoms;
