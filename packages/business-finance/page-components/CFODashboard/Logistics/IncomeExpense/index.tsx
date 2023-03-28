import { Popover, Input, Toggle } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetIncomeExpense from '../../hooks/getIncomeExpenseData';

import ResponsiveBarChart from './ResponsiveBarChart/index';
import ResponsiveLineChart from './ResponsiveLineChart';
import styles from './styles.module.css';

function getFinancialYear(date) {
	const year = date.getFullYear();
	const month = date.getMonth();
	if (month < 3) {
		return year - 1;
	} return year;
}

function IncomeExpense({ globalFilters }) {
	const [toggleStatus, setToggleStatus] = useState(false);
	const [yearHandle, setYearHandle] = useState(false);
	const {
		incomeExpenseData = [],
	} = useGetIncomeExpense({ globalFilters });

	const onChangeToggle = () => {
		setToggleStatus(!toggleStatus);
	};

	const currentYear = new Date().getFullYear();
	const calendarYear = [];
	for (let i = 0; i < 5; i++) {
		calendarYear.push(currentYear - i);
	}

	const today = new Date();
	const financialYears = [];
	for (let i = 1; i <= 5; i++) {
		const yearStart = new Date(today.getFullYear() - i, 3, 1);
		const yearEnd = new Date(today.getFullYear() - i + 2, 2, 31);
		const financialYear = `${getFinancialYear(yearStart)}-${getFinancialYear(yearEnd)}`;
		financialYears.push(financialYear);
	}

	const calendarYearData = () => (
		<div>
			{calendarYear.map((year) => (
				<div style={{ marginBottom: '10px' }}>
					<div
						key={year}
						role="presentation"
					>
						{year}

					</div>
					<div className={styles.year_bottom_border} />
				</div>
			))}
		</div>
	);
	const financialYearData = () => (
		<div>
			{financialYears.map((year) => (
				<div style={{ marginBottom: '10px' }}>
					<div key={year}>{year}</div>
					<div className={styles.year_bottom_border} />
				</div>
			))}
		</div>
	);
	const yearHandleChange = () => {
		if (yearHandle) {
			return calendarYearData();
		}
		return financialYearData();
	};
	const content = () => (

		<Popover placement="right" caret={false} render={yearHandleChange()} className={styles.years_styles}>
			<div
				className={styles.data_styles}
				onClick={() => { setYearHandle(true); }}
				role="presentation"
			>
				Calendar Year

			</div>
			<div className={styles.borders} />
			<div
				className={styles.data_styles}
				onClick={() => { setYearHandle(false); }}
				role="presentation"
			>
				Financial Year

			</div>
		</Popover>

	);

	return (
		<div>
			<div className={styles.card}>
				<div className={styles.main_div}>

					<div className={styles.text_filters_gap}>
						<div className={styles.text_style}>
							Income & Expense
							<div className={styles.border} />
						</div>
						<div className={styles.icon}>
							<IcMInfo />
						</div>
						<div style={{ marginTop: '10px', marginLeft: '20px' }}>
							<Popover content={content()} caret={false}>
								<div style={{ width: '140px', padding: '-10px' }}>
									<Input />
								</div>
							</Popover>
						</div>
					</div>

					<div style={{ display: 'flex', gap: '8px', marginRight: '50px' }}>
						{/* <Toggle name="a4" size="md" disabled={false} onLabel="Post Tax" offLabel="Pre Tax" /> */}
						<div style={{ marginTop: '10px' }}>Contribution Margin Line Graph</div>
						<Toggle
							name="a1"
							size="md"
							showOnOff
							disabled={false}
							onChange={() => onChangeToggle()}
							value={toggleStatus}
						/>
					</div>
				</div>
				{toggleStatus ? (
					<div className={styles.responsive_line_chart}>
						<ResponsiveLineChart lineData={incomeExpenseData} />
					</div>

				) : (
					<div className={styles.responsive_bar_chart}>
						<ResponsiveBarChart barData={incomeExpenseData} />
					</div>
				)}

			</div>
		</div>
	);
}

export default IncomeExpense;
