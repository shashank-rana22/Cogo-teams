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

export const getOceanData = (
	totalVolumePer,
	fclExportVolumePer,
	fclImportVolumePer,
	lclExportVolumePer,
	lclImportVolumePer,
	oceanCustomVolumePer,
	totalVolume,
	fclExportVolume,
	fclImportVolume,
	lclExportVolume,
	lclImportVolume,
	oceanCustomVolume,
	volume,
) => [
	{ name: 'Total', value: `${volume[0] || totalVolume} (${totalVolumePer.toFixed(2)}%)` || '---' },
	{ name: 'FCL Exports', value: `${volume[1] || fclExportVolume} (${fclExportVolumePer.toFixed(2)}%)` || '---' },
	{ name: 'FCL Imports', value: `${volume[2] || fclImportVolume} (${fclImportVolumePer.toFixed(2)}%)` || '---' },
	{ name: 'LCL Exports', value: `${volume[3] || lclExportVolume} (${lclExportVolumePer.toFixed(2)}%)` || '---' },
	{ name: 'LCL Imports', value: `${volume[4] || lclImportVolume} (${lclImportVolumePer.toFixed(2)}%)` || '---' },
	{ name: 'Customs', value: `${volume[5] || oceanCustomVolume} (${oceanCustomVolumePer.toFixed(2)}%)` || '---' },
];

export const getOceanDataValue = (
	totalPerOcean,
	value,
	totalValue,
	fclExportValue,
	fclImportValue,
	lclExportValue,
	lclImportValue,
	oceanCustomValue,
	fclExportValuePer,
	fclImportValuePer,
	lclExportValuePer,
	oceanCustomValuePer,
	lclImportValuePer,
) => [
	{ name: 'Total', value: `${(value[0] || totalValue)} (${totalPerOcean.toFixed(2)}%)` || '---' },
	{ name: 'FCL Exports', value: `${(value[1] || fclExportValue)} (${fclExportValuePer.toFixed(2)}%)` || '---' },
	{ name: 'FCL Imports', value: `${(value[2] || fclImportValue)} (${fclImportValuePer.toFixed(2)}%)` || '---' },
	{ name: 'LCL Exports', value: `${(value[3] || lclExportValue)} (${lclExportValuePer.toFixed(2)}%)` || '---' },
	{ name: 'LCL Imports', value: `${(value[4] || lclImportValue)} (${lclImportValuePer.toFixed(2)}%)` || '---' },
	{ name: 'Customs', value: `${(value[5] || oceanCustomValue)} (${oceanCustomValuePer.toFixed(2)}%)` || '---' },
];

export const getAirData = (
	totalAirVolume,
	airExportVolume,
	volumeAir,
	airImportVolume,
	airCustomVolume,
	totalPer,
	airExportVolumePer,
	airImportVolumePer,
	airCustomVolumePer,
) => [
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

export const getAirDataValue = (
	totalPerAir,
	totalAirValue,
	valueAir,
	airExportValue,
	airExportValuePer,
	airImportValue,
	airImportValuePer,
	airCustomValue,
	airCustomValuePer,
) => [
	{ name: 'Total', value: `${(valueAir[0] || totalAirValue)} (${totalPerAir.toFixed(2)}%)` || '---' },
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

export const getSurfaceData = (
	totalSurfaceVolume,
	ftlVolume,
	ltlVolume,
	volumeSurface,
	totalPerSurface,
	FTLVolumePer,
	LTLVolumePer,
) => [
	{ name: 'Total', value: `${(volumeSurface[0] || totalSurfaceVolume)} (${totalPerSurface.toFixed(2)}%)` || '---' },
	{ name: 'FTL', value: `${(volumeSurface[1] || ftlVolume)} (${FTLVolumePer.toFixed(2)}%)` || '---' },
	{ name: 'LTL', value: `${(volumeSurface[2] || ltlVolume)} (${LTLVolumePer.toFixed(2)}%)` || '---' },
];

export const getSurfaceDataValue = (
	totalSurfaceValue,
	totalPerValueSurface,
	FTLValuePer,
	ftlValue,
	valueSurface,
	ltlValue,
	LTLValuePer,
) => [
	{
		name  : 'Total',
		value : `${(valueSurface[0] || totalSurfaceValue)} (${totalPerValueSurface.toFixed(2)}%)` || '---',
	},
	{ name: 'FTL', value: `${(valueSurface[1] || ftlValue)} (${FTLValuePer.toFixed(2)}%)` || '---' },
	{ name: 'LTL', value: `${(valueSurface[2] || ltlValue)} (${LTLValuePer.toFixed(2)}%)` || '---' },
];

export const getRailData = (
	railDomesticVolume,
	totalPerRail,
	railVolumePer,
	volumeRail,
) => [
	{ name: 'Total', value: `${(volumeRail[0] || railDomesticVolume)} (${totalPerRail.toFixed(2)}%)` || '---' },
	{ name: 'Domestic', value: `${(volumeRail[1] || railDomesticVolume)} (${railVolumePer.toFixed(2)}%)` || '---' },
];

export const getRailDataValue = (
	totalPerRailValue,
	railDomesticValue,
	railValuePer,
	valueRail,
) => [
	{ name: 'Total', value: `${(valueRail[0] || railDomesticValue)} (${totalPerRailValue.toFixed(2)}%)` || '---' },
	{ name: 'Domestic', value: `${(valueRail[1] || railDomesticValue)} (${railValuePer.toFixed(2)}%)` || '---' },
];

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
