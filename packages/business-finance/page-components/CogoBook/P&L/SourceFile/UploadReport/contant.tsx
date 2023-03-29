import { IcMEdit, IcMInfo, IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';

export const stepperItems = [
	{ title: 'Revenue Bifurcation', key: 'revenue' },
	{ title: 'Salaries Bifurcation', key: 'salaries' },
	{ title: 'Review Details', key: 'review_details' },
];

export 	const getColumn = [
	{
		id            : '1',
		label         : 'Shipment ID Volume Ratio',
		iconInfo      : <IcMInfo />,
		iconArrowUp   : <IcMArrowRotateUp />,
		iconArrowDown : <IcMArrowRotateDown />,
	},
	{
		id            : '2',
		label         : 'Shipment ID Value Ratio',
		iconInfo      : <IcMInfo />,
		iconArrowUp   : <IcMArrowRotateUp />,
		iconArrowDown : <IcMArrowRotateDown />,
	},
];

export 	const getColumnSalary = [
	{
		id            : '1',
		label         : 'Salaries & Rent Volume Ratio',
		iconInfo      : <IcMInfo />,
		iconArrowUp   : <IcMArrowRotateUp />,
		iconArrowDown : <IcMArrowRotateDown />,
	},
	{
		id            : '2',
		label         : 'Salaries & Rent Value Ratio',
		iconInfo      : <IcMInfo />,
		iconArrowUp   : <IcMArrowRotateUp />,
		iconArrowDown : <IcMArrowRotateDown />,
	},
];

export const getColumnReview = [
	{
		id            : '1',
		label         : 'Shipment ID Volume Ratio',
		iconInfo      : <IcMInfo />,
		iconArrowUp   : <IcMArrowRotateUp />,
		iconArrowDown : <IcMArrowRotateDown />,
	},
	{
		id            : '2',
		label         : 'Shipment ID Value Ratio',
		iconInfo      : <IcMInfo />,
		iconArrowUp   : <IcMArrowRotateUp />,
		iconArrowDown : <IcMArrowRotateDown />,
	},
	{
		id            : '3',
		label         : 'Salaries & Rent Bifurcation',
		iconInfo      : <IcMInfo />,
		iconArrowUp   : <IcMArrowRotateUp />,
		iconArrowDown : <IcMArrowRotateDown />,
	},
];

export const getAllShipment = [{
	id    : '1',
	label : 'Ocean',
	icon  : <IcMEdit />,
},
{
	id    : '2',
	label : 'Air',
	icon  : <IcMEdit />,
},
{
	id    : '3',
	label : 'Surface',
	icon  : <IcMEdit />,
},
{
	id    : '4',
	label : 'Rail',
	icon  : <IcMEdit />,
},
{
	id    : '5',
	label : 'Projects',
	icon  : <IcMEdit />,
},
{
	id    : '6',
	label : 'Agents',
	icon  : <IcMEdit />,
},

];

export const getOceanData = (sourceFileData, volume, volumeAir, volumeSurface, volumeRail) => {
	const { ocean, air, surface, rail } = sourceFileData?.data || {};

	const {
		fclImportVolume, fclExportVolume,
		lclImportVolume, lclExportVolume,
		oceanCustomVolume, totalVolume,
	} = ocean || {};

	const {
		totalAirVolume,
	} = air || {};

	const {
		totalSurfaceVolume,
	} = surface || {};

	const { railDomesticVolume } = rail || {};

	const Total = (volume[0] || totalVolume) + (volumeAir[0] || totalAirVolume)
	+ (volumeSurface[0] || totalSurfaceVolume) + (volumeRail[0] || railDomesticVolume);

	const totalVolumePer = ((volume[0] || totalVolume) / Total) * 100;
	const fclExportVolumePer = ((volume[1] || fclExportVolume) / (volume[0] || totalVolume)) * 100;
	const fclImportVolumePer = ((volume[2] || fclImportVolume) / (volume[0] || totalVolume)) * 100;
	const lclExportVolumePer = ((volume[3] || lclExportVolume) / (volume[0] || totalVolume)) * 100;
	const lclImportVolumePer = ((volume[4] || lclExportVolume) / (volume[0] || totalVolume)) * 100;
	const oceanCustomVolumePer = ((volume[5] || lclExportVolume) / (volume[0] || totalVolume)) * 100;

	return [
		{ name: 'Total', value: `${volume[0] || totalVolume} (${totalVolumePer.toFixed(2)}%)` || '---' },
		{ name: 'FCL Exports', value: `${volume[1] || fclExportVolume} (${fclExportVolumePer.toFixed(2)}%)` || '---' },
		{ name: 'FCL Imports', value: `${volume[2] || fclImportVolume} (${fclImportVolumePer.toFixed(2)}%)` || '---' },
		{ name: 'LCL Exports', value: `${volume[3] || lclExportVolume} (${lclExportVolumePer.toFixed(2)}%)` || '---' },
		{ name: 'LCL Imports', value: `${volume[4] || lclImportVolume} (${lclImportVolumePer.toFixed(2)}%)` || '---' },
		{ name: 'Customs', value: `${volume[5] || oceanCustomVolume} (${oceanCustomVolumePer.toFixed(2)}%)` || '---' },
	];
};

export const getOceanDataValue = (
	sourceFileData,
	value,
	valueAir,
	valueSurface,
	valueRail,
) => {
	const { ocean, air, surface, rail } = sourceFileData?.data || {};
	const {
		fclImportValue, fclExportValue,
		lclImportValue, lclExportValue,
		oceanCustomValue, totalValue,
	} = ocean || {};
	const {
		totalAirValue,
	} = air || {};

	const {
		totalSurfaceValue,
	} = surface || {};

	const { railDomesticValue } = rail || {};

	const Total = (value[0] || totalValue) + (valueAir[0] || totalAirValue)
	+ (valueSurface[0] || totalSurfaceValue) + (valueRail[0] || railDomesticValue);

	const totalPer = ((value[0] || totalValue) / Total) * 100;
	const fclExportValuePer = ((value[1] || fclExportValue) / (value[0] || totalValue)) * 100;
	const fclImportValuePer = ((value[2] || fclImportValue) / (value[0] || totalValue)) * 100;
	const lclExportValuePer = ((value[3] || lclExportValue) / (value[0] || totalValue)) * 100;
	const lclImportValuePer = ((value[4] || lclImportValue) / (value[0] || totalValue)) * 100;
	const oceanCustomValuePer = ((value[5] || oceanCustomValue) / (value[0] || totalValue)) * 100;

	return [
		{ name: 'Total', value: `${(value[0] || totalValue)} (${totalPer.toFixed(2)}%)` || '---' },
		{ name: 'FCL Exports', value: `${(value[1] || fclExportValue)} (${fclExportValuePer.toFixed(2)}%)` || '---' },
		{ name: 'FCL Imports', value: `${(value[2] || fclImportValue)} (${fclImportValuePer.toFixed(2)}%)` || '---' },
		{ name: 'LCL Exports', value: `${(value[3] || lclExportValue)} (${lclExportValuePer.toFixed(2)}%)` || '---' },
		{ name: 'LCL Imports', value: `${(value[4] || lclImportValue)} (${lclImportValuePer.toFixed(2)}%)` || '---' },
		{ name: 'Customs', value: `${(value[5] || oceanCustomValue)} (${oceanCustomValuePer.toFixed(2)}%)` || '---' },
	];
};

export const getAirData = (
	sourceFileData,
	volume,
	volumeAir,
	volumeSurface,
	volumeRail,
) => {
	const { ocean, air, surface, rail } = sourceFileData?.data || {};
	const {
		airExportVolume, airImportVolume,
		airCustomVolume, totalAirVolume,
	} = air || {};

	const {
		totalVolume,
	} = ocean || {};

	const {
		totalSurfaceVolume,
	} = surface || {};

	const { railDomesticVolume } = rail || {};

	const Total = (volume[0] || totalVolume) + (volumeAir[0] || totalAirVolume)
	+ (volumeSurface[0] || totalSurfaceVolume) + (volumeRail[0] || railDomesticVolume);

	const totalPer = ((volumeAir[0] || totalAirVolume) / Total) * 100;
	const airExportVolumePer = ((volumeAir[1] || airExportVolume) / (volumeAir[0] || totalAirVolume)) * 100;
	const airImportVolumePer = ((volumeAir[2] || airImportVolume) / (volumeAir[0] || totalAirVolume)) * 100;
	const airCustomVolumePer = ((volumeAir[3] || airCustomVolume) / (volumeAir[0] || totalAirVolume)) * 100;

	return [
		{ name: 'Total', value: `${(volumeAir[0] || totalAirVolume)} (${totalPer.toFixed(2)}%)` || '---' },
		{
			name  : 'Air Exports',
			value : `${(volumeAir[1] || airExportVolume)} (${airExportVolumePer.toFixed(2)}%)` || '---',
		},
		{
			name  : 'Air Imports',
			value : `${(volumeAir[2] || airImportVolume)} (${airImportVolumePer.toFixed(2)}%)` || '---',
		},
		{
			name  : 'Air Customs',
			value : `${(volumeAir[3] || airCustomVolume)} (${airCustomVolumePer.toFixed(2)}%)` || '---',
		},
	];
};

export const getAirDataValue = (
	sourceFileData,
	value,
	valueAir,
	valueSurface,
	valueRail,
) => {
	const { ocean, air, surface, rail } = sourceFileData?.data || {};
	const {
		airExportValue, airImportValue,
		airCustomValue, totalAirValue,
	} = air || {};

	const {
		totalValue,
	} = ocean || {};

	const {
		totalSurfaceValue,
	} = surface || {};

	const { railDomesticValue } = rail || {};

	const Total = (value[0] || totalValue) + (valueAir[0] || totalAirValue)
	+ (valueSurface[0] || totalSurfaceValue) + (valueRail[0] || railDomesticValue);

	const totalPer = ((valueAir[0] || totalAirValue) / Total) * 100;
	const airExportValuePer = ((valueAir[1] || airExportValue) / (valueAir[0] || totalAirValue)) * 100;
	const airImportValuePer = ((valueAir[2] || airImportValue) / (valueAir[0] || totalAirValue)) * 100;
	const airCustomValuePer = ((valueAir[3] || airCustomValue) / (valueAir[0] || totalAirValue)) * 100;

	return [
		{ name: 'Total', value: `${(valueAir[0] || totalAirValue)} (${totalPer.toFixed(2)}%)` || '---' },
		{
			name  : 'Air Exports',
			value : `${(valueAir[1] || airExportValue)} (${airExportValuePer.toFixed(2)}%)` || '---',
		},
		{
			name  : 'Air Imports',
			value : `${(valueAir[2] || airImportValue)} (${airImportValuePer.toFixed(2)}%)` || '---',
		},
		{
			name  : 'Air Customs',
			value : `${(valueAir[3] || airCustomValue)} (${airCustomValuePer.toFixed(2)}%)` || '---',
		},
	];
};

export const getSurfaceData = (
	sourceFileData,
	volume,
	volumeAir,
	volumeSurface,
	volumeRail,
) => {
	const { ocean, air, surface, rail } = sourceFileData?.data || {};

	const {
		ltlVolume, ftlVolume, totalSurfaceVolume,
	} = surface || {};

	const {
		totalAirVolume,
	} = air || {};

	const {
		totalVolume,
	} = ocean || {};

	const { railDomesticVolume } = rail || {};

	const Total = (volume[0] || totalVolume) + (volumeAir[0] || totalAirVolume)
	+ (volumeSurface[0] || totalSurfaceVolume) + (volumeRail[0] || railDomesticVolume);

	const totalPer = ((volume[0] || totalSurfaceVolume) / Total) * 100;
	const FTLVolumePer = ((volumeSurface[1] || ftlVolume) / (volumeSurface[0] || totalSurfaceVolume)) * 100;
	const LTLVolumePer = ((volumeSurface[2] || ltlVolume) / (volumeSurface[0] || totalSurfaceVolume)) * 100;

	return [
		{ name: 'Total', value: `${(volumeSurface[0] || totalSurfaceVolume)} (${totalPer.toFixed(2)}%)` || '---' },
		{ name: 'FTL', value: `${(volumeSurface[1] || ftlVolume)} (${FTLVolumePer.toFixed(2)}%)` || '---' },
		{ name: 'LTL', value: `${(volumeSurface[2] || ltlVolume)} (${LTLVolumePer.toFixed(2)}%)` || '---' },
	];
};

export const getSurfaceDataValue = (
	sourceFileData,
	value,
	valueAir,
	valueSurface,
	valueRail,
) => {
	const { ocean, air, surface, rail } = sourceFileData?.data || {};
	const {
		ltlValue, ftlValue, totalSurfaceValue,
	} = surface || {};

	const {
		totalAirValue,
	} = air || {};

	const {
		totalValue,
	} = ocean || {};

	const { railDomesticValue } = rail || {};

	const Total = (value[0] || totalValue) + (valueAir[0] || totalAirValue)
	+ (valueSurface[0] || totalSurfaceValue) + (valueRail[0] || railDomesticValue);

	const totalPer = ((valueSurface[0] || totalSurfaceValue) / Total) * 100;
	const FTLValuePer = ((valueSurface[1] || ftlValue) / (valueSurface[0] || totalSurfaceValue)) * 100;
	const LTLValuePer = ((valueSurface[2] || ltlValue) / (valueSurface[0] || totalSurfaceValue)) * 100;
	return [
		{ name: 'Total', value: `${(valueSurface[0] || totalSurfaceValue)} (${totalPer.toFixed(2)}%)` || '---' },
		{ name: 'FTL', value: `${(valueSurface[1] || ftlValue)} (${FTLValuePer.toFixed(2)}%)` || '---' },
		{ name: 'LTL', value: `${(valueSurface[2] || ltlValue)} (${LTLValuePer.toFixed(2)}%)` || '---' },
	];
};

export const getRailData = (
	sourceFileData,
	volume,
	volumeAir,
	volumeSurface,
	volumeRail,
) => {
	const { ocean, air, surface, rail } = sourceFileData?.data || {};
	const {
		totalSurfaceVolume,
	} = surface || {};

	const {
		totalAirVolume,
	} = air || {};

	const {
		totalVolume,
	} = ocean || {};

	const { railDomesticVolume } = rail || {};

	const Total = (volume[0] || totalVolume) + (volumeAir[0] || totalAirVolume)
	+ (volumeSurface[0] || totalSurfaceVolume) + (volumeRail[0] || railDomesticVolume);

	const totalPer = ((volumeRail[0] || railDomesticVolume) / Total) * 100;
	const railVolumePer = ((volumeRail[1] || railDomesticVolume) / (volumeRail[0] || railDomesticVolume)) * 100;

	return [
		{ name: 'Total', value: `${(volumeRail[0] || railDomesticVolume)} (${totalPer.toFixed(2)}%)` || '---' },
		{ name: 'Domestic', value: `${(volumeRail[1] || railDomesticVolume)} (${railVolumePer.toFixed(2)}%)` || '---' },
	];
};

export const getRailDataValue = (
	sourceFileData,
	value,
	valueAir,
	valueSurface,
	valueRail,
) => {
	const { ocean, air, surface, rail } = sourceFileData?.data || {};
	const {
		totalSurfaceValue,
	} = surface || {};

	const {
		totalAirValue,
	} = air || {};

	const {
		totalValue,
	} = ocean || {};

	const { railDomesticValue } = rail || {};

	const Total = (value[0] || totalValue) + (valueAir[0] || totalAirValue)
	+ (valueSurface[0] || totalSurfaceValue) + (valueRail[0] || railDomesticValue);

	const totalPer = ((valueRail[0] || railDomesticValue) / Total) * 100;
	const railValuePer = ((valueRail[1] || railDomesticValue) / (valueRail[0] || railDomesticValue)) * 100;

	return [
		{ name: 'Total', value: `${(valueRail[0] || railDomesticValue)} (${totalPer.toFixed(2)}%)` || '---' },
		{ name: 'Domestic', value: `${(valueRail[1] || railDomesticValue)} (${railValuePer.toFixed(2)}%)` || '---' },
	];
};

export const getProjectData = [
	{ name: 'Total', value: '---' },
	{ name: 'SaaS', value: '---' },
	{ name: 'Insurance', value: '---' },
	{ name: 'FinTech', value: '---' },
];

export const getAgentsData = [
	{ name: 'Total', value: '--- ' },
	{ name: 'TBD', value: '---' },
	{ name: 'TBD', value: '---' },
	{ name: 'TBD', value: '---' },
	{ name: 'TBD', value: '---' },
];
