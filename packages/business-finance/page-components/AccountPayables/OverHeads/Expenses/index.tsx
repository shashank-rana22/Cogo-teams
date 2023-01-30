import { Button, Input, Popover, Tooltip } from '@cogoport/components';
import { IcMSearchlight, IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../../commons/List';
import SegmentedControl from '../../../commons/SegmentedControl/index';

import CreateExpenseModal from './CreateExpenseModal';
import styles from './styles.module.css';
import { expenseRecurringConfig, expenseNonRecurringConfig } from './utils/config';
import dummyData from './utils/dummyData';
import dummyData2 from './utils/dummyData2';

function ExpenseComponent() {
	const [recurringState, setRecurringState] = useState('recurring');
	const [createExpenseType, setCreateExpenseType] = useState('');
	const [visible, setVisible] = useState(false);
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

	const handleChange = (e) => {
		setExpenseFilters((previousState) => ({
			...previousState,

		}));
	};
	const expenseType = () => (
		<div>
			<button
				className={styles.recurringButtons}
				onClick={() => {
					setCreateExpenseType('RECURRING');
					setShowModal(true);
					setVisible(false);
				}}
			>
				Recurring
			</button>
			<div className={styles.underline} />
			<button
				className={styles.recurringButtons}
				onClick={() => {
					setCreateExpenseType('NON RECURRING');
					setShowModal(true);
					setVisible(false);
				}}
			>
				Non-Recurring
			</button>
		</div>
	);

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
				<Popover visible={visible} render={expenseType()} placement="bottom">
					<Button
						size="lg"
						themeType="secondary"
						onClick={() => setVisible(!visible)}
					>
						Create Expense
					</Button>
				</Popover>

				<Input
					size="md"
					placeholder="Search by Vendor Name/PAN/Organization ID/Sage ID"
					prefix={<IcMSearchlight />}
					value={expenseFilters.searchValue}
					onChange={(e) => handleChange(e)}
					className={styles.search}
				/>
			</div>
		</div>
	);

	const functions = {
		addExpense          : () => <Button themeType="secondary" size="md">Add Expense</Button>,
		renderExpensePeriod : (itemData) => (
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
