const checkPermission = {
	CAN_DOWNLOAD_OUTSTANDING_REPORT: [
		{
			type          : 'api',
			value         : 'get_payments_outstanding_open_invoices_report',
			in_navigation : 'business_finance-account_receivables',
		},
	],
};

export default checkPermission;
