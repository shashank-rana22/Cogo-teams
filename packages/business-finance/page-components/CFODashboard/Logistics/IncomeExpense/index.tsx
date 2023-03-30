import { Loader, Popover, Input, Toggle, Tooltip } from '@cogoport/components';
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

function IncomeExpense({ globalFilters, entityTabFilters }) {
	const [toggleStatus, setToggleStatus] = useState(false);
	const [yearHandle, setYearHandle] = useState(false);
	const [yearFilters, setYearFilters] = useState([]);
	const {
		incomeExpenseData = [],
		incomeExpenseLoading,
	} = useGetIncomeExpense({ globalFilters, yearFilters, entityTabFilters });

	const onChangeToggle = () => {
		setToggleStatus(!toggleStatus);
	};

	const currentYear = new Date().getFullYear();
	const calendarYear = [];
	for (let i = 0; i < 5; i += 1) {
		const year = `${currentYear - i}`;
		calendarYear.push(year);
	}

	const today = new Date();
	const financialYears = [];
	for (let i = 1; i <= 5; i += 1) {
		const yearStart = new Date(today.getFullYear() - i, 3, 1);
		const yearEnd = new Date(today.getFullYear() - i + 2, 2, 31);
		const financialYear = `${getFinancialYear(yearStart)}-${getFinancialYear(yearEnd)}`;
		financialYears.push(financialYear);
	}

	const onClickFinancialYear = (year) => {
		const years = year?.split('-');
		setYearFilters(years);
	};

	const calendarYearData = () => (
		<div>
			{calendarYear.map((year) => (
				<div style={{ marginBottom: '10px' }}>
					<div
						key={year}
						role="presentation"
						onClick={() => onClickFinancialYear(year)}
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
				<div style={{ marginBottom: '10px', cursor: 'pointer' }}>
					<div
						key={year}
						onClick={() => onClickFinancialYear(year)}
						role="presentation"
						style={{ cursor: 'pointer' }}
					>
						{year}

					</div>
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
			<>
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
			</>
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
							<Tooltip
								content={(
									<div className={styles.text_styles}>
										A comparison between consecutive months to identify the
										month-on-month changes in cashflow.
									</div>
								)}
								placement="right"
								caret={false}
							>
								<IcMInfo />
							</Tooltip>
						</div>
						<div style={{ marginTop: '10px', marginLeft: '20px' }}>
							<Popover render={content()} caret={false} placement="bottom">
								<div style={{ width: '140px', padding: '-10px' }}>
									<Input placeholder="Select Year Mode" size="sm" />
								</div>
							</Popover>
						</div>
					</div>

					<div style={{ display: 'flex', gap: '8px', marginRight: '50px' }}>
						<div style={{ marginTop: '10px' }}>Contribution Margin Line Graph</div>
						<Toggle
							name="a1"
							size="md"
							showOnOff
							disabled={false}
							onChange={() => onChangeToggle()}
							value={String(toggleStatus)}
						/>
					</div>
				</div>

				{toggleStatus ? (
					<div className={styles.responsive_line_chart}>
						{incomeExpenseLoading ? (
							<div className={styles.line_chart_loader}>
								<Loader style={{ width: '80px' }} />
							</div>
						) : (
							<ResponsiveLineChart lineData={incomeExpenseData} />
						)}
					</div>

				) : (
					<div className={styles.responsive_bar_chart}>
						{incomeExpenseLoading ? (
							<div className={styles.bar_chart_loader}>
								<Loader style={{ width: '80px' }} />
							</div>
						) : (
							<ResponsiveBarChart barData={incomeExpenseData} />
						)}
					</div>
				)}

			</div>
		</div>
	);
}

export default IncomeExpense;
