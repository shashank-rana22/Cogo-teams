import { cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useState, useEffect } from 'react';

import { PIE_CHART_CHECK } from '../../constants';
import useGetCogopointStats from '../../hooks/useGetCogopointStats';
import useListCogopointTopHistory from '../../hooks/useListCogopointTopHistory';
import getFormattedLineChartData from '../../utils/getFormattedLineChartData';

import LineChart from './Charts/LineChart';
import ChartLoadingState from './Charts/LoadingState';
import PieChart from './Charts/PieChart';
import HeaderTab from './HeaderTab';
import List from './List';
import StatsDiv from './StatsDiv';
import styles from './styles.module.css';

const START_MONTH = 0;
const START_DAY = 1;

function CogoPoints() {
	const [activeHeaderTab, setActiveHeaderTab] = useState('overall');
	const [activeStatsCard, setActiveStatsCard] = useState('liability_point_value');
	const [selectedDate, setSelectedDate] = useState({
		startDate : new Date(new Date().getFullYear(), START_MONTH, START_DAY),
		endDate   : new Date(),
	});

	const geo = getGeoConstants();
	const currencyCode = geo.country.currency.code;
	const transactionType = activeStatsCard === 'liability_point_value' ? 'credit' : 'debit';

	const { statsData = {}, loading = false } = useGetCogopointStats({ activeHeaderTab, selectedDate, currencyCode });

	const { data = {}, credit_data = {}, debit_data = {} } = statsData || {};

	const {
		topHistoryData = {},
		topHistoryLoading = false,
		setPagination = () => {},
		setSelectOrganization = () => {},
		selectOrganization = '',
	} = useListCogopointTopHistory({ transactionType, selectedDate, activeStatsCard, activeHeaderTab, currencyCode });

	const { credit_cogopoint_date_data = {}, list = [], page, page_limit, total_count } = topHistoryData;

	const formattedData = getFormattedLineChartData({ data: credit_cogopoint_date_data, selectedDate });

	const checkPieChart = (PIE_CHART_CHECK || []).includes(activeStatsCard);

	useEffect(() => {
		setActiveStatsCard('liability_point_value');
	}, [activeHeaderTab]);

	return (
		<>
			<HeaderTab
				activeHeaderTab={activeHeaderTab}
				setActiveHeaderTab={setActiveHeaderTab}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>
			{activeHeaderTab && (
				<>
					<StatsDiv
						activeStatsCard={activeStatsCard}
						setActiveStatsCard={setActiveStatsCard}
						activeHeaderTab={activeHeaderTab}
						data={data}
						loading={loading}
						currencyCode={currencyCode}
					/>

					{topHistoryLoading ? <ChartLoadingState /> : (
						<div className={styles.container}>
							<div className={cl`
			                ${styles.line_chart} 
			                ${(!checkPieChart && activeHeaderTab !== 'affiliate') && styles.no_pie_chart}`}
							>
								<div className={styles.title}>
									{activeStatsCard === 'liability_point_value'
										? 'Liability Creation Trend' : 'Cogopoint burnt trend'}

								</div>

								<LineChart
									formattedData={formattedData}
									transactionType={transactionType}
									currencyCode={currencyCode}
								/>
							</div>

							{(checkPieChart && activeHeaderTab !== 'affiliate') && (
								<div className={styles.pie_chart}>

									<div className={styles.title}>
										Cogopoint Distruibution
									</div>

									<PieChart
										creditData={credit_data}
										debitData={debit_data}
										activeStatsCard={activeStatsCard}
									/>
								</div>
							)}

						</div>
					) }
					<List
						list={list}
						loading={topHistoryLoading}
						page={page}
						page_limit={page_limit}
						total_count={total_count}
						setPagination={setPagination}
						currencyCode={currencyCode}
						activeStatsCard={activeStatsCard}
						setSelectOrganization={setSelectOrganization}
						selectOrganization={selectOrganization}
						activeHeaderTab={activeHeaderTab}
					/>
				</>
			)}
		</>
	);
}

export default CogoPoints;
