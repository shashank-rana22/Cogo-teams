import { Button, Input, Popover, Tooltip } from '@cogoport/components';
import { IcMSearchlight, IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import SegmentedControl from '../../../commons/SegmentedControl/index';
import List from '../../commons/List';

import CreateExpenseModal from './CreateExpenseModal';
import ShowMore from './ShowMore';
import styles from './styles.module.css';
import { expenseRecurringConfig, expenseNonRecurringConfig } from './utils/config';
import dummyData from './utils/dummyData';
import dummyData2 from './utils/dummyData2';

function ExpenseComponent() {
	const [recurringState, setRecurringState] = useState('recurring');
	const [createExpenseType, setCreateExpenseType] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [expenseFilters, setExpenseFilters] = useState({
		expenseType : recurringState,
		searchValue : '',
		pageIndex   : 1,
		pageLimit   : 10,
	});

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

	const renderHeaders = () => (
		<div className={styles.headerContainer}>
			<div className={styles.leftContainer}>
				<div className={styles.segmentedControl}>
					<SegmentedControl
						options={OPTIONS}
						activeTab={recurringState}
						setActiveTab={setRecurringState}
						color="#ED3726"
						background="#FFFAEB"
					/>
				</div>

			</div>
			<div className={styles.rightContainer}>
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
					{recurringState === 'recurring' ? 'Create Expense Record' : 'Create Expense'}
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
		renderExpensePeriod: (itemData) => (
			<div className={styles.dataContainer}>
				<div className={styles.expensePeriodData}>
					{' '}
					{itemData?.expensePeriod}
				</div>
				<Tooltip content="Duration: x months">
					<div><IcMInfo /></div>
				</Tooltip>
			</div>
		),
		renderRecurringAmount: (itemData) => (
			<div className={styles.dataContainer}>
				<div className={styles.recurringAmountData}>
					{' '}
					{itemData?.recurringAmount}
				</div>
				<Tooltip content="Due on xth every month">
					<div><IcMInfo /></div>
				</Tooltip>
			</div>
		),
	};

	const showDropDown = () => {
		if (recurringState === 'recurring') return <ShowMore />;
		return null;
	};

	return (
		<div>
			{renderHeaders()}
			<List
				config={recurringState === 'recurring' ? expenseRecurringConfig() : expenseNonRecurringConfig()}
				itemData={recurringState === 'recurring' ? dummyData : dummyData2}
				loading={false}
				functions={functions}
				page={expenseFilters.pageIndex || 1}
				handlePageChange={(pageValue:number) => {
					setExpenseFilters((p) => ({ ...p, pageIndex: pageValue }));
				}}
				showPagination
				renderDropdown={showDropDown}
			/>
			{showModal && (
				<CreateExpenseModal
					setShowModal={setShowModal}
					showModal={showModal}
					createExpenseType={createExpenseType}
				/>
			)}
		</div>
	);
}

export default ExpenseComponent;
