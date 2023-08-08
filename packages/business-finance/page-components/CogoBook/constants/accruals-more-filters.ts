import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';

export const SHIPMENTS_TYPES = [
	{ value: 'SHIPMENT', label: 'Shipment' },
	{ value: 'MANUAL', label: 'Manual' },
];

export const JOB_TYPE_OPTIONS = [
	{
		label : 'Open',
		value : 'OPEN',
	},
	{
		label : ' Operationally Closed ',
		value : 'OPERATIONALLY_CLOSED',
	},
	{
		label : 'Financially Closed',
		value : 'FINANCIALLY_CLOSED',
	},
];
export const MILESTONE_TYPES = [
	{ label: 'Initiated', value: 'initiated' },
	{ label: 'Cancelled', value: 'cancelled' },
	{ label: 'Completed', value: 'completed' },
	{ label: 'Vessel Departed', value: 'vesselDeparted' },
	{ label: 'Vessel Arrived', value: 'vesselArrived' },
	{ label: 'Cargo Picked Up', value: 'cargoPickedUp' },
];
export const SERVICE_CATEGORY = [
	{ label: 'Import', value: 'IMPORT' },
	{ label: 'Export', value: 'EXPORT' },
	{ label: 'Local', value: 'LOCAL' },
	{ label: 'Domestic', value: 'DOMESTIC' }];

export const SHIPMENT_TYPES = [
	{ label: 'FCL Freight', value: 'FCL_FREIGHT' },
	{ label: 'LCL Freight', value: 'LCL_FREIGHT' },
	{ label: 'AIR Freight', value: 'AIR_FREIGHT' },
	{
		label : 'Container Transportation',
		value : 'TRAILER_FREIGHT',
	},
	{ label: 'FTL Freight', value: 'FTL_FREIGHT' },
	{ label: 'LTL Freight', value: 'LTL_FREIGHT' },
	{ label: 'Rail Haulage', value: 'HAULAGE_FREIGHT' },
	{ label: 'FCL Customs', value: 'FCL_CUSTOMS' },
	{ label: 'LCL Customs', value: 'LCL_CUSTOMS' },
	{ label: 'AIR Customs', value: 'AIR_CUSTOMS' },
];

export const getEntityOptions = () => {
	const filteredEntity = Object.entries(ENTITY_FEATURE_MAPPING).filter(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		([_, value]: any) => value.feature_supported.includes('cogo_books'),
	);

	const ENTITY_OPTIONS = (filteredEntity || []).map(([key]: any) => (
		{
			label : key,
			value : key,
		}
	));

	return ENTITY_OPTIONS;
};
