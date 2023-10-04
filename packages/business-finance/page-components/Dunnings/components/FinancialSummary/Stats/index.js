import { Input, Popover, Toggle, Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetMonthwiseStats from '../hooks/useGetMonthwiseStats';

import BarGraphView from './BarGraphView';
import { getBarData, getLinearData } from './getGraphData';
import { CALENDER_YEAR, FINANCIAL_YEARS } from './getYears';
import LinearGraphView from './LinearGraphView';
import StatsLoader from './StatsLoader';
import styles from './styles.module.css';
import YearData from './YearData';

interface Props {
	filters?: object;
}

function Stats({ filters = {} }:Props) {
	const [isGraphView, setIsGraphView] = useState(true);
	const [inputValue, setInputValue] = useState('');
	const [showYear, setShowYear] = useState(false);
	const [visible, setVisible] = useState(false);
	const [yearHandle, setYearHandle] = useState(false);
	const geo = getGeoConstants();
	const currency = geo.country.currency.code;

	const { statsData, loading } = useGetMonthwiseStats({ statsFilter: inputValue, filters });

	const linearData = getLinearData({ statsData });
	const barData = getBarData({ statsData });

	const onClickFinancialYear = (year, type) => {
		let yearType = 'CY';
		if (type === FINANCIAL_YEARS) {
			yearType = 'FY';
		}
		setInputValue(`${yearType}-${year}`);
		setVisible(false);
		setShowYear(false);
	};

	const yearHandleChange = () => (
		<YearData
			years={yearHandle
				? CALENDER_YEAR : FINANCIAL_YEARS}
			onClickFinancialYear={onClickFinancialYear}
		/>
	);

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
					onClick={() => { setYearHandle(true); setVisible((prev) => !prev); }}
					role="presentation"
				>
					Calendar Year
				</div>
				<hr />
				<div
					className={styles.data_styles}
					role="presentation"
					onClick={() => { setYearHandle(false); setVisible(true); }}
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
									setVisible((prev) => !prev);
									setShowYear((prev) => !prev);
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
						onChange={() => setIsGraphView((prev) => !prev)}
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
