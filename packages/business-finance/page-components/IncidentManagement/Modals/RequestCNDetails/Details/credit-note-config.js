import { startCase } from '@cogoport/utils';

export const categoryOptions = ({ t = () => {} }) => [
	{ label: t('incidentManagement:revenue_impacting'), value: 'REVENUE_IMPACTING' },
	{ label: t('incidentManagement:non_revenue_impacting'), value: 'NON_REVENUE_IMPACTING' },
];
export const revenueOptions = ({ t = () => {} }) => [
	{ label: t('incidentManagement:invoicing_currency_change_label'), value: 'Invoicing Currency Change' },
	{ label: t('incidentManagement:line_item_currency_change_label'), value: 'Line Item Currency Change' },
	{
		label : t('incidentManagement:invoice_preference_change_label'),
		value : 'Invoicing Preference Change',
	},
	{ label: t('incidentManagement:line_item_amount_change_label'), value: 'Line Item Amount Change' },
	{ label: t('incidentManagement:line_item_quantity_change_label'), value: 'Line Item Quantity Change' },
	{ label: t('incidentManagement:extra_payment_received_label'), value: 'Extra Payment Received' },
	{
		label : t('incidentManagement:line_item_exc_rate_label'),
		value : 'Line Item Exchange Rate Change',
	},
	{
		label : t('incidentManagement:invoice_amt_mismatch_quotation'),
		value : 'Quotation - Invoice Amount Mismatch',
	},
	{ label: t('incidentManagement:others'), value: 'revenueOthers' },
];
export const nonRevenueOptions = ({ t = () => {} }) => [
	{ label: t('incidentManagement:customer_address_change'), value: 'Customer Address Change' },
	{ label: t('incidentManagement:invoice_data_change'), value: 'Invoice Date Change' },
	{ label: t('incidentManagement:gst_change'), value: 'GST Change' },
	{ label: t('incidentManagement:billing_party_name_change'), value: 'Billing Party Name Change' },
	{ label: t('incidentManagement:others'), value: 'nonRevenueOthers' },
];
export const NON_REVENUE_DATA = [
	'Customer Address Change',
	'Invoice Date Change',
	'GST Change',
	'Billing Party Name Change',
];

export const creditNoteApprovalTypeOptions = ({ t = () => {} }) => [
	{ label: t('incidentManagement:non_revenue_impacting'), value: 'NON_REVENUE_IMPACTING' },
	{ label: t('incidentManagement:cancellation_invoice'), value: 'CANCELLATION_INVOICE' },
	{ label: t('incidentManagement:revenue_impacting'), value: 'REVENUE_IMPACTING' },
	{ label: t('incidentManagement:profit_impact_cases'), value: 'PROFIT_IMPACTING_CASES' },
];

export const requestCreditNoteColumns = ({ t = () => {} }) => [
	{
		Header   : t('incidentManagement:name_header'),
		accessor : 'name',
		id       : 'name',
	},
	{
		Header   : t('incidentManagement:unit_header'),
		accessor : 'unit',
		id       : 'unit',
		Cell     : ({ row: { original } }) => {
			const formattedUnit = startCase(original?.unit);
			return formattedUnit;
		},
	},
	{
		Header   : t('incidentManagement:currency_label'),
		accessor : 'currency',
		id       : 'currency',
	},
	{
		Header   : t('incidentManagement:exc_rate_label'),
		accessor : 'exchangeRate',
		id       : 'exchangeRate',
	},
	{
		Header   : t('incidentManagement:price_header'),
		accessor : 'rate',
		id       : 'rate',
	},
	{
		Header   : t('incidentManagement:quantity_header'),
		accessor : 'quantity',
		id       : 'quantity',
	},
	{
		Header   : t('incidentManagement:sub_total_header'),
		accessor : 'subTotal',
		id       : 'subTotal',
	},
	{
		Header   : t('incidentManagement:grand_total'),
		accessor : 'grandTotal',
		id       : 'grandTotal',
	},
];
