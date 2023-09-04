import currencyCodeOptions from '@cogoport/ocean-modules/utils/currencyCode';

const formControls = () => {
	console.log('hahahaha');

	return [
		{
			name        : 'currency',
			label       : 'Currency',
			type        : 'select',
			placeholder : 'Currency',
			options     : currencyCodeOptions,
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
			style       : { width: '200px' },
		},
		{
			name                  : 'date',
			label                 : 'Date',
			type                  : 'datepicker',
			placeholder           : 'Enter date',
			rules                 : { required: 'Date is required' },
			size                  : 'sm',
			style                 : { width: '200px' },
			isPreviousDaysAllowed : true,
		},
		{
			name        : 'utr_number',
			label       : 'UTR Number',
			type        : 'text',
			placeholder : 'Enter UTR Number',
			rules       : { required: 'UTR Number is required' },
			size        : 'sm',
			style       : { width: '200px' },
		},
		{
			name     : 'upload',
			label    : 'Upload Proof',
			type     : 'upload',
			multiple : true,
			rules    : { required: 'Proof is required' },
			size     : 'sm',
			style    : { width: '570px' },
		},
	];
};

export default formControls;
