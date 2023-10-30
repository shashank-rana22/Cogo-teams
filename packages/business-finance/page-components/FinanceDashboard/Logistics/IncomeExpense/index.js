import { Loader, Popover, Input, Toggle, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetIncomeExpense from '../../hooks/getIncomeExpenseData';

import Content from './Content';
import RenderYearData from './RenderYearData';
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
	const [inputValue, setInputValue] = useState('');
	const [visible, setVisible] = useState(false);
	const {
		incomeExpenseData = [],
		incomeExpenseLoading,
	} = useGetIncomeExpense({ globalFilters, yearFilters, entityTabFilters });

	const onChangeToggle = () => {
		setToggleStatus(!toggleStatus);
	};

	const currentYear = new Date().getFullYear();
	const CALENDARYEAR = [];
	for (let i = 0; i < 5; i += 1) {
		const year = `${currentYear - i}`;
		CALENDARYEAR.push(year);
	}

	const today = new Date();
	const FINANCIALYEARS = [];
	for (let i = 1; i <= 5; i += 1) {
		const yearStart = new Date(today.getFullYear() - i, 3, 1);
		const yearEnd = new Date(today.getFullYear() - i + 2, 2, 31);
		const financialYear = `${getFinancialYear(yearStart)}-${getFinancialYear(yearEnd)}`;
		FINANCIALYEARS.push(financialYear);
	}

	const onClickFinancialYear = (year, type) => {
		let yearType = 'CY';
		if (type === FINANCIALYEARS) {
			yearType = 'FY';
		}
		const years = year?.split('-');
		setYearFilters(years);
		setInputValue(`${yearType} - ${year}`);
		setVisible(false);
	};

	const yearHandleChange = () => {
		if (yearHandle) {
			return RenderYearData(CALENDARYEAR, onClickFinancialYear);
		}
		return RenderYearData(FINANCIALYEARS, onClickFinancialYear);
	};

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
										A comparison between
										<br />
										consecutive months to identify
										<br />
										the
										month-on-month changes
										<br />
										in cashflow.
									</div>
								)}
								placement="right"
								caret={false}
							>
								<IcMInfo />
							</Tooltip>
						</div>
						<div style={{ marginTop: '10px', marginLeft: '20px' }}>
							<Popover
								render={
									Content({ yearHandleChange, visible, setVisible, setYearHandle })
								}
								caret={false}
								placement="bottom"
							>
								<div className={styles.input_div}>
									<Input
										placeholder="Select Year Mode"
										size="sm"
										value={inputValue || `CY - ${currentYear}`}
									/>
								</div>
							</Popover>
						</div>
					</div>

					<div className={styles.toggle_div}>
						<div style={{ marginTop: '10px' }}>Contribution Margin Graph</div>
						<Toggle
							name="a1"
							size="md"
							showOnOff
							disabled={false}
							onChange={() => onChangeToggle()}
							onLabel="Line Chart"
							offLabel="Bar Chart"
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
