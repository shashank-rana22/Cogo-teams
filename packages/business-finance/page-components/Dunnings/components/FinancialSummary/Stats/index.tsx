import { Input, Popover, Toggle, Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetMonthwiseStats from '../hooks/useGetMonthwiseStats';

import BarGraphView from './BarGraphView';
import LinearGraphView from './LinearGraphView';
import StatsLoader from './StatsLoader';
import styles from './styles.module.css';

interface Props {
	filters?: object;
}

const MONTH_DIVISION = 3;
const DECREMENT = 1;
const INCREMENT = 1;
const PREV_LIMIT = 5;
const START_MONTH_INDEX = 3;
const START_DAY_INDEX = 1;
const END_MONTH_INDEX = 2;
const END_DAY_INDEX = 31;
const YEAR_END_INCREMENT = 2;

function getFinancialYear(date) {
	const year = date.getFullYear();
	const month = date.getMonth();
	if (month < MONTH_DIVISION) {
		return year - DECREMENT;
	} return year;
}

function Stats({ filters = {} }:Props) {
	const [isGraphView, setIsGraphView] = useState(true);
	const [inputValue, setInputValue] = useState('');
	const [showYear, setShowYear] = useState(false);

	const [visible, setVisible] = useState(false);
	const [yearHandle, setYearHandle] = useState(false);

	const geo = getGeoConstants();
	const currency = geo.country.currency.code;

	const currentYear = new Date().getFullYear();
	const today = new Date();

	const FINANCIAL_YEARS = [];
	for (let i = 1; i <= PREV_LIMIT; i += INCREMENT) {
		const yearStart = new Date(today.getFullYear() - i, START_MONTH_INDEX, START_DAY_INDEX);
		const yearEnd = new Date(today.getFullYear() - i + YEAR_END_INCREMENT, END_MONTH_INDEX, END_DAY_INDEX);
		const financialYear = `${getFinancialYear(yearStart)}-${getFinancialYear(yearEnd)}`;
		FINANCIAL_YEARS.push(financialYear);
	}

	const CALENDER_YEAR = [];
	for (let i = 0; i < PREV_LIMIT; i += INCREMENT) {
		const year = `${currentYear - i}`;
		CALENDER_YEAR.push(year);
	}

	const { statsData, loading } = useGetMonthwiseStats({ statsFilter: inputValue, filters });

	const linearData = [
		{
			id   : 'Total Outstanding',
			data : (statsData || []).map((item) => ({
				x : `${item?.month} (${item?.year})`,
				y : item?.outstandingAmount,
			})),
		},
		{
			id   : 'Collected',
			data : (statsData || []).map((item) => ({
				x : `${item?.month} (${item?.year})`,
				y : item?.collectedAmount,
			})),
		},
	];

	const barData = (statsData || []).map((item) => {
		const { month, collectedAmount, outstandingAmount, year } = item || {};
		return (
			{
				month                : `${month} (${year})`,
				'Collected Amount'   : collectedAmount,
				'Outstanding Amount' : outstandingAmount,
			}
		);
	});

	const onClickFinancialYear = (year, type) => {
		let yearType = 'CY';
		if (type === FINANCIAL_YEARS) {
			yearType = 'FY';
		}
		setInputValue(`${yearType}-${year}`);
		setVisible(false);
		setShowYear(false);
	};

	const renderYearData = (years) => (
		<div>
			{years.map((year) => (
				<div
					key={year}
					className={styles.year_bottom_border}
					style={{ cursor: year === 'financialYears' && 'pointer' }}
				>
					<div
						key={year}
						role="presentation"
						onClick={() => onClickFinancialYear(year, years)}

					>
						{year}
					</div>
				</div>
			))}
		</div>
	);

	const yearHandleChange = () => {
		if (yearHandle) {
			return renderYearData(CALENDER_YEAR);
		}
		return renderYearData(FINANCIAL_YEARS);
	};

	const content = () => (

		<Popover
			placement="right"
			caret={false}
			render={yearHandleChange()}
			className={styles.years_styles}
			visible={visible}
		>
			<>
				<div
					className={styles.data_styles}
					onClick={() => { setYearHandle(true); setVisible(!visible); }}
					role="presentation"
				>
					Calendar Year
				</div>

				<hr />

				<div
					className={styles.data_styles}
					onClick={() => { setYearHandle(false); setVisible(true); }}
					role="presentation"
				>
					Financial Year
				</div>

				<hr />

				<div
					className={styles.data_styles}
					onClick={() => {
						setInputValue('TTM');
						setShowYear(false);
					}}
					role="presentation"
				>
					Trailing 12 Months
				</div>
			</>
		</Popover>
	);

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.flex_align}>
					<div className={styles.subject}>Statistics</div>
					<Tooltip
						content={(
							<span>
								Total Outstanding and
								<br />
								Collected Amount
								<br />
								information based on the
								<br />
								selected filter
							</span>
						)}
					>
						<div><IcMInfo /></div>
					</Tooltip>
					<div style={{ marginLeft: '20px' }}>
						<Popover
							render={content()}
							caret={false}
							placement="bottom"
							visible={showYear}
						>
							<div
								className={styles.input_div}
								onClick={() => {
									setVisible(!setVisible);
									setShowYear(!showYear);
								}}
								role="presentation"
							>
								<Input
									placeholder="Select Year Mode ▼"
									size="sm"
									value={inputValue}
								/>
							</div>
						</Popover>
					</div>
				</div>
				<div>
					<Toggle
						name="view"
						size="md"
						disabled={false}
						onLabel="Linear View"
						offLabel="Graph View"
						onChange={() => setIsGraphView(!isGraphView)}
					/>
				</div>
			</div>
			{!loading ?	(
				<div>
					{isGraphView ? (
						<BarGraphView
							barData={barData}
							currency={currency}
						/>
					)
						: (
							<div className={styles.linear_graph_container}>
								<LinearGraphView
									linearData={linearData}
									currency={currency}
								/>
							</div>
						)}

				</div>
			) : (
				<div className={styles.loader}>
					<StatsLoader />
				</div>
			)}

		</div>
	);
}

export default Stats;
