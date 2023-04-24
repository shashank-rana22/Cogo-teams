import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { format, startCase } from '@cogoport/utils';

import SortIcon from '../../common/SortIcon';

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
		label : 'By Amount',
		value : 'amount',
		name  : 'amount',
	},
	{
		label : 'By Percentage',
		value : 'percentage',
		name  : 'percentage',
	},
];

export const optionsData = [
	{
		label : 'Greater than',
		value : '>',
	},
	{
		label : 'Greater than or equal to',
		value : '>=',
	},
	{
		label : 'Between',
		value : '<=x=<',
	},
	{
		label : 'less than ',
		value : '<',
	},
	{
		label : 'less than or equal to',
		value : '<=',
	},
];

export const optionsJobData = [
	{
		label : 'Open',
		value : 'OPEN',
	},
	{
		label : ' Operationally Closed ',
		value : 'OPERATIONALLY_CLOSED',
	},
	{
		label : 'Financially Closed',
		value : 'FINANCIALLY_CLOSED',
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
export const accrualColumn = (
	getTableBodyCheckbox,
	getTableHeaderCheckbox,
	editProfitHandler,
	changeProfitHandler,
	crossProfitHandler,
	tickProfitHandler,
	profitValue,
	profitData,
	filters,
	setFilters,
) => [
	{
		Header   : <div className={styles.header_checkbox}>{getTableHeaderCheckbox()}</div>,
		accessor : 'getCheckbox',
		id       : 'getCheckbox',
		Cell     : ({ row: { original } }) => getTableBodyCheckbox(original),
	},
	{
		Header: () => (
			<div className={styles.flex_sort}>
				SID
				<SortIcon
					setFilters={setFilters}
					sortingKey="JOBNumber"
					filters={filters}
				/>
			</div>
		),
		accessor : 'sid',
		id       : 'sid',
		Cell     : ({ row: { original } }) => {
			const { jobNumber = '', serviceType = '', purchaseInvoicesCount, salesInvoicesCount		} = original || {};
			return (
				<Tooltip
					content={content(purchaseInvoicesCount, salesInvoicesCount)}
					placement="top"
					trigger="mouseenter"
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
		Header: () => (
			<div className={styles.flex_sort}>
				Transaction Date
				<SortIcon
					setFilters={setFilters}
					sortingKey="TRANSACTIONDATE"
					filters={filters}
				/>
			</div>
		),
		accessor : 'etd',
		id       : 'etd',
		Cell     : ({ row: { original } }) => {
			const { etd } = original || {};
			return <span>{ format(etd, 'dd/MM/yyy') || '-' }</span>;
		},
	},
	{
		Header: () => (
			<div className={styles.flex_sort}>
				Purchase Invoice Amount
				<SortIcon
					setFilters={setFilters}
					sortingKey="EXPENSE"
					filters={filters}
				/>
			</div>
		),
		accessor : 'purchase_invoice_amount',
		id       : 'purchase_invoice_amount',
		Cell     : ({ row: { original } }) => {
			const {
				expenseBooked = '',
				expenseCurrency = '',
				buyQuotation = '',
				buyQuotationCurrency = '',
			} = original || {};
			const quotationDiff = buyQuotation - expenseBooked || 0;
			const quotationDiffProfit = ((quotationDiff / buyQuotation) * 100) || 0;
			return (
				<div className={styles.quotation_styles}>
					<div>
						<span>
							{getFormattedPrice(expenseBooked, expenseCurrency)}
						</span>
					</div>

					<div className={styles.quotation_value}>
						Quotation :
						{' '}
						{getFormattedPrice(buyQuotation, buyQuotationCurrency) || 'INR 0.00'}
					</div>
					<div className={styles.line_value}>
						<div className={quotationDiffProfit >= 0 ? styles.margin_div_color : styles.margin_dif_color}>
							{(quotationDiffProfit).toFixed(2) || '0'}
							%
						</div>
						<div className={quotationDiffProfit >= 0 ? styles.hr_small : styles.hr_small_conditions} />
						{' '}
						<div className={quotationDiff >= 0 ? styles.margin_div_color : styles.margin_dif_color}>
							{getFormattedPrice(quotationDiff, expenseCurrency) || 'INR 0.00'}
						</div>
					</div>

				</div>
			);
		},
	},
	{
		Header: () => (
			<div className={styles.flex_sort}>
				Sales Invoice Amount
				<SortIcon
					setFilters={setFilters}
					sortingKey="INCOME"
					filters={filters}
				/>
			</div>
		),
		accessor : 'sales_invoice_amount',
		id       : 'sales_invoice_amount',
		Cell     : ({ row: { original } }) => {
			const {
				actualIncome = '', incomeCurrency = '',
				sellQuotation = '', sellQuotationCurrency = '',
			} = original || {};

			const quotationDiff = sellQuotation - actualIncome || 0;

			// Setting quotationDiffProfit = 0 if sellQuotation is zero(to prevent calculation to give infinity)
			const quotationDiffProfit = sellQuotation !== 0 ? (((quotationDiff / sellQuotation) * 100) || 0) : 0;

			return (
				<div className={styles.quotation_styles}>
					<span>{getFormattedPrice(actualIncome, incomeCurrency)}</span>

					<div className={styles.quotation_value}>
						Quotation :
						{' '}
						{getFormattedPrice(sellQuotation, sellQuotationCurrency) || 'INR 0.00'}
					</div>
					<div className={styles.line_value}>
						<div className={quotationDiffProfit >= 0 ? styles.margin_div_color : styles.margin_dif_color}>
							{(quotationDiffProfit).toFixed(2) || '0'}
							%
						</div>
						<div className={quotationDiffProfit >= 0 ? styles.hr_small : styles.hr_small_conditions} />
						{' '}
						<div className={quotationDiff >= 0 ? styles.margin_div_color : styles.margin_dif_color}>
							{getFormattedPrice(quotationDiff, sellQuotationCurrency) || 'INR 0.00'}
						</div>
					</div>
				</div>
			);
		},
	},
	{
		Header   : 'Quotation Margin',
		accessor : 'adjusted_income',
		id       : 'adjusted_income',
		Cell     : ({ row: { original } }) => {
			const { quotationProfit = '', quotationMargin = '', sellQuotationCurrency } = original || {};
			return (
				<div>
					<div className={quotationMargin >= '0' ? styles.margin_div_color : styles.margin_dif_color}>
						{getFormattedPrice(quotationProfit, sellQuotationCurrency) || 'INR 0.00'}
					</div>
					<div className={quotationMargin >= '0' ? styles.margin_div_color : styles.margin_dif_color}>
						{quotationMargin?.toFixed(2) || '0'}
						%
					</div>
				</div>
			);
		},
	},
	{
		Header: () => (
			<div className={styles.flex_sort}>
				Margin
				<SortIcon
					setFilters={setFilters}
					sortingKey="PROFIT"
					filters={filters}
				/>
			</div>
		),
		accessor : 'profit',
		id       : 'profit',
		Cell     : ({ row: { original } }) => {
			const { profit = '', expenseCurrency = '' } = original || {};
			function checkNumber(number) {
				if (number > 0) {
					return 'positive';
				} if (number < 0) {
					return 'negative';
				}
				return 'zero';
			}
			function renderClassName() {
				if (checkNumber(profit) === 'positive') {
					return styles.profit_data;
				}
				if (checkNumber(profit) === 'negative') {
					return styles.profit_color;
				}
				return null;
			}

			return (
				<div>
					<div>
						<span className={renderClassName()}>
							{getFormattedPrice(profit, expenseCurrency) || '-' }
						</span>
					</div>
				</div>

			);
		},
	},
	{
		Header   : 'Milestone',
		accessor : 'mile',
		id       : 'mile',
		Cell     : ({ row: { original } }) => {
			const { shipmentMilestone = '' } = original || {};
			return (
				<span>
					{shipmentMilestone?.length > 10
						? (
							<Tooltip
								content={startCase(shipmentMilestone)	|| '-'}
								placement="top"
							>
								<div className={styles.wrapper}>{startCase(shipmentMilestone)	|| '-' }</div>
							</Tooltip>
						) : startCase(shipmentMilestone)	|| '-' }
				</span>
			);
		},
	},
	{
		Header   : 'Job Status',
		accessor : 'status',
		id       : 'status',
		Cell     : ({ row: { original } }) => {
			const { jobStatus = '' } = original || {};
			return (
				<>
					{jobStatus === 'OPEN' && <span className={styles.status}>{ startCase(jobStatus)	|| '-' }</span>}
					{jobStatus === 'FINANCIALLY_CLOSED' && <span className={styles.status_fin}> Fin. Closed </span>}
					{jobStatus === 'OPERATIONALLY_CLOSED' && <span className={styles.status_op}> Op. Closed </span>}

				</>

			);
		},
	},
	{
		Header   : '',
		id       : 'ribbon',
		accessor : (row) => (

			<div>
				<div className={styles.ribbon}>
					{row?.shipmentType || '-'}
				</div>
			</div>

		),
	},

];
