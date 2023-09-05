import currencyCodeOptions from '@cogoport/ocean-modules/utils/currencyCode';

const PAYMENT_MODE_OPTIONS = [
	{
		label : 'NEFT',
		value : 'NEFT',
	},
	{
		label : 'RTGS',
		value : 'RTGS',
	},
	{
		label : 'DEMAND DRAFT',
		value : 'DEMAND_DRAFT',
	},
];

const formControls = ({
	listEntities = {},
	setBillingParty = () => {},
}) => {
	const billingPartyOpts = listEntities?.list?.map((item) => ({
		...item,
		value : item?.registration_number,
		label : `${item?.entity_code} - ${item?.country?.name} - ${item?.business_name}`,
	}));

	return [
		{
			name        : 'currency',
			label       : 'Currency',
			type        : 'select',
			placeholder : 'Currency',
			options     : currencyCodeOptions,
			value       : 'INR',
			rules       : { required: 'Currency is required' },
			size        : 'sm',
			style       : { width: '110px' },
		},
		{
			name        : 'amount',
			label       : 'Amount',
			type        : 'number',
			placeholder : 'Enter Amount',
			rules       : { required: 'Amount is required', min: 0 },
			size        : 'sm',
			style       : { width: '230px' },
		},
		{
			name                  : 'date',
			label                 : 'Date',
			type                  : 'datepicker',
			placeholder           : 'Enter date',
			rules                 : { required: 'Date is required' },
			size                  : 'sm',
			style                 : { width: '200px' },
			maxDate               : Date.now(),
			isPreviousDaysAllowed : true,
		},
		{
			name        : 'payment_mode',
			label       : 'Payment Mode',
			type        : 'select',
			placeholder : 'Choose Payment Mode',
			rules       : { required: 'Payment Mode is required' },
			size        : 'sm',
			style       : { width: '270px' },
			options     : PAYMENT_MODE_OPTIONS,
		},
		{
			name        : 'utr_number',
			label       : 'UTR Number',
			type        : 'text',
			placeholder : 'Enter UTR Number',
			rules       : { required: 'UTR Number is required' },
			size        : 'sm',
			style       : { width: '270px' },
		},
		{
			name        : 'bank_details',
			label       : 'Bank Details',
			type        : 'select',
			placeholder : 'Enter Billing Party',
			rules       : { required: 'Billing Party is required' },
			size        : 'sm',
			style       : { width: '270px' },
			options     : billingPartyOpts,
			onChange    : (_, item) => {
				setBillingParty(item);
			},
		},
		{
			name     : 'exchange_rate',
			label    : 'Exchange Rate',
			type     : 'number',
			disabled : true,
			size     : 'sm',
			style    : { width: '270px' },
		},
		{
			name        : 'remarks',
			label       : 'Remarks',
			type        : 'textarea',
			placeholder : 'Enter Remarks',
			rules       : { required: 'Remarks are required' },
			size        : 'sm',
			style       : { width: '550px' },
		},
		{
			name  : 'upload',
			label : 'Upload Proof',
			type  : 'upload',
			rules : { required: 'Proof is required' },
			size  : 'sm',
			style : { width: '550px' },
		},
	];
};

export default formControls;
