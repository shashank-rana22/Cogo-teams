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

function AdminDashboard({ calendarType, setCalendarType }) {
	const [activeTab, setActiveTab] = useState('day');
	// const { user } = useSelector(({ profile }) => profile);
	// const {
	// 	user_data,
	// } = useSelector(({ profile }) => ({
	// 	user_data: profile || {},
	// }));

	// console.log('user_data', user_data);

	return (

		<div className={styles.prime_container}>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				calendarType={calendarType}
				setCalendarType={setCalendarType}
			/>

			<div className={styles.sub_container}>
				<div className={styles.calenderchart_plus_escalations}>
					<div className={styles.calender_chart}>
						<Calender calendarType={calendarType} />
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
