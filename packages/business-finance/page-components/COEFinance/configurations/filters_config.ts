import { ControlProps } from "../../commons/Interfaces";

export const FILTERS : ControlProps[]=[
    {
			name: 'zone',
			type: 'select',
			placeholder: 'Geography',
			className: 'primary md',
            style:{width:"210px"},
			hideSelectedOptions: false,
			multiple: true,
			isMulti: true,
			span: 4.5,
			isClearable: true,
			options: [
				{ label: 'North', value: 'north' },
				{ label: 'East', value: 'east' },
				{ label: 'South', value: 'south' },
				{ label: 'West', value: 'west' },
			],
	},
    {
		name: 'services',
		type: 'select',
		className: 'primaryfilter primary md',
		isClearable: true,
		multiple: true,
		defaultOptions: false,
        style:{width:"210px"},
		placeholder: ' Select Service',
		span: 4,
		options: [
			{ value: 'fcl_freight', label: 'FCL' },
			{ value: 'lcl_freight', label: 'LCL' },
			{ value: 'air_freight', label: 'AIR' },
			{ value: 'trailer_freight', label: 'Container Transportation' },
			{ value: 'ftl_freight', label: 'FTL' },
			{ value: 'ltl_freight', label: 'LTL' },
			{ value: 'haulage_freight', label: 'Rail Haulage' },
			{ value: 'fcl_customs', label: 'FCL Customs' },
			{ value: 'lcl_customs', label: 'LCL Customs' },
			{ value: 'air_customs', label: 'AIR Customs' },
			{ value: 'fcl_freight_local', label: 'FCL Freight Local' },
		],
	},
    {
        name:"Date",
        span:12,
        groupBy:[
            {
                label: 'Invoice Date',
                name: 'createdAt',
                type: 'datepicker',
                placeholder: 'Created At',
                span: 3.5,
            },
            {
                label: 'Payment Due Date',
                name: 'paymentDueDate',
                type: 'datepicker',
                placeholder: 'Invoice Date',
                span: 3.5,
            },
            {
                label: 'Last Modified Date',
                name: 'modifiedDate',
                type: 'datepicker',
                placeholder: 'Last Modified Date',
                span: 3.5,
            }
        ],
    },
	{
		name:'Status',
		span:12,
		groupBy: [
        {
			name: 'Status',
			type: 'tags',
			className: 'primary md',
			span: 12,
			options: [
				{ label: 'Initiated', value: 'initiated' },
				{ label: 'Finance Accepted', value: 'finance_accepted' },
			],
		}],
	},
    {
        name: 'Invoice Type',
        span: 12,
        groupBy: [
            {
                name: 'invoiceType',
                type: 'tags',
                className: 'primary md',
                span: 12,
                options: [
                    { label: 'Purchase', value: 'purchase' },
                    { label: 'Proforma', value: 'proforma' },
                    { label: 'Credit Note', value: 'credit_note' },
                    { label: 'Reimburement', value: 'reimburement' },
                ],
            }
        ],
    }
];
