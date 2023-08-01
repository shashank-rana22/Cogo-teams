import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const getFormValuesFromData = ({ data }) => {
	if (isEmpty(data)) return {};

	const {
		objective_type = '',
		name = '',
		partner = {},
		channels = [],
		roles = [],
		lifecycle_stages = [],
		stats_details: statsDetails,
		organization_details: organizationDetails,
		service_details: setviceDetails,
		service_requirement_operator,
	} = data;

	const { start_date, end_date, quotation_count, search_count, shipment_count } = statsDetails || {};

	const { country, state, city, pincode, segments } = organizationDetails || {};

	const DEFAULT_FORM_VALUES = {
		generalConfiguration: {
			selectMode      : 'select_all',
			user_ids        : [],
			objective_type,
			name,
			partner,
			channels,
			roles,
			lifecycle_stage : isEmpty(lifecycle_stages) ? undefined : lifecycle_stages[GLOBAL_CONSTANTS.zeroth_index],
		},
		objectiveRequirements: {
			service_requirement_operator,
			stats_details: {
				date_range: {
					startDate : start_date ? new Date(start_date) : undefined,
					endDate   : end_date ? new Date(end_date) : undefined,
				},
				quotation_count,
				search_count,
				shipment_count,
			},
			organization_details: {
				country,
				state,
				city,
				segments,
				pincode: !isEmpty(pincode)
					? pincode.map((item) => ({ id: item?.id, name: item?.postal_code }))
					: undefined,
			},
			service_requirements: setviceDetails,
		},
	};

	return DEFAULT_FORM_VALUES;
};

export default getFormValuesFromData;
