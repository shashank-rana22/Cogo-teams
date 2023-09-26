import currencyCodeOptions from '@cogoport/ocean-modules/utils/currencyCode';
import { isEmpty } from '@cogoport/utils';

const PAYMENT_MODE_OPTIONS = [
	{
		label : 'NEFT',
		value : 'NEFT',
	},
	{
		label : 'RTGS',
		value : 'RTGS',
	},
];

const getFormControls = ({
	listEntities = {},
	setBillingParty = () => {},
	currency = '',
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
			span        : 3,
			disabled    : !isEmpty(currency),
		},
		{
			name        : 'amount',
			label       : 'Amount',
			type        : 'number',
			placeholder : 'Enter Amount',
			rules       : { required: 'Amount is required', min: 0 },
			size        : 'sm',
			span        : 4,
		},
		{
			name                  : 'date',
			label                 : 'Date',
			type                  : 'datepicker',
			placeholder           : 'Enter date',
			rules                 : { required: 'Date is required' },
			size                  : 'sm',
			maxDate               : Date.now(),
			isPreviousDaysAllowed : true,
			span                  : 5,
		},
		{
			name        : 'payment_mode',
			label       : 'Payment Mode',
			type        : 'select',
			placeholder : 'Choose Payment Mode',
			rules       : { required: 'Payment Mode is required' },
			size        : 'sm',
			options     : PAYMENT_MODE_OPTIONS,
			span        : 6,
		},
		{
			name        : 'utr_number',
			label       : 'UTR Number',
			type        : 'text',
			placeholder : 'Enter UTR Number',
			rules       : { required: 'UTR Number is required' },
			size        : 'sm',
			span        : 6,
		},
		{
			name        : 'bank_details',
			label       : 'Bank Details',
			type        : 'select',
			placeholder : 'Enter Billing Party',
			rules       : { required: 'Billing Party is required' },
			size        : 'sm',
			options     : billingPartyOpts,
			onChange    : (_, item) => {
				setBillingParty(item);
			},
			span: 6,
		},
		{
			name     : 'exchange_rate',
			label    : 'Exchange Rate',
			type     : 'number',
			disabled : true,
			size     : 'sm',
			span     : 6,
		},
		{
			name        : 'remarks',
			label       : 'Remarks',
			type        : 'textarea',
			placeholder : 'Enter Remarks',
			rules       : { required: 'Remarks are required' },
			size        : 'sm',
			span        : 12,
		},
		{
			name       : 'upload',
			label      : 'Upload Proof',
			type       : 'file',
			uploadType : 'aws',
			rules      : { required: 'Proof is required' },
			size       : 'sm',
			span       : 12,
		},
	];
};

export default getFormControls;
