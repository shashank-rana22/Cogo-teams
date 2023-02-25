// import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Calender from '../../../common/Calendar';
import ChatStatistics from '../../../common/ChatStatistics';
import Header from '../../../common/Header';
import LineChart from '../../../common/LineChart';
import Statistics from '../../../common/Statistics';

import AgentActivity from './AgentActivity';
import PerformanceTab from './PerformanceTabs';
import RedFlags from './RedFlags';
import styles from './styles.module.css';

function AdminDashboard(props) {
	const {timeline, setTimeline} = props || {};
	const [activeTab, setActiveTab] = useState('day');

	return (

		<div className={styles.prime_container}>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				timeline={timeline}
				setTimeline={setTimeline}
			/>

			<div className={styles.sub_container}>
				<div className={styles.calenderchart_plus_escalations}>
					<div className={styles.calender_chart}>
						<div className={styles.calender_container}>
							<Calender props={props} />
						</div>
						<LineChart />
					</div>
					<RedFlags />
				</div>
				<div className={styles.agentactivity_plus_performancetabs}>
					<AgentActivity />
					<PerformanceTab />

				</div>
				<div className={styles.statistics_plus_characteristics}>
					<div className={styles.two_statistics}>
						<Statistics />
					</div>

					<div className={styles.four_characterisctics_container}>
						<ChatStatistics isAdminView />
					</div>
				</div>

			</div>
		</div>

	);
}
export default AdminDashboard;
