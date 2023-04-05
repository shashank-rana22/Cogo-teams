/* eslint-disable max-len */
import { Popover, Button, Input, Tooltip } from '@cogoport/components';
import { IcMInfo, IcMSearchlight } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import { ListDataProps } from '../../AccountPayables/commons/Interfaces';
import Filter from '../../commons/Filters';
import SegmentedControl from '../../commons/SegmentedControl';
import showOverflowingNumber from '../../commons/showOverflowingNumber';
import { formatDate } from '../../commons/utils/formatDate';
import List from '../commons/List';
import { nonRecurringFilters, recurringFilters } from '../Controls/nonRecurringFilters';

import AddExpenseModal from './AddExpenseModal';
import CreateExpenseModal from './CreateExpenseModal';
import useListExpense from './hooks/useListExpense';
import useListExpenseConfig from './hooks/useListExpenseConfig';
import useSendEmail from './hooks/useSendEmail';
import ShowMore from './ShowMore';
import styles from './styles.module.css';
import { expenseRecurringConfig, expenseNonRecurringConfig } from './utils/config';
import WarningModal from './WarningModal';

interface ItemDataInterface {
	expensePeriod?:string,
	recurringAmount?:number | string,
	grandTotal?:number,
	paidAmount?:number,
	dueDate?: Date,
	billDate?: Date,
	createdDate?:Date,
	status?: string,
	approvedByUser?:{ id?:string | number, name?:string },
	billNumber?:string | number,
	billDocumentUrl?:string,
	startDate?:Date,
	endDate?:Date,
	maxPayoutAllowed?:number | string,
	currency?:string,
	updatedAt?:Date,
	proofDocuments?:string[],
	createdAt?:Date,
	category?:string,
	billCurrency?:string,
	payableTds?:number | string,
}

function ExpenseComponent() {
	const [recurringState, setRecurringState] = useState('recurring');
	const [createExpenseType, setCreateExpenseType] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showWarning, setShowWarning] = useState(false);
	const [showExpenseModal, setShowExpenseModal] = useState(false);
	const [rowData, setRowData] = useState({});
	const [expenseFilters, setExpenseFilters] = useState({
		expenseType     : recurringState,
		expenseCategory : null,
		searchValue     : '',
		pageIndex       : 1,
		pageSize        : 10,
	});
	const [sort, setSort] = useState({
		invoiceAmountSortType : null,
		tdsSortType           : null,
		payableSortType       : null,
		paidAmountSortType    : null,
		createdDateSortBy     : null,
		amountSortBy          : null,
	});

	const { getList, listData, listLoading } = useListExpense({ expenseFilters, sort });
	const { getRecurringList, recurringListData, recurringListLoading } = useListExpenseConfig({ expenseFilters, sort });
	const { sendMail, loading:mailLoading } = useSendEmail();

	useEffect(() => {
		if (recurringState === 'nonRecurring') {
			getList();
		}
		if (recurringState === 'recurring') {
			getRecurringList();
		}
	}, [getList, recurringState, expenseFilters, getRecurringList]);

	useEffect(() => {
		setExpenseFilters((p) => ({
			...p,
			expenseCategory : null,
			branch          : null,
			repeatsEvery    : null,
			searchValue     : '',
			pageIndex       : 1,
		}));
	}, [recurringState]);

	const OPTIONS = [
		{
			label : 'Recurring',
			value : 'recurring',
		},
		{
			label : 'Non-Recurring',
			value : 'nonRecurring',
		},
	];

	const handleChange = (e:string) => {
		setExpenseFilters((previousState) => ({
			...previousState,
			searchValue: e,
		}));
	};

	const handleAddExpense = (itemData:object) => {
		setShowExpenseModal(true);
		setRowData(itemData);
	};

	const BUTTON_TEXT = {
		recurring    : 'Create Expense Record',
		nonRecurring : 'Create Expense',
	};

	const renderHeaders = () => (
		<div className={styles.header_container}>
			<div className={styles.left_container}>
				{recurringState === 'nonRecurring' &&	(
					<Filter
						controls={nonRecurringFilters}
						filters={expenseFilters}
						setFilters={setExpenseFilters}
					/>
				)}
				{recurringState === 'recurring' &&	(
					<Filter
						controls={recurringFilters}
						filters={expenseFilters}
						setFilters={setExpenseFilters}
					/>
				)}
			</div>
			<div className={styles.right_container}>
				<Input
					size="md"
					placeholder="Search by Vendor Name/PAN/Organization ID/Sage ID"
					suffix={<IcMSearchlight />}
					value={expenseFilters.searchValue}
					onChange={(e:any) => handleChange(e)}
					className={styles.search}
				/>
				<Button
					size="lg"
					themeType="secondary"
					onClick={() => {
						setCreateExpenseType(recurringState);
						setShowModal(true);
					}}
					className={styles.cta_button}
				>
					{BUTTON_TEXT[recurringState]}
				</Button>
			</div>
		</div>
	);

	const functions = {
		addExpense: (itemData:ItemDataInterface) => (
			<Button
				themeType="secondary"
				disabled={itemData?.status !== 'ACCEPTED'}
				size="md"
				style={{ border: '1px solid #E0E0E0' }}
				onClick={() => handleAddExpense(itemData)}
			>
				Add Expense
			</Button>
		),
		renderCategory: (itemData:ItemDataInterface) => {
			const { category = '' } = itemData || {};
			return (
				<div style={{ fontSize: '14px' }}>
					{category.replaceAll('_', ' ')}
				</div>
			);
		},
		renderExpensePeriod: (itemData:ItemDataInterface) => {
			const { startDate, endDate } = itemData || {};
			let difference:string = '';
			if (startDate && endDate) {
				const date1 = new Date(startDate);
				const date2 = new Date(endDate);
				const timeDifference = date2.getTime() - date1.getTime();
				const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
				const monthDifference = Math.floor(daysDifference / 30);
				if (Number(monthDifference) < 1) {
					difference = `${daysDifference} days`;
				} else {
					difference = `${monthDifference} months`;
				}
			}

			if (startDate && endDate) {
				return (
					<div className={styles.data_container}>
						<div>
							<div>
								{formatDate(startDate, 'dd MMM yyyy', {}, false)}
								{' '}
								-

							</div>
							<div style={{ display: 'flex' }}>
								<div>
									{formatDate(endDate, 'dd MMM yyyy', {}, false)}

								</div>
								<Tooltip content={`Duration: ${difference} `}>
									<div style={{ margin: '0px 4px' }}><IcMInfo /></div>
								</Tooltip>
							</div>
						</div>
					</div>
				);
			}
			return <div>-</div>;
		},
		renderRecurringAmount: (itemData:ItemDataInterface) => {
			const { maxPayoutAllowed, currency = '' } = itemData || {};
			return (
				<div className={styles.data_container}>
					<div className={styles.recurring_amount_data}>
						<div>
							{currency}
						</div>
						<div>
                            &nbsp;
							{maxPayoutAllowed || '-'}
						</div>
					</div>
					{/* <Tooltip content="Due on xth every month">
						<div><IcMInfo /></div>
					</Tooltip> */}
				</div>
			);
		},
		getPayable: (itemData:ItemDataInterface) => {
			const { grandTotal, paidAmount, billCurrency = '' } = itemData || {};
			return (
				<div>
					{billCurrency}
					{' '}
					{(grandTotal >= 0 && paidAmount >= 0) ? (grandTotal - paidAmount) : '-'}
				</div>
			);
		},
		getInvoiceDates: (itemData:ItemDataInterface) => {
			const { dueDate, billDate, createdDate } = itemData || {};
			return (
				<div style={{ fontSize: '10px' }}>
					{dueDate && billDate && createdDate && (
						<div>
							<div>
								Due Date:
								{' '}
								{formatDate(dueDate, 'dd MMM yyyy', {}, false) }
							</div>
							<div>
								Invoice Date:
								{' '}
								{ formatDate(billDate, 'dd MMM yyyy', {}, false) }
							</div>
							<div>
								Upload Date:
								{' '}
								{formatDate(createdDate, 'dd MMM yyyy', {}, false) }
							</div>

						</div>
					)}
				</div>

			);
		},
		getApprovedByRecurring: (itemData:ItemDataInterface) => {
			const { updatedAt, approvedByUser, status } = itemData || {};
			const { name = '' } = approvedByUser || {};
			return (
				<div>
					{status !== 'INITIATED' ? (
						<div style={{ fontSize: '12px' }}>
							<div>{name}</div>
							<div>{formatDate(updatedAt, 'dd MMM yyyy', {}, false) || '-' }</div>
						</div>
					) : (
						<>
							<div className={styles.pending_approval}>Pending Approval</div>
							<div className={styles.link}>
								<Button
									style={{
										background : 'none',
										color      : mailLoading ? '#b0b0b0' : '#F68B21',
										fontSize   : '11px',
										padding    : '0px 4px',
									}}
									disabled={mailLoading}
									onClick={() => { sendMail({ rowData: itemData, recurringState }); }}
								>
									Re-send Email
								</Button>
							</div>
						</>
					)}
				</div>
			);
		},
		showAgreement: (itemData:ItemDataInterface) => {
			const { proofDocuments = [] } = itemData || {};
			const proofCount = proofDocuments.length;
			if (proofCount === 1) {
				return (
					<a
						href={proofDocuments[0]}
						target="_blank"
						className={styles.proof}
						rel="noreferrer"
					>
						1 Document

					</a>
				);
			}
			const showDocuments = () => (
				<div>
					{proofDocuments.map((proof:string) => (
						<div key={proof}>
							{proof && (
								<a
									href={proof}
									className={styles.multiple_proof}
									target="_blank"
									rel="noreferrer"
								>
									{proof}
								</a>
							)}
						</div>
					))}
				</div>
			);
			return (
				<div>
					<div>
						<Popover placement="top" render={showDocuments()}>
							<div
								className={styles.multiple_proof}
							>
								{proofCount}
								{' '}
								Documents

							</div>
						</Popover>
					</div>
				</div>
			);
		},
		getCreatedOn: (itemData:ItemDataInterface) => {
			const { createdAt } = itemData || {};
			return (
				<div>
					{ createdAt ? formatDate(createdAt, 'dd MMM yyyy', {}, false) : '-' }
				</div>
			);
		},
		getInvoiceNumber: (itemData:ItemDataInterface) => {
			const { billNumber, billDocumentUrl = '' } = itemData || {};
			return (
				<div>
					{ billNumber ? (
						<div className={styles.link}>
							<a
								href={billDocumentUrl}
								target="_blank"
								rel="noreferrer"
								style={{ color: '#F68B21' }}
							>
								{showOverflowingNumber(billNumber, 12)}

							</a>
						</div>
					) : '-' }
				</div>
			);
		},
		renderInvoiceAmount: (itemData:ItemDataInterface) => {
			const { grandTotal, billCurrency = '' } = itemData || {};
			const amount = `${billCurrency} ${grandTotal}`;
			return (
				<div>
					{showOverflowingNumber(amount || '', 12)}
				</div>
			);
		},
		renderTds: (itemData:ItemDataInterface) => {
			const { payableTds, billCurrency = '' } = itemData || {};
			const amount = `${billCurrency} ${payableTds}`;
			return (
				<div>
					{showOverflowingNumber(amount || '', 12)}
				</div>
			);
		},
		renderPaid: (itemData:ItemDataInterface) => {
			const { paidAmount, billCurrency = '' } = itemData || {};
			const amount = `${billCurrency} ${paidAmount}`;
			return (
				<div>
					{showOverflowingNumber(amount || '', 12)}
				</div>
			);
		},
	};

	const showDropDown = (singleItem:{ id?:string }) => {
		const { id } = singleItem || {};

		if (recurringState === 'recurring') {
			return (
				<ShowMore
					id={id}
					recurringState={recurringState}
					showExpenseModal={showExpenseModal}
				/>
			);
		}
		return null;
	};

	let listConfig:any;
	let listItemData:ListDataProps;
	let loading:boolean;

	if (recurringState === 'recurring') {
		listConfig = expenseRecurringConfig;
		listItemData = recurringListData;
		loading = false;
	} else if (recurringState === 'nonRecurring') {
		listConfig = expenseNonRecurringConfig;
		listItemData = listData;
		loading = listLoading;
	}

	return (
		<div className={styles.expense_container}>
			<div className={styles.segmented_control}>
				<SegmentedControl
					options={OPTIONS}
					activeTab={recurringState}
					setActiveTab={setRecurringState}
					color="#ED3726"
					background="#FFFAEB"
				/>
			</div>
			<div className={styles.styled_div}>
				{renderHeaders()}
				<List
					config={listConfig()}
					itemData={listItemData}
					loading={loading || recurringListLoading}
					functions={functions}
					sort={sort}
					setSort={setSort}
					page={expenseFilters.pageIndex || 1}
					pageSize={expenseFilters.pageSize}
					handlePageChange={(pageValue:number) => {
						setExpenseFilters((p) => ({ ...p, pageIndex: pageValue }));
					}}
					showPagination
					renderDropdown={showDropDown}
				/>

			</div>

			{showModal && (
				<CreateExpenseModal
					setShowModal={setShowModal}
					showModal={showModal}
					createExpenseType={createExpenseType}
					getList={getList}
					getRecurringList={getRecurringList}
					setShowWarning={setShowWarning}
				/>
			)}

			{ showExpenseModal && (
				<AddExpenseModal
					showExpenseModal={showExpenseModal}
					setShowExpenseModal={setShowExpenseModal}
					rowData={rowData}
					setShowWarning={setShowWarning}
				/>
			) }

			{showWarning && (
				<WarningModal
					setShowModal={setShowModal}
					setShowExpenseModal={setShowExpenseModal}
					showWarning={showWarning}
					setShowWarning={setShowWarning}
				/>
			)}

		</div>
	);
}

export default ExpenseComponent;
