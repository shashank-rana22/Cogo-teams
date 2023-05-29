import payloadConfig from '../configs/payloadConfig.json';

export default function getBlDoPayload({ stateProps = {} }) {
	const { trade_type, page, q } = stateProps;

	const payload = payloadConfig[stateProps.inner_tab];

	const { filters: commonFilters, ...commonRestPayload } = payload.common;

	const {
		filters: shipmentTypeFilters, ...shipmentTypePayload
	} = payload[stateProps.shipment_type][stateProps.trade_type];

	const { filters: bldoFilters, ...bldoPayload } = payload[stateProps.activeTab];

	return ({
		filters: {
			...commonFilters,
			...shipmentTypeFilters,
			...bldoFilters,
			trade_type : trade_type.length ? trade_type : undefined,
			q          : q.length ? q : undefined,
		},
		...commonRestPayload,
		...shipmentTypePayload,
		...bldoPayload,
		sort_by    : 'serial_id',
		sort_type  : 'desc',
		page_limit : 10,
		page,
	});
}
