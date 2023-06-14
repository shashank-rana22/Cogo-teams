import { optionEntity, optionsMonth } from '../../helper';

const filterControls = [
	{

		name        : 'entity',
		placeholder : 'Entity',
		span        : 1,
		type        : 'select',
		multiple    : false,
		size        : 'sm',
		isClearable : true,
		options     : optionEntity,
	},
	{
		name        : 'documentType',
		type        : 'select',
		span        : 1,
		placeholder : 'Document Type',
		isClearable : true,
		size        : 'sm',
		options     : [
			{ label: 'Purchase Invoice', value: 'INVOICE' },
			{ label: 'Credit Note', value: 'CREDIT_NOTE' },
			{ label: 'Debit Note', value: 'DEBIT_NOTE' },
		],
	},
	{
		name        : 'year',
		type        : 'select',
		span        : 1,
		placeholder : 'Year',
		isClearable : true,
		size        : 'sm',
		options     : [
			{ label: 'Purchase Invoice', value: 'INVOICE' },
			{ label: 'Credit Note', value: 'CREDIT_NOTE' },
			{ label: 'Debit Note', value: 'DEBIT_NOTE' },
		],
	},
	{
		name        : 'month',
		type        : 'select',
		span        : 1,
		placeholder : 'Month',
		isClearable : true,
		size        : 'sm',
		options     : optionsMonth,
	},
];
export default filterControls;
