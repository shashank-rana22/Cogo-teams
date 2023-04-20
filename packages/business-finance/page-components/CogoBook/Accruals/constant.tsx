import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import SortIcon from '../common/SortIcon';

import { ColumnInterface } from './interface';
import styles from './styles.module.css';
import DeleteModal from './ViewSelectedInvoice/DeleteModal';

export const monthData = {
	1  : 'January',
	2  : 'February',
	3  : 'March',
	4  : 'April',
	5  : 'May',
	6  : 'June',
	7  : 'July',
	8  : 'August',
	9  : 'September',
	10 : 'October',
	11 : 'November',
	12 : 'December',
};

export const optionsEntity = [
	{ label: '201', value: '201' },
	{ label: '301', value: '301' },
	{ label: '401', value: '401' },
	{ label: '501', value: '501' },
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
					{creditNoteCount || 0}
				</div>
				<div>
					Invoice :
					{' '}
					{invoiceCount || 0}
				</div>

				Proforma :
				{' '}
				{proformaCount || 0}
			</div>

			<div>
				<div className={styles.purchase}>Sales</div>
				<div>
					CreditNote :
					{' '}
					{salesCreditNoteCount || 0}
				</div>
				<div>
					Invoice :
					{' '}
					{salesInvoiceCount || 0}
				</div>

				Proforma :
				{' '}
				{salesProformaCount || 0}
			</div>

		</div>

	);
};

export const bookedColumn = (
	{
		getTableBodyCheckbox,
		getTableHeaderCheckbox,
		deleteSelected,
		openDeleteModal,
		setOpenDeleteModal,
		filters,
		setFilters,
	}:ColumnInterface,
) => {
	const handleDelete = (key = '') => {
		setOpenDeleteModal((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
	};

	return [
		{
			Header   : <div className={styles.header_checkbox}>{getTableHeaderCheckbox()}</div>,
			accessor : '',
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
				const { jobNumber = '', serviceType = '', purchaseInvoicesCount, salesInvoicesCount	} = original || {};
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
							<div className={quotationDiffProfit >= 0
								? styles.margin_div_color : styles.margin_dif_color}
							>
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
				const quotationDiffProfit = ((quotationDiff / sellQuotation) * 100) || 0;

				return (
					<div className={styles.quotation_styles}>
						<span>{getFormattedPrice(actualIncome, incomeCurrency)}</span>

						<div className={styles.quotation_value}>
							Quotation :
							{' '}
							{getFormattedPrice(sellQuotation, sellQuotationCurrency) || 'INR 0.00'}
						</div>
						<div className={styles.line_value}>
							<div className={quotationDiffProfit >= 0
								? styles.margin_div_color : styles.margin_dif_color}
							>
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
						{' '}
						<div className={quotationMargin >= '0' ? styles.margin_div_color : styles.margin_dif_color}>
							{quotationMargin || '0'}
							%
						</div>
						{' '}
						<div className={quotationMargin >= '0' ? styles.margin_div_color : styles.margin_dif_color}>
							{getFormattedPrice(quotationProfit, sellQuotationCurrency) || 'INR 0.00'}
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
				const {
					profit = '', expenseCurrency = '',
					profitPercentage = '',
				} = original || {};
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
					<>
						<div>
							{profitPercentage
								? `${profitPercentage?.toFixed(2)}%`
								: '---'}
						</div>

						<span className={renderClassName()}>
							{getFormattedPrice(profit, expenseCurrency) || '-' }

						</span>
					</>
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
				const { status = '' } = original || {};
				return (
					<>
						{status === 'OPEN' && <span className={styles.status}>{ startCase(status)	|| '-' }</span>}
						{status === 'FINANCIALLY_CLOSED' && <span className={styles.status_fin}> Fin. Closed </span>}
						{status === 'OPERATIONALLY_CLOSED' && <span className={styles.status_op}> Op. Closed </span>}

					</>

				);
			},
		},
		{
			Header : '',
			id     : 'delete',
			Cell   : ({ row: { original } }) => {
				const { id = '' } = original || {};
				return	(
					<>
						<IcMDelete
							height={15}
							width={15}
							onClick={() => handleDelete(id)}
							style={{ cursor: 'pointer' }}
						/>
						{openDeleteModal[id] && (
							<DeleteModal
								openDeleteModal={openDeleteModal}
								handleDelete={handleDelete}
								setOpenDeleteModal={setOpenDeleteModal}
								deleteSelected={deleteSelected}
								id={id}
							/>
						)}
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
};

export const column = ({
	getTableBodyCheckbox,
	getTableHeaderCheckbox, deleteSelected, openDeleteModal, setOpenDeleteModal, filters, setFilters,
}:ColumnInterface) => {
	const handleDelete = (key = '') => {
		setOpenDeleteModal((previousActions) => ({ ...previousActions, [key]: !previousActions[key] }));
	}; return [{
		Header   : <div className={styles.header_checkbox}>{getTableHeaderCheckbox()}</div>,
		accessor : '',
		id       : 'getCheckbox',
		Cell     : ({ row: { original } }) => getTableBodyCheckbox(original),
	}, {
		Header: () => (
			<div className={styles.flex_sort}>
				{' '}
				SID
				{' '}
				<SortIcon setFilters={setFilters} sortingKey="JOBNumber" filters={filters} />
				{' '}
			</div>
		),
		accessor : 'sid',
		id       : 'sid',
		Cell     : ({ row: { original } }) => {
			const {
				jobNumber = '', serviceType = '', purchaseInvoicesCount,
				salesInvoicesCount,
			} = original || {}; return (
				<Tooltip
					content={content(purchaseInvoicesCount, salesInvoicesCount)}
					placement="top"
					interactive
				>
					<div className={styles.job_number}>
						{' '}
						<div className={styles.job_number_data}>{ jobNumber || '-' }</div>
						{' '}
						<div>{startCase(serviceType || '-')}</div>
						{' '}
					</div>
				</Tooltip>
			);
		},
	}, {
		Header: () => (
			<div className={styles.flex_sort}>
				{' '}
				Transaction Date
				{' '}
				<SortIcon setFilters={setFilters} sortingKey="TRANSACTIONDATE" filters={filters} />
				{' '}
			</div>
		),
		accessor : 'etd',
		id       : 'etd',
		Cell     : ({ row: { original } }) => {
			const { etd } = original || {};
			return <span>{ format(etd, 'dd/MM/yyy') || '-' }</span>;
		},
	}, {
		Header: () => (
			<div className={styles.flex_sort}>
				{' '}
				Purchase Invoice Amount
				{' '}
				<SortIcon setFilters={setFilters} sortingKey="EXPENSE" filters={filters} />
				{' '}
			</div>
		),
		accessor : 'purchase_invoice_amount',
		id       : 'purchase_invoice_amount',
		Cell     : ({ row: { original } }) => {
			const {
				expenseBooked = '', expenseCurrency = '',
			} = original || {}; return (
				<>
					{' '}
					<span>
						{' '}
						{ getFormattedPrice(expenseBooked, expenseCurrency)}
						{' '}
					</span>
				</>
			);
		},
	}, {
		Header   : 'Adjusted Expense',
		accessor : 'adjusted_expense',
		id       : 'adjusted_expense',
		Cell     : ({ row: { original } }) => {
			const { expenseAccrued = {} } = original || {};
			return <span>{ expenseAccrued || '----' }</span>;
		},

	}, {
		Header: () => (
			<div className={styles.flex_sort}>
				{' '}
				Sales Invoice Amount
				{' '}
				<SortIcon setFilters={setFilters} sortingKey="INCOME" filters={filters} />
				{' '}
			</div>
		),
		accessor : 'sales_invoice_amount',
		id       : 'sales_invoice_amount',
		Cell     : ({ row: { original } }) => {
			const { incomeBooked = '' } = original || {};
			return <span>{ getFormattedPrice(incomeBooked, 'INR') || '-' }</span>;
		},
	}, {
		Header   : 'Adjusted Income ',
		accessor : 'adjusted_income',
		id       : 'adjusted_income',
		Cell     : ({ row: { original } }) => {
			const { incomeAccrued = {} } = original || {};
			return <span>{ incomeAccrued || '----' }</span>;
		},
	}, {
		Header: () => (
			<div className={styles.flex_sort}>
				{' '}
				Margin
				{' '}
				<SortIcon setFilters={setFilters} sortingKey="PROFIT" filters={filters} />
				{' '}
			</div>
		),
		accessor : 'profit',
		id       : 'profit',
		Cell     : ({ row: { original } }) => {
			const {
				profit = '', expenseCurrency = '',
				profitPercentage = '',
			} = original || {};
			function checkNumber(number) {
				if (number > 0) { return 'positive'; }
				if (number < 0) { return 'negative'; } return 'zero';
			}
			function renderClassName() {
				if (checkNumber(profit) === 'positive') {
					return styles.profit_data;
				} if (checkNumber(profit) === 'negative') { return styles.profit_color; } return null;
			} return (
				<>
					{' '}
					<div>
						{' '}
						{profitPercentage ? `${profitPercentage?.toFixed(2)}%` : '---'}
						{' '}
					</div>
					{' '}
					<span className={renderClassName()}>
						{' '}
						{getFormattedPrice(profit, expenseCurrency) || '-' }
						{' '}
					</span>
					{' '}
				</>
			);
		},
	},
	{
		Header   : 'Milestone',
		accessor : 'mile',
		id       : 'mile',
		Cell     : ({ row: { original } }) => {
			const { shipmentMilestone = '' } = original || {}; return (
				<span>
					{' '}
					{shipmentMilestone?.length > 10 ? (
						<Tooltip content={startCase(shipmentMilestone || '') || '-'} placement="top">
							<div className={styles.wrapper}>{startCase(shipmentMilestone) || '-' }</div>
						</Tooltip>
					) : startCase(shipmentMilestone) || '-' }
					{' '}
				</span>
			);
		},
	},
	{
		Header   : 'Job Status',
		accessor : 'status',
		id       : 'status',
		Cell     : ({ row: { original } }) => {
			const { status = '' } = original || {}; return (
				<>
					{' '}
					{status === 'OPEN' && <span className={styles.status}>{ startCase(status) || '-' }</span>}
					{' '}
					{status === 'FINANCIALLY_CLOSED' && <span className={styles.status_fin}> Fin. Closed </span>}
					{' '}
					{status === 'OPERATIONALLY_CLOSED' && <span className={styles.status_op}> Op. Closed </span>}
					{' '}
				</>
			);
		},
	},
	{
		Header : '',
		id     : 'delete',
		Cell   : ({ row: { original } }) => {
			const { id = '' } = original || {}; return (
				<>
					{' '}
					<IcMDelete height={15} width={15} onClick={() => handleDelete(id)} style={{ cursor: 'pointer' }} />
					{' '}
					{openDeleteModal[id] && (
						<DeleteModal
							openDeleteModal={openDeleteModal}
							handleDelete={handleDelete}
							setOpenDeleteModal={setOpenDeleteModal}
							deleteSelected={deleteSelected}
							id={id}
						/>
					)}
					{' '}
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
	}];
};

export const serviceTypeOptions = [
	{ label: 'FCL Freight', value: 'FCL_FREIGHT' },
	{ label: 'LCL Freight', value: 'LCL_FREIGHT' },
	{ label: 'AIR Freight', value: 'AIR_FREIGHT' },
	{ label: 'FTL Freight', value: 'FTL_FREIGHT' },
	{ label: 'LTL Freight', value: 'LTL_FREIGHT' },
	{ label: 'FCL Customs', value: 'FCL_CUSTOMS' },
	{ label: 'AIR Customs', value: 'AIR_CUSTOMS' },
	{ label: 'LCL Customs', value: 'LCL_CUSTOMS' },
	{ label: 'NA', value: 'NA' },
	{ label: 'Trailer Freight', value: 'TRAILER_FREIGHT' },
	{ label: 'Store Order', value: 'STORE_ORDER' },
	{ label: 'Additional Charge', value: 'ADDITIONAL_CHARGE' },
	{ label: 'FCL CFS', value: 'FCL_CFS' },
	{ label: 'Origin Services', value: 'ORIGIN_SERVICES' },
	{ label: 'Destination Services', value: 'DESTINATION_SERVICES' },
	{ label: 'FCL Customs Freight', value: 'FCL_CUSTOMS_FREIGHT' },
	{ label: 'LCL Customs Freight', value: 'LCL_CUSTOMS_FREIGHT' },
	{ label: 'AIR Customs Freight', value: 'AIR_CUSTOMS_FREIGHT' },
];

export const optionsRadio = [
	{ name: 'r1', value: 'BULK', label: 'All Shipments' },
	{ name: 'r2', value: 'PAGE', label: 'Currently Selected Shipments' },
];

export const optionsRadioData = [
	{ name: 'r1', value: 'BOOK', label: 'Book' },
	{ name: 'r2', value: 'ACCRUE', label: 'Accrue' },
];

export const MILESTONE_OPTIONS = [
	{ label: 'Aborted', value: 'aborted' },
	{ label: 'Cancelled', value: 'cancelled' },
	{ label: 'Completed', value: 'completed' },
	{ label: 'Confirmed by importer exporter', value: 'confirmed_by_importer_exporter' },
	{ label: 'In progress', value: 'in_progress' },
	{ label: 'Shipment received', value: 'shipment_received' },
];
