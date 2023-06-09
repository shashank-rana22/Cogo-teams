import React, { useState } from 'react';

import useGetCogopointStats from '../../hooks/useGetCogopointStats';

import LineChart from './Charts/LineChart';
import PieChart from './Charts/PieChart';
import HeaderTab from './HeaderTab';
import StatsDiv from './StatsDiv';
import styles from './styles.module.css';

function CogoPoints() {
	const [activeHeaderTab, setActiveHeaderTab] = useState('overall');
	const [activeStatsCard, setActiveStatsCard] = useState('liability_point_value');

	const { statsData = {}, loading } = useGetCogopointStats({ activeHeaderTab });
	const { data = {}, credit_data = {} } = statsData || {};
	return (
		<>
			<HeaderTab activeHeaderTab={activeHeaderTab} setActiveHeaderTab={setActiveHeaderTab} />
			{activeHeaderTab && (
				<>
					<StatsDiv
						activeStatsCard={activeStatsCard}
						setActiveStatsCard={setActiveStatsCard}
						activeHeaderTab={activeHeaderTab}
						data={data}
						loading={loading}
					/>
					<div className={styles.container}>
						<div className={styles.line_chart}>
							<LineChart />
						</div>
						<div className={styles.pie_chart}>
							<PieChart credit_data={credit_data} />
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default CogoPoints;
