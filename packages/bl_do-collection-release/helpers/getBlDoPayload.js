import { isEmpty } from '@cogoport/utils';

import blPayloadConfig from '../configs/blPayloadConfig.json';
import doPayloadConfig from '../configs/doPayloadConfig.json';

export default function getBlDoPayload({ stateProps = {} }) {
	let payloadConfig = {};
	if (stateProps.activeTab === 'bl') {
		payloadConfig = blPayloadConfig;
	} else if (stateProps.activeTab === 'do') {
		payloadConfig = doPayloadConfig;
	}
	const {
		trade_type, page, q, ready_to_collect, ready_to_release,
		inner_tab = '', document_status = '', activeTab = '',
	} = stateProps || {};

	const payload = payloadConfig[inner_tab];

	const {
		filters: commonFilters,
		ready_to_collect_filters, all_status_filter, ready_to_release_filter, ...commonRestPayload
	} = payload.common;

	const {
		filters: shipmentTypeFilters, ...shipmentTypePayload
	} = payload[stateProps.shipment_type][stateProps.trade_type];

	const filters = {
		...commonFilters,
		...shipmentTypeFilters,
		[`${activeTab}_status`]: ['released', 'surrendered'].includes(inner_tab) && document_status
			? [document_status] : commonFilters[`${activeTab}_status`],
		...(ready_to_collect ? ready_to_collect_filters : {}),
		...(ready_to_release ? ready_to_release_filter : all_status_filter),
		...(isEmpty(trade_type) && { trade_type }),
		...(isEmpty(q) && { q }),
	};

	const Formatedpayload = {
		...commonRestPayload,
		...shipmentTypePayload,
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
