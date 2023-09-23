import TEUS_OPTIONS from '../../../../../config/TEUS_OPTIONS.json';

const getAirFreight = ({ organization_id = '', params = {} }) => {
	const freight = [{
		name               : 'location_pairs',
		type               : 'fieldArray',
		noDeleteButtonTill : 1,
		controls           : [
			{
				type: 'async_select',
				params,

				name         : 'origin_location_id',
				label        : 'Origin',
				asyncKey     : 'list_locations',
				grouped      : ['city', 'country'],
				initiallCall : true,
				placeholder  : 'Search location...',
				rules        : { required: 'Origin is required' },
				span         : 3,
			},
			{
				type         : 'async_select',
				params,
				name         : 'destination_location_id',
				initiallCall : true,
				asyncKey     : 'list_locations',
				grouped      : ['city', 'country'],
				label        : 'Destination',
				placeholder  : 'Search location...',
				rules        : { required: 'Destination is required' },
				span         : 3,
			},
			{
				name        : 'total_teus',
				label       : 'Total Kgs (yearly)',
				type        : 'select',
				placeholder : 'Kgs',
				options     : TEUS_OPTIONS,
				rules       : { required: 'Total Kgs is required' },
				span        : 3,
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
	return freight;
};
export default getAirFreight;
