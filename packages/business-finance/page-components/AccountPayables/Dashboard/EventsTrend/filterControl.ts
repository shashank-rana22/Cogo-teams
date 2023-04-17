export const filterControls = [
	{
		name           : 'events',
		type           : 'select',
		size           : 'md',
		isClearable    : true,
		multiple       : true,
		span           : 1,
		defaultOptions : true,
		placeholder    : 'Events',
		options        : [
			{ value: 'so2UploadTrend', label: 'SO2 Upload Count' },
			{ value: 'invoiceApprovedTrend', label: 'Invoices Approved - SO3' },
			{ value: 'utrUploadTrend', label: 'UTR Uploaded' },
			{ value: 'paidBillTrend', label: 'Bills Paid' },
			{ value: 'payrunCreatedTrend', label: 'Payruns Created' },
			{ value: 'urgentBillsPaid', label: 'Urgent Bills paid' },
			{ value: 'paidProformaTrend', label: 'Proforma Paid' },

		],

	},
];
