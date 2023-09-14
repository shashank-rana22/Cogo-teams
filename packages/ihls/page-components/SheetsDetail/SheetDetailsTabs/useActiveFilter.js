import { useState, useEffect } from 'react';

const orgTypeFilterMapping = {
	importer              : { is_importer: true, is_exporter: false, is_cha: false },
	exporter              : { is_importer: false, is_exporter: true, is_cha: false },
	cha                   : { is_importer: false, is_exporter: false, is_cha: true },
	importer_exporter     : { is_importer: true, is_exporter: true, is_cha: false },
	importer_exporter_cha : {
		is_importer : true,
		is_exporter : true,
		is_cha      : true,
	},
	importer_cha : { is_importer: true, is_exporter: false, is_cha: true },
	exporter_cha : { is_importer: false, is_exporter: true, is_cha: true },
};

const getOrgTypeFilter = (type = null) => {
	if (type) {
		return orgTypeFilterMapping[type];
	}

	return {
		is_importer : undefined,
		is_exporter : undefined,
		is_cha      : undefined,
	};
};

const orgTypeOptions = [
	{ label: 'Importer', value: 'importer' },
	{ label: 'Exporter', value: 'exporter' },
	{ label: 'CHA', value: 'cha' },
	{ label: 'Importer & Exporter', value: 'importer_exporter' },
	{ label: 'Importer & CHA', value: 'importer_cha' },
	{ label: 'Exporter & CHA', value: 'exporter_cha' },
	{ label: 'Importer & Exporter & CHA', value: 'importer_exporter_cha' },
];

const shipmentModeOptions = [
	{ label: 'Air', value: 'AIR' },
	{ label: 'Sea', value: 'SEA' },
];

const useActiveFilters = (fileId = '', activeTab = '') => {
	const [shipmentMode, setShipmentMode] = useState(null);
	const [orgType, setOrgType] = useState(null);

	const [params, setParams] = useState({
		filters: {
			cogo_lead_file_id : fileId,
			...getOrgTypeFilter(orgType),
			shipment_mode     : shipmentMode || undefined,
		},
		sort_by                  : 'id',
		sort_type                : 'asc',
		page                     : 1,
		page_limit               : 20,
		pagination_data_required : true,
	});

	const activeTabFilterMapping = {
		unique_lead: {
			value       : orgType,
			setValue    : setOrgType,
			placeHolder : 'Select Type...',
			options     : orgTypeOptions,
		},
		updated_lead: {
			value       : orgType,
			setValue    : setOrgType,
			placeHolder : 'Select Type...',
			options     : orgTypeOptions,
		},
		shipment_records: {
			value       : shipmentMode,
			setValue    : setShipmentMode,
			placeHolder : 'Select Mode...',
			options     : shipmentModeOptions,
		},
	};

	const resetFilters = () => {
		setParams((prev) => ({
			...prev,
			page      : 1,
			sort_by   : 'id',
			sort_type : 'asc',
			filters   : {
				...(prev || {}).filters,
				shipment_mode: undefined,
				...getOrgTypeFilter(),
			},
		}));
		setShipmentMode(null);
		setOrgType(null);
	};

	const filterInfo = activeTabFilterMapping[activeTab];

	useEffect(() => {
		setParams((prev) => ({
			...prev,
			page    : 1,
			filters : {
				...(prev || {}).filters,
				...(orgType ? getOrgTypeFilter(orgType) : {}),
				shipment_mode: shipmentMode || undefined,
			},
		}));
	}, [orgType, shipmentMode]);

	useEffect(() => {
		resetFilters();
	}, [activeTab]);

	return {
		params,
		setParams,
		filterInfo,
		resetFilters,
	};
};

export default useActiveFilters;
