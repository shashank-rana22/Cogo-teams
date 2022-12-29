import { ControlProps } from "../commons/Interfaces";

export const INVOICE_FILTERS:ControlProps[] =[
	{
		name: 'zone',
		type: 'select',
		placeholder: 'Geography',
		className: 'primary md',
		hideSelectedOptions: false,
		multiple: true,
		isMulti: true,
		span: 2.5,
		isClearable: true,
		options: [
			{ label: 'North', value: 'north' },
			{ label: 'East', value: 'east' },
			{ label: 'South', value: 'south' },
			{ label: 'West', value: 'west' },
		],
	},

	{
		name: 'category',
		type: 'select',
		className: 'primary md',
		isClearable: true,
		placeholder: 'Category',
		span: 2.5,
		multiple: true,
		options: [
					{ value: 'sl', label: 'Shipping Line' },
					{ value: 'air', label: 'Airline' },
					{ value: 'nvocc', label: 'NVOCC' },
					{ value: 'iata', label: 'IATA' },
					{ value: 'cstm', label: 'Customs' },
					{ value: 'tsp', label: 'Transporter' },
					{ value: 'ffw', label: 'Freight Forwarder' },
					{ value: 'oth', label: 'Other' },
		],
	},

	{
		name:'billType',
		theme: 'admin',
		placeholder: 'Invoice View',
		type: 'select',
		className: 'primary md',
		span: 2.5,
		options: [
			{ label: 'All', value: 'all' },
			{ label: 'Migrated', value: 'migrated' },
			{ label: 'COE Accepted', value: 'coe_accepted' },
		],
	},
	{
		label: 'Invoice Type',
		name: 'invoiceType',
		type: 'tags',
		multiple: false,
		className: 'primaryfilter primary md',
		isClearable: true,
		placeholder: 'Invoice Type',
		span: 4,
		options: [
			{ label: 'Purchase', value: 'bill' },
			{ label: 'Proforma', value: 'proforma' },
			{ label: 'Credit Note', value: 'creditNote' },
			{ label: 'Reimbursement', value: 'reimbursement' },
		],
	},
	{
		label: 'Search',
		name: 'search',
		type: 'input',
		span:2,
		placeholder: 'Type',
	},
];
