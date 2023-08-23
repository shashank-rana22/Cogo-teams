export function getAdditionalPayloadForViewType(viewType) {
	const commonPayload = {
		supply_stats_required     : false,
		sales_stats_required      : false,
		show_agent_activity_graph : false,
		filters                   : {},
	};

	const viewTypePayloads = {
		default: {
			sales_stats_required: true,
		},
		supply: {
			supply_stats_required: true,
		},
		sales: {
			sales_stats_required: true,
		},
		support: {
			sales_stats_required: true,
		},
		cp_support: {
			sales_stats_required: true,
		},
		support_admin       : {},
		cogoone_admin       : {},
		supply_admin        : {},
		shipment_specialist : {},
	};

	return {
		...commonPayload,
		...viewTypePayloads[viewType] || {},
	};
}
