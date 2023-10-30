import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';

export const SHIPMENTS_TYPES = [
	{ label: 'Shipment', name: 'SHIPMENT', value: 'SHIPMENT' },
	{ label: 'Manual', name: 'MANUAL', value: 'MANUAL' },
];

export const JOB_TYPE_OPTIONS = [
	{
		label : 'Open',
		name  : 'OPEN',
		value : 'OPEN',
	},
	{
		label : 'Operationally Closed',
		name  : 'OPERATIONALLY_CLOSED',
		value : 'OPERATIONALLY_CLOSED',
	},
	{
		label : 'Financially Closed',
		name  : 'FINANCIALLY_CLOSED',
		value : 'FINANCIALLY_CLOSED',
	},
];
export const MILESTONE_TYPES = [
	{ label: 'Initiated', name: 'initiated', value: 'initiated' },
	{ label: 'Cancelled', name: 'cancelled', value: 'cancelled' },
	{ label: 'Completed', name: 'completed', value: 'completed' },
	{ label: 'Vessel Departed', name: 'vesselDeparted', value: 'vesselDeparted' },
	{ label: 'Vessel Arrived', name: 'vesselArrived', value: 'vesselArrived' },
	{ label: 'Cargo Picked Up', name: 'cargoPickedUp', value: 'cargoPickedUp' },
];
export const SERVICE_CATEGORY = [
	{ label: 'Import', name: 'IMPORT', value: 'IMPORT' },
	{ label: 'Export', name: 'EXPORT', value: 'EXPORT' },
	{ label: 'Local', name: 'LOCAL', value: 'LOCAL' },
	{ label: 'Domestic', name: 'DOMESTIC', value: 'DOMESTIC' }];

export const SHIPMENT_TYPES = [
	{ label: 'FCL Freight', name: 'FCL_FREIGHT', value: 'FCL_FREIGHT' },
	{ label: 'LCL Freight', name: 'LCL_FREIGHT', value: 'LCL_FREIGHT' },
	{ label: 'AIR Freight', name: 'AIR_FREIGHT', value: 'AIR_FREIGHT' },
	{
		label : 'Container Transportation',
		name  : 'TRAILER_FREIGHT',
		value : 'TRAILER_FREIGHT',
	},
	{ label: 'FTL Freight', name: 'FTL_FREIGHT', value: 'FTL_FREIGHT' },
	{ label: 'LTL Freight', name: 'LTL_FREIGHT', value: 'LTL_FREIGHT' },
	{ label: 'Rail Haulage', name: 'HAULAGE_FREIGHT', value: 'HAULAGE_FREIGHT' },
	{ label: 'FCL Customs', name: 'FCL_CUSTOMS', value: 'FCL_CUSTOMS' },
	{ label: 'LCL Customs', name: 'LCL_CUSTOMS', value: 'LCL_CUSTOMS' },
	{ label: 'AIR Customs', name: 'AIR_CUSTOMS', value: 'AIR_CUSTOMS' },
];

export const getEntityOptions = () => {
	const filteredEntity = Object.entries(ENTITY_FEATURE_MAPPING).filter(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		([_, value]) => value.feature_supported.includes('cogo_books'),
	);

	const ENTITY_OPTIONS = (filteredEntity || []).map(([key]) => (
		{
			label : key,
			name  : key,
			value : key,
		}
	));

	return ENTITY_OPTIONS;
};
