import { Popover, Button, Input, Tooltip } from '@cogoport/components';
import { IcMSearchlight, IcMInfo } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import Filter from '../../../commons/Filters';
import SegmentedControl from '../../../commons/SegmentedControl/index';
import showOverflowingNumbers from '../../../commons/showOverflowingNumber';
import { formatDate } from '../../../commons/utils/formatDate';
import List from '../../commons/List';
import { nonRecurringFilters, recurringFilters } from '../Controls/nonRecurringFilters';

import AddExpenseModal from './AddExpenseModal';
import CreateExpenseModal from './CreateExpenseModal';
import useListExpense from './hooks/useListExpense';
import useListExpenseConfig from './hooks/useListExpenseConfig';
import ShowMore from './ShowMore';
import styles from './styles.module.css';
import { expenseRecurringConfig, expenseNonRecurringConfig } from './utils/config';

interface ItemDataInterface {
	expensePeriod?:string,
	recurringAmount?:number | string,
	grandTotal?:number,
	paidAmount?:number,
	dueDate?: Date,
	billDate?: Date,
	createdDate?:Date,
	status?: string,
	approvedByUser?:{ name?:string },
	billNumber?:string | number,
	startDate?:Date,
	endDate?:Date,
	maxPayoutAllowed?:number | string,
	currency?:string,
	updatedAt?:Date,
	proofDocuments?:string[],
	createdAt?:Date,
}

function ExpenseComponent() {
	const [recurringState, setRecurringState] = useState('recurring');
	const [createExpenseType, setCreateExpenseType] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showExpenseModal, setShowExpenseModal] = useState(false);
	const [rowData, setRowData] = useState({});
	const [expenseFilters, setExpenseFilters] = useState({
		expenseType     : recurringState,
		expenseCategory : null,
		searchValue     : '',
		pageIndex       : 1,
		pageLimit       : 10,
	});

	const { getList, listData, listLoading } = useListExpense({ expenseFilters });
	const { getRecurringList, recurringListData, recurringListLoading } = useListExpenseConfig({ expenseFilters });

	useEffect(() => {
		if (recurringState === 'nonRecurring') { getList(); }
		if (recurringState === 'recurring') { getRecurringList(); }
	}, [getList, recurringState, expenseFilters, getRecurringList]);

	useEffect(() => {
		setExpenseFilters((p) => ({
			...p,
			expenseCategory : null,
			branch          : null,
			repeatsEvery    : null,
			searchValue     : '',
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
					onChange={(e) => handleChange(e)}
					className={styles.search}
				/>
				<Button
					size="lg"
					themeType="secondary"
					onClick={() => {
						setCreateExpenseType(recurringState);
						setShowModal(true);
					}}
					style={{ background: '#F68B21', color: 'white', fontSize: '14px' }}
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
				style={{ border: '1px solid black' }}
				onClick={() => handleAddExpense(itemData)}
			>
				Add Expense
			</Button>
		),
		renderExpensePeriod: (itemData:ItemDataInterface) => {
			const { startDate, endDate } = itemData || {};
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
								<Tooltip content="Duration: x months">
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
						{currency}
						{' '}
						{maxPayoutAllowed || '-'}
					</div>
					<Tooltip content="Due on xth every month">
						<div><IcMInfo /></div>
					</Tooltip>
				</div>
			);
		},
		getPayable: (itemData:ItemDataInterface) => {
			const { grandTotal, paidAmount } = itemData || {};
			return (
				<div>
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
					{status === 'ACCEPTED' ? (
						<>
							<div>{name}</div>
							<div>{formatDate(updatedAt, 'dd MMM yyyy', {}, false) }</div>
						</>
					) : (
						<>
							<div className={styles.pending_approval}>Pending Approval</div>
							<div className={styles.link}>
								<div style={{ fontSize: '12px', marginTop: '4px' }}>
									<a href="#">Re-send Email</a>
								</div>
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
						{showOverflowingNumbers(proofDocuments[0], 13)}

					</a>
				);
			}
			const showDocuments = () => (
				<div>
					{proofDocuments.map((proof:string) => (
						<div key={proof}>
							<a
								href={proof}
								className={styles.multiple_proof}
								target="_blank"
								rel="noreferrer"
							>
								{proof}
							</a>
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
			const { billNumber } = itemData || {};
			return (
				<div>
					{ billNumber ? (
						<div className={styles.link}>
							{' '}
							<a href="#">{billNumber}</a>
						</div>
					) : '-' }
				</div>
			);
		},
	};

	const showDropDown = (singleItem:{ id?:string }) => {
		const { id } = singleItem || {};

		if (recurringState === 'recurring') return <ShowMore id={id} />;
		return null;
	};

	let listConfig:any;
	let listItemData:any;
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
		<div>
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
					page={expenseFilters.pageIndex || 1}
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
				/>
			)}

			{ showExpenseModal && (
				<AddExpenseModal
					showExpenseModal={showExpenseModal}
					setShowExpenseModal={setShowExpenseModal}
					rowData={rowData}
				/>
			) }

		</div>
	);
}

export default ExpenseComponent;
