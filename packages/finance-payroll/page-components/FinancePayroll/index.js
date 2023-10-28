import { Button } from '@cogoport/components';
import { useForm, SelectController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowNext, IcMPlus, IcMTaskCompleted } from '@cogoport/icons-react';
import { isNumber } from '@cogoport/utils';
import React, { useState, useMemo, useEffect } from 'react';

import useGetNextPayroll from '../../hooks/useGetNextPayroll';
import useGetPayrollFinanceDetails from '../../hooks/useGetPayrollFinanceDetails';
import useListPayroll from '../../hooks/useListPayroll';

import FinanceTable from './FinanceTable';
import styles from './styles.module.css';

const CARDDATA = [
	{ label: 'Amount Distributed', value: 'amount_disbursed' },
	{ label: 'Batches', value: 'batches' },
	{ label: 'Irregular Payments', value: 'irregular_payments' },
	{ label: 'Tax Collected', value: 'tax_collected' },
	{ label: 'PF Collected', value: 'pf_collected' },
	{ label: 'Employees paid till now', value: 'employees_paid' },
];

const MONTH_NAMES = [
	'January', 'February', 'March', 'April',
	'May', 'June', 'July', 'August',
	'September', 'October', 'November', 'December',
];
const ARROW_RIGHT_TOP = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/arrow-top-right.svg';
const TWO = GLOBAL_CONSTANTS.two;

// const list = ['march', 'april'];
function FinancePayroll() {
	const { data :list } = useGetNextPayroll({ return_list: true });
	const { data, getNextPayrollDashboard, loading } = useGetPayrollFinanceDetails();
	console.log('🚀 ~ file: index.js:32 ~ FinancePayroll ~ data:', data);
	const { data:datalist, refetch, filters, setFilters } = useListPayroll();
	console.log('🚀 ~ file: index.js:38 ~ FinancePayroll ~ datalist:', datalist);
	const month = new Date().getMonth();
	const monthString = MONTH_NAMES[month];
	const year = new Date().getFullYear();

	const [selectedMonth, setSelectedMonth] = useState('');

	const MONTH_OBJS = useMemo(() => {
		if (list) {
			return list.map((name) => ({ label: name, value: name }));
		}
		return [];
	}, [list]);
	// useEffect(() => {
	// 	setSelectedMonth(list?.[GLOBAL_CONSTANTS.zeroth_index] || ''); // Set initial value
	// }, [list]);

	const { control, setValue } = useForm();

	const handleMonthChange = (selectedValue) => {
		setSelectedMonth(selectedValue);
		getNextPayrollDashboard({ selectedValue });
		refetch({ selectedValue });
		// getEmployeePayrollOverview({ payload: selectedValue });
	};

	useEffect(() => {
		setValue('month_year', selectedMonth || list?.[GLOBAL_CONSTANTS.zeroth_index]);
	}, [setValue, selectedMonth, list]);

	return (
		<div className={styles.main}>
			<div className={styles.top_text} />
			<div className={styles.head_flex}>
				<span className={styles.heading}>Finance(Payroll)</span>
				<div className={styles.buttons}>
					<Button size="md" themeType="secondary">
						<div className={styles.button_text_container}>
							<span className={styles.button_text}>New request</span>
							<IcMPlus width={18} height={18} />
						</div>
					</Button>
					<Button size="md" themeType="primary">
						<div className={styles.button_text_container}>
							<span className={styles.button_text}>My Inbox</span>
							<IcMTaskCompleted width={18} height={18} />
						</div>
					</Button>
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.header}>
					<div>
						<div className={styles.heading}>Welcome back, Suchita!</div>
						<div className={styles.lower_text}>Your payroll dashboard</div>
					</div>
					<div className={styles.buttons_div}>
						<SelectController
							name="month_year"
							size="md"
							control={control}
							options={list
								? list.map((name) => ({ label: name, value: name }))
								: []}
							onChange={handleMonthChange}
						/>
					</div>
				</div>
				{/* <Select options={options} /> */}

				<div className={styles.dashboard}>
					<div className={styles.dashboard_header}>
						<span className={styles.dashboard_heading_left}>
							{selectedMonth || `${monthString} ${year}`}
						</span>
						<div className={styles.dashboard_heading_right}>
							complete by 25th of every month
						</div>
					</div>

					<div className={styles.card_section}>
						{ CARDDATA.map((item) => (
							<div className={styles.expense_card} key={item.label}>
								{console.log(data?.[item.value], 'test')}
								<span className={styles.card_value}>{data?.[item.value]?.current_value}</span>
								<span className={styles.card_label}>{item.label}</span>
								{parseFloat(1)
					< GLOBAL_CONSTANTS.zeroth_index ? (
						<div className={styles.icon_arrow_down}>
							<IcMArrowNext className={styles.arrow_icon_down} />
							{isNumber(parseFloat(data?.[item.value]?.growth))
								? parseFloat(data?.[item.value]?.growth).toFixed(TWO) : '-'}
							{' '}
							%
							<span className={styles.compare_month}>
								{' '}
								vs
								{' '}
								{data?.[item.value]?.last_month_value}
								{' '}
								last month
							</span>
						</div>
									) : (
										<div className={styles.icon_arrow_up}>
											<img src={ARROW_RIGHT_TOP} alt="Arrow_Top_Right" />
											{isNumber(parseFloat(data?.[item.value]?.growth))
												? parseFloat(data?.[item.value]?.growth).toFixed(TWO) : '-'}
											{' '}
											%
											<span className={styles.compare_month}>
												{' '}
												vs
												{' '}
												{data?.[item.value]?.last_month_value}
												{' '}
												last month
											</span>
										</div>
									)}
							</div>
						))}
					</div>

				</div>

				<FinanceTable
					data={datalist}
					loading={loading}
					filters={filters}
					setFilters={setFilters}
					refetch={refetch}
					selectedMonth={selectedMonth}
				/>
			</div>

		</div>
	);
}

export default FinancePayroll;
