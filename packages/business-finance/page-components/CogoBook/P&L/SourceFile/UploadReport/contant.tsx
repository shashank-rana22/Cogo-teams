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

export const getOceanData = [
	{ name: 'Total', value: '4,000 (28%)' },
	{ name: 'FCL Exports', value: '1,000 (25%)' },
	{ name: 'FCL Imports', value: '1,000 (25%)' },
	{ name: 'LCL Exports', value: '1,000 (25%)' },
	{ name: 'LCL Imports', value: '800 (20%)' },
	{ name: 'Customs', value: '200 (5%)' },
	{ name: 'Transshipment', value: '200 (5%)' },
];

export const getAirData = [
	{ name: 'Total', value: '4,000 (28%)' },
	{ name: 'Air Exports', value: '1,000 (25%)' },
	{ name: 'Air Imports', value: '1,000 (25%)' },
	{ name: 'Air Customs', value: '1,000 (25%)' },
	{ name: 'Transshipment', value: '200 (5%)' },
];

export const getSurfaceData = [
	{ name: 'Total', value: '4,000 (28%)' },
	{ name: 'FTL', value: '1,000 (25%)' },
	{ name: 'LTL', value: '1,000 (25%)' },
	{ name: 'PTL', value: '1,000 (25%)' },
];

export const getRailData = [
	{ name: 'Total', value: '4,000 (28%)' },
	{ name: 'Domestic', value: '1,000 (25%)' },
];

export const getProjectData = [
	{ name: 'Total', value: '4,000 (28%)' },
	{ name: 'SaaS', value: '1,000 (25%)' },
	{ name: 'Insurance', value: '1,000 (25%)' },
	{ name: 'FinTech', value: '1,000 (25%)' },
];

export const getAgentsData = [
	{ name: 'Total', value: '4,000 ' },
	{ name: 'TBD', value: '1,000 ' },
	{ name: 'TBD', value: '1,000 ' },
	{ name: 'TBD', value: '1,000 ' },
	{ name: 'TBD', value: '1,000 ' },
];
