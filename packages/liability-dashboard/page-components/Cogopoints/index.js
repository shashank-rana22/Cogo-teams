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

function CogoPoints() {
	const [activeHeaderTab, setActiveHeaderTab] = useState('overall');
	const [activeStatsCard, setActiveStatsCard] = useState('liability_point_value');
	const [selectedDate, setSelectedDate] = useState({});

	const geo = getGeoConstants();
	const currencyCode = geo.country.currency.code;
	const transactionType = activeStatsCard === 'liability_point_value' ? 'credit' : 'debit';

	const { statsData = {}, loading } = useGetCogopointStats({ activeHeaderTab, selectedDate });

	const { data = {}, credit_data = {}, debit_data = {} } = statsData || {};

	const {
		topHistoryData = {},
		topHistoryLoading = false,
		setPagination = () => {},
	} = useListCogopointTopHistory({ transactionType, selectedDate, activeStatsCard });

	const { credit_cogopoint_date_data = {}, list = [], page, page_limit, total_count } = topHistoryData;

	const formattedData = getFormattedLineChartData(credit_cogopoint_date_data);

	const checkPieChart = (PIE_CHART_CHECK || []).includes(activeStatsCard);

	useEffect(() => setSelectedDate({}), [activeHeaderTab, setSelectedDate]);

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
					/>

					{topHistoryLoading ? <ChartLoadingState /> : (
						<div className={styles.container}>
							<div className={cl`
			                ${styles.line_chart} 
			                ${!checkPieChart && styles.no_pie_chart}`}
							>
								<LineChart
									formattedData={formattedData}
									transactionType={transactionType}
									currencyCode={currencyCode}
								/>
							</div>

							{checkPieChart && (
								<div className={styles.pie_chart}>
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
					/>
				</>
			)}
		</>
	);
}

export default CogoPoints;
