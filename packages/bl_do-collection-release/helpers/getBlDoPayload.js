import payloadConfig from '../configs/payloadConfig.json';

export default function getBlDoPayload({ stateProps = {} }) {
	const { trade_type, page, q, ready_to_collect, ready_to_release } = stateProps;

	const payload = payloadConfig[stateProps.inner_tab];

	const { filters: commonFilters, ready_to_collect_filters, ...commonRestPayload } = payload.common;

	const {
		filters: shipmentTypeFilters, ...shipmentTypePayload
	} = payload[stateProps.shipment_type][stateProps.trade_type];

	const { filters: bldoFilters, ready_to_release_filter, ...bldoPayload } = payload[stateProps.activeTab];

	const filters = {
		...commonFilters,
		...shipmentTypeFilters,
		...(ready_to_collect ? ready_to_collect_filters : {}),
		...(ready_to_release ? ready_to_release_filter : {}),
		...(ready_to_collect || ready_to_release ? {} : bldoFilters),
		trade_type : trade_type.length ? trade_type : undefined,
		q          : q.length ? q : undefined,
	};

	const Formatedpayload = {
		...commonRestPayload,
		...shipmentTypePayload,
		...bldoPayload,
		sort_by    : 'serial_id',
		sort_type  : 'desc',
		page_limit : 10,
		page,
	};

	return {
		filters,
		...Formatedpayload,
	};
}
