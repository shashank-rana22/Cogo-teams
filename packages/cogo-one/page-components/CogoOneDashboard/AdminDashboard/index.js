// import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Calender from '../../../common/Calendar';
import CallAnalytics from '../../../common/CallAnalytics';
import ChannelMessageAnalytic from '../../../common/ChannelMessageAnalytics';
import ChatStatistics from '../../../common/ChatStatistics';
import Header from '../../../common/Header';
import LineChart from '../../../common/LineChart';

import AgentActivity from './AgentActivity';
import PerformanceTab from './PerformanceTabs';
import RedFlags from './RedFlags';
import styles from './styles.module.css';

function AdminDashboard(props) {
	const { timeline, setTimeline, listData, loading, emptyState } = props || {};
	const {
		escalations = [],
		calls_analytics = {},
		channels_message_analytics = {},
		agents_details = {},
		agents_performance = {},
		status_of_chats = {},
	} = listData || {};
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
					<RedFlags escalations={escalations} loading={loading} />
				</div>
				<div className={styles.agentactivity_plus_performancetabs}>
					<AgentActivity emptyState={emptyState} agents_details={agents_details} />
					<PerformanceTab agents_performance={agents_performance} />

				</div>
				<div className={styles.statistics_plus_characteristics}>
					<div className={styles.two_statistics}>
						<ChannelMessageAnalytic
							channels_message_analytics={channels_message_analytics}
							loading={loading}
						/>
						<CallAnalytics
							callsAnalytics={calls_analytics}
							loading={loading}
						/>
					</div>

					<div className={styles.four_characterisctics_container}>
						<ChatStatistics
							isAdminView
							status_of_chats={status_of_chats}
						/>
					</div>
				</div>

			</div>
		</div>

	);
}
export default AdminDashboard;
