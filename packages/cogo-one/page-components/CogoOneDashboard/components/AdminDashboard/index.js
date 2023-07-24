import { useState } from 'react';

import Calendar from '../../common/Calendar';
import CallAnalytics from '../../common/CallAnalytics';
import ChannelMessageAnalytic from '../../common/ChannelMessageAnalytics';
import ChatStatistics from '../../common/ChatStatistics';
import Header from '../../common/Header';
import LineChart from '../../common/LineChart';

import AgentActivity from './AgentActivity';
import Escalation from './Escalations';
import PerformanceTab from './PerformanceTabs';
import styles from './styles.module.css';

function AdminDashboard(props) {
	const {
		timeline,
		setTimeline,
		data,
		loading,
		setSelectedDate = () => {},
	} = props || {};

	const { calls = {}, graph = {} } = data || {};

	const [activeTab, setActiveTab] = useState('active');

	return (

		<div className={styles.prime_container}>
			<Header
				timeline={timeline}
				setTimeline={setTimeline}
				setSelectedDate={setSelectedDate}
			/>
			<div className={styles.sub_container}>
				<div className={styles.calenderchart_plus_escalations}>
					<div className={styles.calender_chart}>
						<div className={styles.calender_container}>
							<Calendar {...props} />
						</div>
						<LineChart
							graph={graph}
							timeline={timeline}
							loading={loading}
						/>
					</div>
					<Escalation />
				</div>
				<div className={styles.agentactivity_plus_performancetabs}>
					<AgentActivity
						activeTab={activeTab}
						setActiveTab={setActiveTab}

					/>
					<PerformanceTab />
				</div>
				<div className={styles.statistics_plus_characteristics}>
					<div className={styles.two_statistics}>
						<ChannelMessageAnalytic
							loading={loading}
						/>
						<CallAnalytics callsAnalytics={calls} loading={loading} />
					</div>
					<div className={styles.four_characterisctics_container}>
						<ChatStatistics isAdminView loading={loading} />
					</div>
				</div>
			</div>
		</div>
	);
}
export default AdminDashboard;
