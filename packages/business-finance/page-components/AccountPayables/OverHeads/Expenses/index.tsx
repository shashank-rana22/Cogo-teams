import { Button, Input, Tooltip } from '@cogoport/components';
import { IcMSearchlight, IcMInfo } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import Filter from '../../../commons/Filters';
import SegmentedControl from '../../../commons/SegmentedControl/index';
import { formatDate } from '../../../commons/utils/formatDate';
import List from '../../commons/List';
import nonRecurringFilters from '../Controls/nonRecurringFilters';

import CreateExpenseModal from './CreateExpenseModal';
import useListExpense from './hooks/useListExpense';
import ShowMore from './ShowMore';
import styles from './styles.module.css';
import { expenseRecurringConfig, expenseNonRecurringConfig } from './utils/config';
import dummyData from './utils/dummyData';

interface ItemDataInterface {
	expensePeriod?:string,
	recurringAmount?:number | string,
	grandTotal?:number,
	paidAmount?:number,
	dueDate?: Date,
	billDate?: Date,
	createdDate?:Date,
	status?: string,
	approvedBy?:string | number,
}

function ExpenseComponent() {
	const [recurringState, setRecurringState] = useState('recurring');
	const [createExpenseType, setCreateExpenseType] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [expenseFilters, setExpenseFilters] = useState({
		expenseType     : recurringState,
		expenseCategory : null,
		searchValue     : '',
		pageIndex       : 1,
		pageLimit       : 10,
	});

	const { getList, listData, listLoading } = useListExpense(expenseFilters);

	useEffect(() => {
		if (recurringState === 'nonRecurring') { getList(); }
	}, [getList, recurringState, expenseFilters.expenseCategory]);

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

	const BUTTON_TEXT = {
		recurring    : 'Create Expense Record',
		nonRecurring : 'Create Expense',
	};

	const renderHeaders = () => (
		<div className={styles.header_container}>
			<div className={styles.left_container}>

				{recurringState === 'nonRecurring' &&	(
					<Filter
						controls={nonRecurringFilters()}
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
					style={{ border: '1px solid black', fontSize: '14px' }}
				>
					{BUTTON_TEXT[recurringState]}
				</Button>
			</div>
		</div>
	);

	const functions = {
		addExpense: () => (
			<Button
				themeType="secondary"
				size="md"
				style={{ border: '1px solid black' }}
			>
				Add Expense
			</Button>
		),
		renderExpensePeriod: (itemData:ItemDataInterface) => (
			<div className={styles.data_container}>
				<div className={styles.expense_period_data}>
					{' '}
					{itemData?.expensePeriod}
				</div>
				<Tooltip content="Duration: x months">
					<div><IcMInfo /></div>
				</Tooltip>
			</div>
		),
		renderRecurringAmount: (itemData:ItemDataInterface) => (
			<div className={styles.data_container}>
				<div className={styles.recurring_amount_data}>
					{' '}
					{itemData?.recurringAmount}
				</div>
				<Tooltip content="Due on xth every month">
					<div><IcMInfo /></div>
				</Tooltip>
			</div>
		),
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
				<div>
					{dueDate && billDate && createdDate && (
						<div>
							<div>
								Due Date:
								{' '}
								{formatDate(dueDate, 'dd MMM yyyy', {}, false) }
							</div>
							<div>
								Invoice Date
								{' '}
								{ formatDate(billDate, 'dd MMM yyyy', {}, false) }
							</div>
							<div>
								Upload Date
								{' '}
								{formatDate(createdDate, 'dd MMM yyyy', {}, false) }
							</div>

						</div>
					)}
				</div>

			);
		},
		getApprovedBy: (itemData:ItemDataInterface) => {
			const { status, approvedBy } = itemData || {};
			return (
				<div>
					{status === 'INITIATED' ? 'Pending Approval' : approvedBy }
				</div>
			);
		},
	};

	const showDropDown = () => {
		if (recurringState === 'recurring') return <ShowMore />;
		return null;
	};

	let listConfig:any;
	let listItemData:any;
	let loading:boolean;
	if (recurringState === 'recurring') {
		listConfig = expenseRecurringConfig;
		listItemData = dummyData;
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
					loading={loading}
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
				/>
			)}
		</div>
	);
}

export default ExpenseComponent;
