import { Button, Modal, Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import { ColumnInterface } from './interface';
import styles from './styles.module.css';

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

export const column = (
	{
		getTableBodyCheckbox,
		getTableHeaderCheckbox,
		deleteSelected,
		openDeleteModal,
		setOpenDeleteModal,
	}:ColumnInterface,
) => {
	const handleCloseModal = () => {
		setOpenDeleteModal(false);
	};

	return [
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
				const { incomeBooked = '' } = original || {};
				return <span>{ getFormattedPrice(incomeBooked, 'INR') || '-' }</span>;
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
				const { milestone = '' } = original || {};
				return (
					<span>
						{ startCase(milestone)	|| '-' }
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
							onClick={() => setOpenDeleteModal(true)}
							style={{ cursor: 'pointer' }}
						/>
						{openDeleteModal && (
							<Modal show={openDeleteModal} onClose={handleCloseModal}>
								<Modal.Body>
									<div
										className={styles.flex_modal}
									>
										<div style={{ margin: '20px' }}>Are you sure you want to delete this?</div>

										<div className={styles.flex}>
											<Button
												id="cancel-modal-btn"
												style={{ marginRight: 10 }}
												themeType="secondary"
												onClick={() => { setOpenDeleteModal(false); }}
											>
												Cancel
											</Button>
											<Button
												id="approve-modal-btn"
												themeType="primary"
												onClick={() => { deleteSelected(id, handleCloseModal); }}
											>
												Yes
											</Button>
										</div>
									</div>
								</Modal.Body>

							</Modal>
						)}
					</>
				);
			},
		},

	];
};

export const serviceTypeOptions = [
	{ label: 'FCL-Freight', value: 'FCL_FREIGHT' },
	{ label: 'LCL-Freight', value: 'LCL_FREIGHT' },
	{ label: 'AIR-Freight', value: 'AIR_FREIGHT' },
	{ label: 'FTL-Freight', value: 'FTL_FREIGHT' },
	{ label: 'LTL-Freight', value: 'LTL_FREIGHT' },
	{ label: 'FCL-Customs', value: 'FCL_CUSTOMS' },
	{ label: 'AIR-Customs', value: 'AIR_CUSTOMS' },
	{ label: 'LCL-Customs', value: 'LCL_CUSTOMS' },
	{ label: 'NA', value: 'NA' },
	{ label: 'Trailer-Freight', value: 'TRAILER_FREIGHT' },
	{ label: 'Store-Order', value: 'STORE_ORDER' },
	{ label: 'Additional-Charge', value: 'ADDITIONAL_CHARGE' },
	{ label: 'FCL-CFS', value: 'FCL_CFS' },
	{ label: 'Origin-Services', value: 'ORIGIN_SERVICES' },
	{ label: 'Destination-Services', value: 'DESTINATION_SERVICES' },
	{ label: 'FCL-Customs-Freight', value: 'FCL_CUSTOMS_FREIGHT' },
	{ label: 'LCL-Customs-Freight', value: 'LCL_CUSTOMS_FREIGHT' },
	{ label: 'AIR-Customs-Freight', value: 'AIR_CUSTOMS_FREIGHT' },
];

export const optionsRadio = [
	{ name: 'r1', value: 'BULK', label: 'ALL' },
	{ name: 'r2', value: 'PAGE', label: 'CURRENT' },
];
