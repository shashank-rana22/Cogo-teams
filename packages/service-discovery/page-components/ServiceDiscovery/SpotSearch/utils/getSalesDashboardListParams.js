import getGeoConstants from '@cogoport/globalization/constants/geo';
import { isEmpty } from '@cogoport/utils';

import getLocationObjKey from './getLocationObjKey';

const geo = getGeoConstants();

const getSalesDashboardListParams = (
	type,
	filterValues = {},
	otherParams = {},
	user_profile = {},
	user_id = '',
) => {
	const isAdmin = (user_profile?.partner?.user_role_ids || []).some(
		(userRoleId) => [geo.uuid.super_admin_id, geo.uuid.admin_id, geo.uuid.tech_super_admin_id].includes(userRoleId),
	);

	if (type === 'most_searched') {
		return {
			filters: { ...filterValues },
			...otherParams,
		};
	}
	if (type === 'most_booked') {
		return {
			filters : { ...filterValues },
			...otherParams,
			sort_by : 'booking_count',
		};
	}
	if (type === 'spot_searches') {
		const { rates_availability, origin_location_id, destination_location_id, ...rest } = filterValues;
		const locationFilter = {
			[rest.search_type]: {
				...origin_location_id ? { [getLocationObjKey(rest.search_type, 'origin')]: origin_location_id } : {},
				...destination_location_id
					? { [getLocationObjKey(rest.search_type, 'destination')]: destination_location_id } : {},
			},
		};
		const r_a = rates_availability ? { [rates_availability]: true } : {};
		return {
			filters                          : { ...rest, ...r_a, ...locationFilter },
			...otherParams,
			stats_required                   : true,
			created_by_user_details_required : true,
		};
	}
	if (type === 'quotations') {
		const { selected_source = [], origin_location_id, destination_location_id, ...rest } = filterValues || {};
		const locationFilter = {
			[rest.primary_service]: {
				...origin_location_id
					? { [getLocationObjKey(rest.primary_service, 'origin')]: origin_location_id } : {},
				...destination_location_id
					? { [getLocationObjKey(rest.primary_service, 'destination')]: destination_location_id } : {},
			},
		};

		return {
			filters: {
				...(!isEmpty(selected_source) && {
					source          : selected_source,
					selected_source : undefined,
				}),
				...rest,
				...locationFilter,
			},
			...otherParams,
			quotation_sent_to_details_required : true,
			quotation_stats_required           : true,
		};
	}
	if (type === 'saved_for_later') {
		const { selected_source = [], origin_location_id, destination_location_id, ...rest } = filterValues || {};
		const locationFilter = {
			[rest.primary_service]: {
				...origin_location_id
					? { [getLocationObjKey(rest.primary_service, 'origin')]: origin_location_id } : {},
				...destination_location_id
					? { [getLocationObjKey(rest.primary_service, 'destination')]: destination_location_id } : {},
			},
		};

		return {
			filters: {
				...(!isEmpty(selected_source) && {
					source          : selected_source,
					selected_source : undefined,
				}),
				...rest,
				...locationFilter,
				state                   : 'save_for_later',
				is_email_quotation_sent : undefined,
			},
			...otherParams,
			quotation_sent_to_details_required : true,
			quotation_stats_required           : true,
		};
	}

	if (type === 'superAdmins') {
		return {
			stats_types : ['booking_agent_stats'],
			filters     : {
				created_at_greater_than : filterValues?.datesRange?.startDate,
				created_at_less_than    : filterValues?.datesRange?.endDate,
			},
		};
	}

	if (['disliked_rates', 'missing_rates'].includes(type)) {
		return {
			filters: {
				...filterValues,
				performed_by_id: isAdmin ? undefined : user_id,
			},
			...otherParams,
		};
	}

	return { filters: filterValues, ...otherParams };
};

export default getSalesDashboardListParams;
