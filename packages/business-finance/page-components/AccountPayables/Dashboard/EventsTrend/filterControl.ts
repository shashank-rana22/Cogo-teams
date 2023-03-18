export const filterControls = [
	{
		name           : 'events',
		type           : 'select',
		size           : 'md',
		isClearable    : true,
		multiple       : true,
		span           : 1,
		defaultOptions : false,
		placeholder    : 'Events',
		options        : [
			{ value: 'so2_upload_count', label: 'SO2 Upload Count' },
			{ value: 'invoices_approved_so3', label: 'Invoices Approved - SO3' },
			{ value: 'utr_uploaded', label: 'UTR Uploaded' },
			{ value: 'bills_paid', label: 'Bills Paid' },
			{ value: 'payruns_created', label: 'Payruns Created' },
			{ value: 'urgent_bills_paid', label: 'Urgent Bills paid' },
			{ value: 'proforma_paid', label: 'Proforma Paid' },

		],

	},
];
