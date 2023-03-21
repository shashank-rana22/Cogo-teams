import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const currentYear = new Date().getFullYear();
const newArray = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

export const optionsYear = () => (newArray || [{}]).map((item) => (
	{ value: item.toString(), label: item.toString() }));

export const optionsMonth = [
	{ value: '1', label: 'January' },
	{ value: '2', label: 'February' },
	{ value: '3', label: 'March' },
	{ value: '4', label: 'April' },
	{ value: '5', label: 'May' },
	{ value: '6', label: 'June' },
	{ value: '7', label: 'July' },
	{ value: '8', label: 'August' },
	{ value: '9', label: 'September' },
	{ value: '10', label: 'October' },
	{ value: '11', label: 'November' },
	{ value: '12', label: 'December' },
];

export const optionsShipment = [
	{ value: 'SHIPMENT', label: 'Shipment' },
	{ value: 'MANUAL', label: 'Manual' },
];

export const optionsPills = [
	{ key: 'IMPORT', children: 'Import' },
	{ key: 'EXPORT', children: 'Export' },
	{ key: 'LOCAL', children: 'Local' },
	{ key: 'DOMESTIC', children: 'Domestic' },
];
export const optionSelect = [
	{ value: 'FCL_FREIGHT', label: 'FCL Freight' },
	{ value: 'LCL_FREIGHT', label: 'LCL Freight' },
	{ value: 'AIR_FREIGHT', label: 'AIR Freight' },
	{
		value : 'TRAILER_FREIGHT',
		label : 'Container Transportation',
	},
	{ value: 'FTL_FREIGHT', label: 'FTL Freight' },
	{ value: 'LTL_FREIGHT', label: 'LTL Freight' },
	{ value: 'HAULAGE_FREIGHT', label: 'Rail Haulage' },
	{ value: 'FCL_CUSTOMS', label: 'FCL Customs' },
	{ value: 'LCL_CUSTOMS', label: 'LCL Customs' },
	{ value: 'AIR_CUSTOMS', label: 'AIR Customs' },
];
export const optionsRadio = [
	{
		label : 'Amount',
		value : 'amount',
	},
	{
		label : 'Percentage',
		value : 'percentage',
	},
];

export const optionsData = [
	{
		label : '> Greater than',
		value : '>',
	},
	{
		label : '>= Greater than or equal to',
		value : '>=',
	},
	{
		label : '< less than ',
		value : '<',
	},
	{
		label : '<= less than or equal to',
		value : '<=',
	},
];

export const optionsJobData = [
	{
		label : 'Open',
		value : 'OPEN',
	},
	{
		label : ' Operations Closed',
		value : 'operations_closed',
	},
	{
		label : 'Finance Closed',
		value : 'finance_closed',
	},
];
const content = (purchaseInvoicesCount, salesInvoicesCount) => {
	const { creditNoteCount = '', invoiceCount = '', proformaCount = ''	} = purchaseInvoicesCount || {};
	const {
		creditNoteCount:salesCreditNoteCount = '',
		invoiceCount:salesInvoiceCount = '', proformaCount:salesProformaCount = '',
	} = salesInvoicesCount || {};
	return (
		<div className={styles.flex_jobs}>
			<div>
				<div className={styles.purchase}>Purchase</div>
				<div>
					CreditNote :
					{' '}
					{creditNoteCount}
				</div>
				<div>
					Invoice :
					{' '}
					{invoiceCount}
				</div>

				Proforma :
				{' '}
				{proformaCount}
			</div>

			<div>
				<div className={styles.purchase}>Sales</div>
				<div>
					CreditNote :
					{' '}
					{salesCreditNoteCount}
				</div>
				<div>
					Invoice :
					{' '}
					{salesInvoiceCount}
				</div>

				Proforma :
				{' '}
				{salesProformaCount}
			</div>

		</div>

	);
};
export const accrualColumn = (getTableBodyCheckbox, getTableHeaderCheckbox) => [
	{
		Header   : <div className={styles.header_checkbox}>{getTableHeaderCheckbox()}</div>,
		accessor : '',
		id       : 'getCheckbox',
		Cell     : ({ row: { original } }) => getTableBodyCheckbox(original),
	},
	{
		Header   : 'SID',
		accessor : 'sid',
		id       : 'sid',
		Cell     : ({ row: { original } }) => {
			// console.log(original, 'original');
			const { jobNumber = '', serviceType = '', purchaseInvoicesCount, salesInvoicesCount		} = original || {};
			return (
				<Tooltip
					content={content(purchaseInvoicesCount, salesInvoicesCount)}
					placement="top"
					interactive
				>
					<div className={styles.job_number}>
						<div className={styles.job_number_data}>{ jobNumber || '-' }</div>
						<div>{startCase(serviceType || '-')}</div>
					</div>
				</Tooltip>

			);
		},
	},
	{
		Header   : 'Transaction Date',
		accessor : 'etd',
		id       : 'etd',
		Cell     : ({ row: { original } }) => {
			const { etd } = original || {};
			return <span>{ format(etd, 'dd/MM/yyy') || '-' }</span>;
		},
	},
	{
		Header   : 'Purchase Invoice Amount',
		accessor : 'purchase_invoice_amount',
		id       : 'purchase_invoice_amount',
		Cell     : ({ row: { original } }) => {
			const {
				expenseBooked = '',
				expenseCurrency = '',
				incomeBooked = '', incomeCurrency = '', expenseIncludesProforma = '', incomeIncludesProforma = '',
			} = original || {};
			return (
				<>
					<span>
						{
				expenseBooked
					? getFormattedPrice(expenseBooked, expenseCurrency)
					: getFormattedPrice(incomeBooked, incomeCurrency)
}
					</span>
					<span>
						{expenseBooked
							? expenseIncludesProforma && (
								<div style={{ color: '#F06D6D' }}>Quotation</div>
							)
							: incomeIncludesProforma && (
								<div style={{ color: '#F06D6D' }}>Quotation</div>
							)}

					</span>
				</>
			);
		},
	},
	{
		Header   : 'Adjusted Expense',
		accessor : 'adjusted_expense',
		id       : 'adjusted_expense',
		Cell     : ({ row: { original } }) => {
			const { expenseAccrued = {} } = original || {};
			return <span>{ expenseAccrued || '----' }</span>;
		},
	},
	{
		Header   : 'Sales Invoice Amount',
		accessor : 'sales_invoice_amount',
		id       : 'sales_invoice_amount',
		Cell     : ({ row: { original } }) => {
			const { actualIncome = {} } = original || {};
			return <span>{ getFormattedPrice(actualIncome, 'INR') || '-' }</span>;
		},
	},
	{
		Header   : 'Adjusted Income ',
		accessor : 'adjusted_income',
		id       : 'adjusted_income',
		Cell     : ({ row: { original } }) => {
			const { incomeAccrued = {} } = original || {};
			return <span>{ incomeAccrued || '----' }</span>;
		},
	},
	{
		Header   : 'Profit',
		accessor : 'profit',
		id       : 'profit',
		Cell     : ({ row: { original } }) => {
			const { referenceId = {} } = original || {};
			// return <span className={styles.incident_id}>{ referenceId || '-' }</span>;
		},
	},
	{
		Header   : 'Milestone',
		accessor : 'mile',
		id       : 'mile',
		Cell     : ({ row: { original } }) => {
			const { referenceId = {} } = original || {};
			// return <span className={styles.incident_id}>{ referenceId || '-' }</span>;
		},
	},
	{
		Header   : 'Job Status',
		accessor : 'status',
		id       : 'status',
		Cell     : ({ row: { original } }) => {
			const { referenceId = {} } = original || {};
			// return <span className={styles.incident_id}>{ referenceId || '-' }</span>;
		},
	},

];
