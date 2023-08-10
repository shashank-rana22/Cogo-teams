import { cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useState, useEffect } from 'react';

import { PIE_CHART_CHECK, LINE_CHART_TITLE_MAPPING } from '../../constants';
import useGetCogopointStats from '../../hooks/useGetCogopointStats';
import useListCogopointTopHistory from '../../hooks/useListCogopointTopHistory';
import getFormattedLineChartData from '../../utils/getFormattedLineChartData';

import LineChart from './Charts/LineChart';
import ChartLoadingState from './Charts/LoadingState';
import PieChart from './Charts/PieChart';
import HeaderTab from './HeaderTab';
import List from './List';
import Stats from './Stats';
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

	const { statsData = {}, loading = false } = useGetCogopointStats({ activeHeaderTab, selectedDate, currencyCode });

	const { data = {}, credit_data = {}, debit_data = {} } = statsData || {};

	const {
		topHistoryData = {},
		topHistoryLoading = false,
		setPagination = () => {},
		setSelectOrganization = () => {},
		selectOrganization = '',
	} = useListCogopointTopHistory({ selectedDate, activeStatsCard, activeHeaderTab, currencyCode });

	const { credit_cogopoint_date_data = {}, list = [], page, page_limit, total_count } = topHistoryData;

	const formattedData = getFormattedLineChartData({ data: credit_cogopoint_date_data, selectedDate });

	const checkPieChart = (PIE_CHART_CHECK || []).includes(activeStatsCard);

	const checkPieChartDataInMainTab = (PIE_CHART_CHECK || []).includes(activeHeaderTab);

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
					<Stats
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
			                ${(!checkPieChart || checkPieChartDataInMainTab) && styles.no_pie_chart}`}
							>
								<div className={styles.title}>
									{LINE_CHART_TITLE_MAPPING[activeStatsCard] }

								</div>

								<LineChart
									formattedData={formattedData}
									currencyCode={currencyCode}
									activeStatsCard={activeStatsCard}
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
						pageLimit={page_limit}
						totalCount={total_count}
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
