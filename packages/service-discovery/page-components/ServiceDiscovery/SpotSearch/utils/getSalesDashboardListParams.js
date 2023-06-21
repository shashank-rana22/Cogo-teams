import GLOBALS from '@cogoport/globalization/constants/globals';

import filterServiceMapping from '../configurations/filter-service-mapping.json';

const getSalesDashboardListParams = (
	type,
	filterValues = {},
	otherParams = {},
	api = null,
	user_id = undefined,
	user_profile = {},
) => {
	const isAdmin = (user_profile?.partner?.user_role_ids || []).some(
		(userRoleId) => [
			GLOBALS.uuid.super_admin_id, GLOBALS.uuid.admin_id, GLOBALS.uuid.superadmin_id].includes(userRoleId),
	);

	if (
		type === 'sales_shipments'
		|| type === 'supply_shipments'
		|| type === 'okam_booking'
		|| type === 'okam_booking_procurement'
		|| api.includes('list_shipments')
	) {
		const extraParams =	type === 'sales_shipments'
			? { sales_dashboard_stats_required: true }
			: {};

		const {
			serial_id,
			importer_exporter_id,
			color_code,
			partner_id,
			bl_number,
			search_type,
			primary_service,
			shipment_type,
			is_all_services_allocated,
			rate_status_missing,
			service_provider_confirmation_delayed_by,
			service_state,
			agent_id,
			outSideServiceFilters = {},
			state,
			...rest
		} = filterValues || {};
		const filters = {
			filters: {
				[filterServiceMapping[shipment_type]]: shipment_type
					? {
						...rest[filterServiceMapping[shipment_type]],
						trade_type: rest.trade_type,
					}
					: undefined,
				serial_id,
				state,
				importer_exporter_id,
				partner_id,
				shipment_type,
				search_type,
				primary_service,
				color_code,
				agent_id,
				is_all_services_allocated,
				rate_status_missing,
				service_provider_confirmation_delayed_by,
				service_state,
				...outSideServiceFilters,
				bl_detail: { bl_number },
				...rest,
			},
			...extraParams,
			...otherParams,
		};
		return filters || {};
	}
	if (type === 'enquiries') {
		return {
			filters                          : { ...filterValues },
			...otherParams,
			negotiation_stats_required       : true,
			created_by_user_details_required : true,
			quotation_stats_required         : true,
		};
	}
	if (type === 'quotations') {
		const { selected_source = [] } = filterValues || {};

		return {
			filters: {
				...filterValues,
				...(selected_source.length > 0 && {
					source          : selected_source,
					selected_source : undefined,
				}),
			},
			...otherParams,
			quotation_sent_to_details_required : true,
			quotation_stats_required           : true,
		};
	}
	if (type === 'coverage_dashboard') {
		return {
			filters                 : { ...filterValues },
			...otherParams,
			coverage_stats_required : true,
		};
	}
	if (type === 'supply_organizations' || type === 'sales_organizations') {
		const account_type = type === 'sales_organizations' ? 'importer_exporter' : 'service_provider';
		const extraParams =	type === 'sales_organizations'
			? { kyc_stats_required: true }
			: { services_stats_required: true };
		return {
			filters: { ...filterValues, account_type },
			...otherParams,
			...extraParams,
		};
	}
	if (type === 'supply_enquiries') {
		return { filters: { ...filterValues }, ...otherParams };
	}
	if (type === 'shipment_allocation') {
		return {
			filters                   : { ...filterValues },
			...otherParams,
			allocation_stats_required : true,
		};
	}
	if (type === 'spot_searches') {
		const { rates_availability, ...rest } = filterValues;
		const r_a = rates_availability ? { [rates_availability]: true } : {};
		return {
			filters                          : { ...rest, ...r_a },
			...otherParams,
			stats_required                   : true,
			created_by_user_details_required : true,
		};
	}
	if (type === 'services' || type === 'upcoming_shipments') {
		return {
			filters             : filterValues,
			...otherParams,
			agent_data_required : true,
			color_code_required : true,
			stats_required      : true,
		};
	}
	if (type === 'overdue') {
		return {
			filters             : filterValues,
			...otherParams,
			color_code_required : true,
			stats_required      : true,
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
	if (type === 'documents') {
		const filtersForDocuments = {
			upload_airway_bill: {
				task                : 'upload_airway_bill',
				air_freight_service : { state: 'cargo_handed_over_at_origin' },
			},
			upload_booking_note: {
				task                : 'upload_booking_note',
				fcl_freight_service : { state: 'confirmed_by_service_provider' },
			},
			upload_draft_bill_of_lading: {
				task                : 'upload_draft_bill_of_lading',
				fcl_freight_service : { state: 'confirmed_by_service_provider' },
			},
			upload_bill_of_lading: {
				task                : 'upload_bill_of_lading',
				fcl_freight_service : { state: 'vessel_departed' },
			},
			upload_invoice: {
				task  : 'upload_invoice',
				state : 'confirmed_by_importer_exporter',
			},
			upload_packing_list: {
				task  : 'upload_packing_list',
				state : 'awaiting_shipment_received',
			},
			upload_si: { task: 'upload_si' },
		};
		const isBookingAgent = {};
		if (filterValues?.booking_agent_id) {
			isBookingAgent.booking_agent_id = filterValues.booking_agent_id;
		}
		return {
			filters: {
				...filtersForDocuments[filterValues?.task],
				...isBookingAgent,
			},
			...otherParams,
			stats_required: true,
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
	if (type === 'allocation_requests') {
		return {
			filters: {
				...filterValues,
				service_id: [
					...(filterValues?.service_id || []),
					...(filterValues?.partner_service_id || []),
				],
				partner_service_id: undefined,
			},
			...otherParams,
		};
	}

	return { filters: filterValues, ...otherParams };
};

export default getSalesDashboardListParams;
