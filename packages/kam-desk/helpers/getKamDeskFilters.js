import { isEmpty } from '@cogoport/utils';

import tabPayload, { CRITICAL_TABS } from '../config/SHIPMENTS_PAYLOAD';

import getAdditionalMethods from './getAdditionalMethods';

const KEY_MAPPING = {
	eta : 'schedule_arrival',
	etd : 'schedule_departure',
};

export default function getKamDeskFilters({ filters, kamDeskContextValues }) {
	const { activeTab, shipmentType, stepperTab } = kamDeskContextValues || {};
	const { criticalOn, date_type, dateRange, startDate, endDate, tags, ...restFilters } = filters || {};

	let tabwiseFilters = {};

	if (stepperTab === 'export_import' && ['fcl_freight', 'lcl_freight'].includes(shipmentType)) {
		const export_tabs = Object.keys(tabPayload?.[shipmentType]?.export || {});
		const import_tabs = Object.keys(tabPayload?.[shipmentType]?.import || {});

		if (export_tabs?.includes(activeTab)) {
			tabwiseFilters = { ...tabwiseFilters, ...tabPayload?.[shipmentType]?.export?.[activeTab] };
		}

		if (import_tabs?.includes(activeTab)) {
			tabwiseFilters = { ...tabwiseFilters, ...tabPayload?.[shipmentType]?.import?.[activeTab] };
		}
	} else {
		tabwiseFilters = shipmentType === 'all' ? tabPayload.all?.[activeTab]
			: tabPayload?.[shipmentType]?.[stepperTab]?.[activeTab];
	}

	let finalFilters = { ...(tabwiseFilters || {}), ...restFilters };

	if (!isEmpty(tags)) {
		finalFilters = { ...finalFilters, tags: [tags] };
	}

	if (criticalOn) {
		finalFilters = { ...finalFilters, ...(CRITICAL_TABS?.[shipmentType]?.[stepperTab]?.[activeTab] || {}) };
	}

	if (dateRange && startDate && date_type && endDate) {
		finalFilters[`${KEY_MAPPING[date_type]}_greater_than`] = startDate;
		finalFilters[`${KEY_MAPPING[date_type]}_less_than`] = endDate;
	}

	if (shipmentType === 'fcl_freight' && stepperTab === 'export_import') {
		if (activeTab === 'update_container_details') {
			finalFilters.trade_type = ['export'];
		} else if (activeTab === 'confirm_with_shipper') {
			finalFilters.trade_type = ['import'];
		} else if (['document_approval', 'vessel_departed',
			'vessel_arrived', 'completed', 'cancelled'].includes(activeTab)) {
			finalFilters.trade_type = ['import', 'export'];
		}
	}

	if (shipmentType === 'lcl_freight' && stepperTab === 'export_import') {
		if (activeTab === 'bl_document_approval') {
			finalFilters.trade_type = ['export'];
		} else if (activeTab === 'do_document_approval') {
			finalFilters.trade_type = ['import'];
		} else if (['vessel_departed', 'vessel_arrived',
			'completed', 'cancelled'].includes(activeTab)) {
			finalFilters.trade_type = ['import', 'export'];
		}
	}

	return {
		filters            : finalFilters,
		additional_methods : getAdditionalMethods({ shipmentType, stepperTab, activeTab }),
	};
}
