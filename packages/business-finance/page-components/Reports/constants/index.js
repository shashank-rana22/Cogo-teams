export const REPORT_TYPE_OPTIONS = [
	{ label: 'Profitability', value: 'profitability' },
	{ label: 'Sage Purchase Report', value: 'sage-purchase-report' },
	{ label: 'Sage Sales Report', value: 'sage-sales-report' },
	{ label: 'Sage Customers Data', value: 'sage-customers-data' },
	{ label: 'Sage Suppliers Data', value: 'sage-suppliers-data' },
	{ label: 'Sage Organization mapping Id Report', value: 'sage-organization-mapping-id-report' },
	{ label: 'Platform Sales Report', value: 'platform-sales-report' },
	{ label: 'Platform Purchase Report', value: 'platform-purchase-report' },
	{ label: 'Sales Report for Reconciliation', value: 'sales-report-for-reconciliation' },
	{ label: 'Partial or Unpaid Bills', value: 'partial-or-unpaid-bills' },
	{ label: 'Ap Bills Auditor', value: 'ap-bills-auditor' },
	{ label: 'Ar Invoices Auditor', value: 'ar-invoices-auditor' },
	{ label: 'Finance Ap Dashboard on Finance Accepted', value: 'finance-ap-dashboard-on-finance-accepted' },
	{ label: 'Payment Status Mismatch', value: 'bill-payment-status-mismatch' },
	{ label: 'Bills Account Utilization Mismatch', value: 'bills-account-utilization-mismatch' },
	{ label: 'Invoice Account Utilization Amount Mismatch', value: 'invoice-account-utilization-amount-mismatch' },
	{ label: 'Invoice Payment Status Mismatch', value: 'invoice-payment-status-mismatch' },
];

export const ACCOUNT_TYPE_OPTIONS = [
	{ label: 'Importer Exporter', value: 'importer_exporter' },
	{ label: 'Service Provider', value: 'service_provider' },
];
export const DATE_OPTIONAL_APIS = [
	'bill-payment-status-mismatch',
	'bills-account-utilization-mismatch',
	'invoice-account-utilization-amount-mismatch',
	'invoice-payment-status-mismatch',
];
