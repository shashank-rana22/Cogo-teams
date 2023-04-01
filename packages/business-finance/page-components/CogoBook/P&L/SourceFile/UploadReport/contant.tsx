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

export 	const getColumnView = [
	{
		id            : '1',
		label         : 'Volume Ratio',
		iconInfo      : <IcMInfo />,
		iconArrowUp   : <IcMArrowRotateUp />,
		iconArrowDown : <IcMArrowRotateDown />,
		dataKey       : 'VOLUME',
	},
	{
		id            : '2',
		label         : 'Value Ratio',
		iconInfo      : <IcMInfo />,
		iconArrowUp   : <IcMArrowRotateUp />,
		iconArrowDown : <IcMArrowRotateDown />,
		dataKey       : 'VALUE',
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

export const getSalaryOceanData = (
	totalSalaryOcean,
	totalVolumePer,
	fclExportVolumePer,
	fclImportVolumePer,
	lclExportVolumePer,
	lclImportVolumePer,
	oceanCustomVolumePer,
	fclExportSalaryVolume,
	fclImportSalaryVolume,
	lclExportSalaryVolume,
	oceanCustomSalaryVolume,
	lclImportSalaryVolume,
	salaryVolume,
) => [
	{
		name  : 'Total',
		value : `${salaryVolume[0]
		|| totalSalaryOcean.toFixed(2)} (${totalVolumePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'FCL Exports',
		value : `${salaryVolume[1] || fclExportSalaryVolume.toFixed(2)} (${fclExportVolumePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'FCL Imports',
		value : `${salaryVolume[2] || fclImportSalaryVolume.toFixed(2)} (${fclImportVolumePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'LCL Exports',
		value : `${salaryVolume[3] || lclExportSalaryVolume.toFixed(2)} (${lclExportVolumePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'LCL Imports',
		value : `${salaryVolume[4] || lclImportSalaryVolume.toFixed(2)} (${lclImportVolumePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'Customs',
		value : `${salaryVolume[5]
			|| oceanCustomSalaryVolume.toFixed(2)} (${oceanCustomVolumePer.toFixed(2)}%)` || '---',
	},
];

export const getSalaryOceanDataValue = (
	totalSalaryOceanValue,
	totalPerOcean,
	fclExportValuePer,
	fclImportValuePer,
	lclExportValuePer,
	lclImportValuePer,
	oceanCustomVolumePer,
	fclExportSalaryValue,
	fclImportSalaryValue,
	lclExportSalaryValue,
	oceanCustomSalaryValue,
	lclImportSalaryValue,
	salaryValue,
) => [
	{
		name  : 'Total',
		value : `${salaryValue[0]
		|| totalSalaryOceanValue.toFixed(2)} (${totalPerOcean.toFixed(2)}%)` || '---',
	},
	{
		name  : 'FCL Exports',
		value : `${salaryValue[1] || fclExportSalaryValue.toFixed(2)} (${fclExportValuePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'FCL Imports',
		value : `${salaryValue[2] || fclImportSalaryValue.toFixed(2)} (${fclImportValuePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'LCL Exports',
		value : `${salaryValue[3] || lclExportSalaryValue.toFixed(2)} (${lclExportValuePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'LCL Imports',
		value : `${salaryValue[4] || lclImportSalaryValue.toFixed(2)} (${lclImportValuePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'Customs',
		value : `${salaryValue[5]
			|| oceanCustomSalaryValue.toFixed(2)} (${oceanCustomVolumePer.toFixed(2)}%)` || '---',
	},
];

export const getSalaryAirData = (
	totalSalaryAirVolume,
	airSalaryExportVolume,
	salaryVolumeAir,
	airSalaryImportVolume,
	airCustomImportVolume,
	totalPer,
	airExportVolumePer,
	airImportVolumePer,
	airCustomVolumePer,
) => [
	{
		name  : 'Total',
		value : `${(salaryVolumeAir[0]
		|| totalSalaryAirVolume.toFixed(2))} (${totalPer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'Air Exports',
		value : `${(salaryVolumeAir[1]
			|| airSalaryExportVolume.toFixed(2))} (${airExportVolumePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'Air Imports',
		value : `${(salaryVolumeAir[2]
			|| airSalaryImportVolume.toFixed(2))} (${airImportVolumePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'Air Customs',
		value : `${(salaryVolumeAir[3]
			|| airCustomImportVolume.toFixed(2))} (${airCustomVolumePer.toFixed(2)}%)` || '---',
	},
];

export const getSalaryAirDataValue = (
	totalSalaryAirValue,
	airSalaryExportValue,
	salaryValueAir,
	airSalaryImportValue,
	airCustomImportValue,
	totalPerAir,
	airExportValuePer,
	airImportValuePer,
	airCustomValuePer,
) => [
	{
		name  : 'Total',
		value : `${(salaryValueAir[0]
		|| totalSalaryAirValue.toFixed(2))} (${totalPerAir.toFixed(2)}%)` || '---',
	},
	{
		name  : 'Air Exports',
		value : `${(salaryValueAir[1]
			|| airSalaryExportValue.toFixed(2))} (${airExportValuePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'Air Imports',
		value : `${(salaryValueAir[2]
			|| airSalaryImportValue.toFixed(2))} (${airImportValuePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'Air Customs',
		value : `${(salaryValueAir[3]
			|| airCustomImportValue.toFixed(2))} (${airCustomValuePer.toFixed(2)}%)` || '---',
	},
];

export const getSalarySurfaceData = (
	totalSalarySurfaceVolume,
	ftlSalaryVolume,
	ltlSalaryVolume,
	salaryVolumeSurface,
	totalPerSurface,
	FTLVolumePer,
	LTLVolumePer,
) => [
	{
		name  : 'Total',
		value : `${(salaryVolumeSurface[0]
			|| totalSalarySurfaceVolume.toFixed(2))} (${totalPerSurface.toFixed(2)}%)` || '---',
	},
	{
		name  : 'FTL',
		value : `${(salaryVolumeSurface[1] || ftlSalaryVolume.toFixed(2))} (${FTLVolumePer.toFixed(2)}%)` || '---',
	},
	{
		name  : 'LTL',
		value : `${(salaryVolumeSurface[2] || ltlSalaryVolume.toFixed(2))} (${LTLVolumePer.toFixed(2)}%)` || '---',
	},
];

export const getSalarySurfaceDataValue = (
	totalSalarySurfaceValue,
	totalPerValueSurface,
	FTLValuePer,
	ftlSalaryValue,
	valueSurface,
	ltlSalaryValue,
	LTLValuePer,
) => [
	{
		name  : 'Total',
		value : `${(valueSurface[0] || totalSalarySurfaceValue)} (${totalPerValueSurface.toFixed(2)}%)` || '---',
	},
	{ name: 'FTL', value: `${(valueSurface[1] || ftlSalaryValue)} (${FTLValuePer.toFixed(2)}%)` || '---' },
	{ name: 'LTL', value: `${(valueSurface[2] || ltlSalaryValue)} (${LTLValuePer.toFixed(2)}%)` || '---' },
];

export const getRailSalaryData = (
	railSalaryDomesticVolume,
	totalPerRail,
	railVolumePer,
	salaryVolumeRail,
) => [
	{
		name  : 'Total',
		value : `${(salaryVolumeRail[0] || railSalaryDomesticVolume)} (${totalPerRail.toFixed(2)}%)` || '---',
	},
	{
		name  : 'Domestic',
		value : `${(salaryVolumeRail[1] || railSalaryDomesticVolume)} (${railVolumePer.toFixed(2)}%)` || '---',
	},
];

export const getRailSalaryDataValue = (
	totalPerRailValue,
	railSalaryDomesticValue,
	railValuePer,
	valueRail,
) => [
	{
		name  : 'Total',
		value : `${(valueRail[0] || railSalaryDomesticValue)} (${totalPerRailValue.toFixed(2)}%)` || '---',
	},
	{ name: 'Domestic', value: `${(valueRail[1] || railSalaryDomesticValue)} (${railValuePer.toFixed(2)}%)` || '---' },
];

export const getOceanRatio = (
	ocean,
	oceanCustoms,
	fclImports,
	fclExports,
	lclImports,
	lclExports,
) => [
	{ name: 'Total', value: `${ocean * 100} %` || '---' },
	{ name: 'FCL Exports', value: `${fclExports * 100}%` || '---' },
	{ name: 'FCL Imports', value: `${fclImports * 100}%` || '---' },
	{ name: 'LCL Exports', value: `${lclExports * 100}%` || '---' },
	{ name: 'LCL Imports', value: `${lclImports * 100}%` || '---' },
	{ name: 'Customs', value: `${oceanCustoms * 100}%` || '---' },
];

export const getAirRatio = (
	air,
	airCustoms,
	airExports,
	airImports,
) => [
	{ name: 'Total', value: `${air * 100} %` || '---' },
	{
		name  : 'Air Exports',
		value : `${airExports * 100} %` || '---',
	},
	{
		name  : 'Air Imports',
		value : `${airImports * 100} %` || '---',
	},
	{
		name  : 'Air Customs',
		value : `${airCustoms * 100} %` || '---',
	},
];
export const getSurfaceRatio = (
	surface,
	ftl,
	ltl,
) => [
	{
		name  : 'Total',
		value : `${surface * 100} %` || '---',
	},
	{
		name  : 'FTL',
		value : `${ftl * 100} %` || '---',
	},
	{
		name  : 'LTL',
		value : `${ltl * 100} %` || '---',
	},
];

export const getRailRatio = (
	rail,
	railDomestic,
) => [
	{
		name  : 'Total',
		value : `${rail * 100} %` || '---',
	},
	{ name: 'Domestic', value: `${railDomestic * 100} %` || '---' },
];
