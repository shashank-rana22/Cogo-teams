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
const options = { style: 'decimal', maximumFractionDigits: 2 };

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
	{
		name  : 'Total',
		value : `${(volume[0]
		|| totalVolume)?.toLocaleString('en-IN', options)}
		(${totalVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FCL Exports',
		value : `${(volume[1]
			|| fclExportVolume)?.toLocaleString('en-IN', options)} 
			(${fclExportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FCL Imports',
		value : `${(volume[2]
			|| fclImportVolume)?.toLocaleString('en-IN', options)} 
			(${fclImportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LCL Exports',
		value : `${(volume[3]
			|| lclExportVolume)?.toLocaleString('en-IN', options)} 
			(${lclExportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LCL Imports',
		value : `${(volume[4]
			|| lclImportVolume)?.toLocaleString('en-IN', options)} 
			(${lclImportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Customs',
		value : `${(volume[5]
			|| oceanCustomVolume)?.toLocaleString('en-IN', options)} 
			(${oceanCustomVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
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
	{
		name  : 'Total',
		value : `${(value[0] || totalValue)?.toLocaleString('en-IN', options)} 
	(${totalPerOcean?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FCL Exports',
		value : `${(value[1] || fclExportValue)?.toLocaleString('en-IN', options)} 
		(${fclExportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FCL Imports',
		value : `${(value[2] || fclImportValue)?.toLocaleString('en-IN', options)} 
		(${fclImportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LCL Exports',
		value : `${(value[3] || lclExportValue)?.toLocaleString('en-IN', options)} 
		(${lclExportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LCL Imports',
		value : `${(value[4] || lclImportValue)?.toLocaleString('en-IN', options)} 
		(${lclImportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Customs',
		value : `${(value[5] || oceanCustomValue)?.toLocaleString('en-IN', options)} 
		(${oceanCustomValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
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
	{
		name  : 'Total',
		value : `${(volumeAir[0] || totalAirVolume)?.toLocaleString('en-IN', options)} 
	(${totalPer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Exports',
		value : `${(volumeAir[1] || airExportVolume)?.toLocaleString('en-IN', options)} 
		(${airExportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Imports',
		value : `${(volumeAir[2] || airImportVolume)?.toLocaleString('en-IN', options)} 
		(${airImportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Customs',
		value : `${(volumeAir[3] || airCustomVolume)?.toLocaleString('en-IN', options)} 
		(${airCustomVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
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
	{
		name  : 'Total',
		value : `${(valueAir[0] || totalAirValue)?.toLocaleString('en-IN', options)} 
	(${totalPerAir?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Exports',
		value : `${(valueAir[1] || airExportValue)?.toLocaleString('en-IN', options)} 
		(${airExportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Imports',
		value : `${(valueAir[2] || airImportValue)?.toLocaleString('en-IN', options)} 
		(${airImportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Customs',
		value : `${(valueAir[3] || airCustomValue)?.toLocaleString('en-IN', options)} 
		(${airCustomValuePer?.toLocaleString('en-IN', options)}%)` || '---',
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
	{
		name  : 'Total',
		value : `${(volumeSurface[0] || totalSurfaceVolume)?.toLocaleString('en-IN', options)} 
		(${totalPerSurface?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FTL',
		value : `${(volumeSurface[1] || ftlVolume)?.toLocaleString('en-IN', options)} 
	(${FTLVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LTL',
		value : `${(volumeSurface[2] || ltlVolume)?.toLocaleString('en-IN', options)} 
	(${LTLVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
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
		value : `${(valueSurface[0] || totalSurfaceValue)?.toLocaleString('en-IN', options)} 
		(${totalPerValueSurface?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FTL',
		value : `${(valueSurface[1] || ftlValue)?.toLocaleString('en-IN', options)} 
	(${FTLValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LTL',
		value : `${(valueSurface[2] || ltlValue)?.toLocaleString('en-IN', options)} 
	(${LTLValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
];

export const getRailData = (
	railDomesticVolume,
	totalPerRail,
	railVolumePer,
	volumeRail,
) => [
	{
		name  : 'Total',
		value : `${(volumeRail[0] || railDomesticVolume)?.toLocaleString('en-IN', options)} 
		(${totalPerRail?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Domestic',
		value : `${(volumeRail[1] || railDomesticVolume)?.toLocaleString('en-IN', options)} 
		(${railVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
];

export const getRailDataValue = (
	totalPerRailValue,
	railDomesticValue,
	railValuePer,
	valueRail,
) => [
	{
		name  : 'Total',
		value : `${(valueRail[0] || railDomesticValue)?.toLocaleString('en-IN', options)} 
		(${totalPerRailValue?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Domestic',
		value : `${(valueRail[1] || railDomesticValue)?.toLocaleString('en-IN', options)} 
		(${railValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
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
		value : `${(salaryVolume[0]
		|| totalSalaryOcean)?.toLocaleString('en-IN', options)} 
		(${totalVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FCL Exports',
		value : `${(salaryVolume[1]
			|| fclExportSalaryVolume)?.toLocaleString('en-IN', options)} 
			(${fclExportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FCL Imports',
		value : `${(salaryVolume[2]
			|| fclImportSalaryVolume)?.toLocaleString('en-IN', options)} 
			(${fclImportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LCL Exports',
		value : `${(salaryVolume[3]
			|| lclExportSalaryVolume)?.toLocaleString('en-IN', options)} 
			(${lclExportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LCL Imports',
		value : `${(salaryVolume[4]
			|| lclImportSalaryVolume)?.toLocaleString('en-IN', options)} 
			(${lclImportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Customs',
		value : `${(salaryVolume[5]
			|| oceanCustomSalaryVolume)?.toLocaleString('en-IN', options)} 
			(${oceanCustomVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
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
		value : `${(salaryValue[0]
		|| totalSalaryOceanValue)?.toLocaleString('en-IN', options)} 
		(${totalPerOcean?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FCL Exports',
		value : `${(salaryValue[1] || fclExportSalaryValue)?.toLocaleString('en-IN', options)} 
		(${fclExportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FCL Imports',
		value : `${(salaryValue[2] || fclImportSalaryValue)?.toLocaleString('en-IN', options)} 
		(${fclImportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LCL Exports',
		value : `${(salaryValue[3] || lclExportSalaryValue)?.toLocaleString('en-IN', options)} 
		(${lclExportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LCL Imports',
		value : `${(salaryValue[4] || lclImportSalaryValue)?.toLocaleString('en-IN', options)} 
		(${lclImportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Customs',
		value : `${(salaryValue[5]
			|| oceanCustomSalaryValue)?.toLocaleString('en-IN', options)} 
			(${oceanCustomVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
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
		|| totalSalaryAirVolume)?.toLocaleString('en-IN', options)} 
		(${totalPer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Exports',
		value : `${(salaryVolumeAir[1]
			|| airSalaryExportVolume)?.toLocaleString('en-IN', options)}
			 (${airExportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Imports',
		value : `${(salaryVolumeAir[2]
			|| airSalaryImportVolume)?.toLocaleString('en-IN', options)} 
			(${airImportVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Customs',
		value : `${(salaryVolumeAir[3]
			|| airCustomImportVolume)?.toLocaleString('en-IN', options)} 
			(${airCustomVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
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
		|| totalSalaryAirValue)?.toLocaleString('en-IN', options)}
		(${totalPerAir?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Exports',
		value : `${(salaryValueAir[1]
			|| airSalaryExportValue)?.toLocaleString('en-IN', options)} 
			(${airExportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Imports',
		value : `${(salaryValueAir[2]
			|| airSalaryImportValue)?.toLocaleString('en-IN', options)} 
			(${airImportValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Air Customs',
		value : `${(salaryValueAir[3]
			|| airCustomImportValue)?.toLocaleString('en-IN', options)} 
			(${airCustomValuePer?.toLocaleString('en-IN', options)}%)` || '---',
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
			|| totalSalarySurfaceVolume)?.toLocaleString('en-IN', options)} 
			(${totalPerSurface?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FTL',
		value : `${(salaryVolumeSurface[1] || ftlSalaryVolume)?.toLocaleString('en-IN', options)} 
		(${FTLVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LTL',
		value : `${(salaryVolumeSurface[2] || ltlSalaryVolume)?.toLocaleString('en-IN', options)} 
		(${LTLVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
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
		value : `${(valueSurface[0]
			|| totalSalarySurfaceValue)?.toLocaleString('en-IN', options)} 
			(${totalPerValueSurface?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'FTL',
		value : `${(valueSurface[1] || ftlSalaryValue)?.toLocaleString('en-IN', options)} 
	(${FTLValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'LTL',
		value : `${(valueSurface[2] || ltlSalaryValue)?.toLocaleString('en-IN', options)} 
	(${LTLValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
];

export const getRailSalaryData = (
	railSalaryDomesticVolume,
	totalPerRail,
	railVolumePer,
	salaryVolumeRail,
) => [
	{
		name  : 'Total',
		value : `${(salaryVolumeRail[0]
			|| railSalaryDomesticVolume)?.toLocaleString('en-IN', options)} 
			(${totalPerRail?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Domestic',
		value : `${(salaryVolumeRail[1]
			|| railSalaryDomesticVolume)?.toLocaleString('en-IN', options)} 
			(${railVolumePer?.toLocaleString('en-IN', options)}%)` || '---',
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
		value : `${(valueRail[0] || railSalaryDomesticValue)?.toLocaleString('en-IN', options)} 
		(${totalPerRailValue?.toLocaleString('en-IN', options)}%)` || '---',
	},
	{
		name  : 'Domestic',
		value : `${(valueRail[1]
		|| railSalaryDomesticValue)?.toLocaleString('en-IN', options)} 
		(${railValuePer?.toLocaleString('en-IN', options)}%)` || '---',
	},
];

export const getOceanRatio = (
	ocean,
	oceanCustoms,
	fclImports,
	fclExports,
	lclImports,
	lclExports,
) => [
	{ name: 'Total', value: `${(ocean * 100)?.toLocaleString('en-IN', options)} %` || '---' },
	{ name: 'FCL Exports', value: `${(fclExports * 100)?.toLocaleString('en-IN', options)}%` || '---' },
	{ name: 'FCL Imports', value: `${(fclImports * 100)?.toLocaleString('en-IN', options)}%` || '---' },
	{ name: 'LCL Exports', value: `${(lclExports * 100)?.toLocaleString('en-IN', options)}%` || '---' },
	{ name: 'LCL Imports', value: `${(lclImports * 100)?.toLocaleString('en-IN', options)}%` || '---' },
	{ name: 'Customs', value: `${(oceanCustoms * 100)?.toLocaleString('en-IN', options)}%` || '---' },
];

export const getAirRatio = (
	air,
	airCustoms,
	airExports,
	airImports,
) => [
	{ name: 'Total', value: `${(air * 100)?.toLocaleString('en-IN', options)} %` || '---' },
	{
		name  : 'Air Exports',
		value : `${(airExports * 100)?.toLocaleString('en-IN', options)} %` || '---',
	},
	{
		name  : 'Air Imports',
		value : `${(airImports * 100)?.toLocaleString('en-IN', options)} %` || '---',
	},
	{
		name  : 'Air Customs',
		value : `${(airCustoms * 100)?.toLocaleString('en-IN', options)} %` || '---',
	},
];
export const getSurfaceRatio = (
	surface,
	ftl,
	ltl,
) => [
	{
		name  : 'Total',
		value : `${(surface * 100)?.toLocaleString('en-IN', options)} %` || '---',
	},
	{
		name  : 'FTL',
		value : `${(ftl * 100)?.toLocaleString('en-IN', options)} %` || '---',
	},
	{
		name  : 'LTL',
		value : `${(ltl * 100)?.toLocaleString('en-IN', options)} %` || '---',
	},
];

export const getRailRatio = (
	rail,
	railDomestic,
) => [
	{
		name  : 'Total',
		value : `${(rail * 100)?.toLocaleString('en-IN', options)} %` || '---',
	},
	{ name: 'Domestic', value: `${(railDomestic * 100)?.toLocaleString('en-IN', options)} %` || '---' },
];
