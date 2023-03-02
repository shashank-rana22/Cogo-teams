import { useState } from 'react';

import Calender from '../../../common/Calendar';
import CallAnalytics from '../../../common/CallAnalytics';
import ChannelMessageAnalytic from '../../../common/ChannelMessageAnalytics';
import ChatStatistics from '../../../common/ChatStatistics';
import Header from '../../../common/Header';
import LineChart from '../../../common/LineChart';

import Intelligence from './Intelligence';
import IntentServed from './IntentServed';
import Statisfaction from './Statisfaction';
import styles from './styles.module.css';
// import TimeSpent from './TimeSpent';
import TotalChatsHandled from './TotalChatshandled';

function AgentDashboard(props) {
	const { timeline, setTimeline, listData, loading } = props || {};
	const [activeTab, setActiveTab] = useState('day');
	const {
		customer_satisfaction = {}, intents_served = {}, calls_analytics = {},
		channels_message_analytics = {}, cogo_one_dashboard_graph = {}, status_of_chats = {},
	} = listData || {};

	return (
		<div className={styles.prime_container}>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				timeline={timeline}
				setTimeline={setTimeline}
			/>
			<div className={styles.sub_container}>
				<div className={styles.left_sub_container}>
					<Calender props={props} />
					<LineChart cogoOneDashboardGraph={cogo_one_dashboard_graph} timeline={timeline} />
					<div className={styles.statistics}>
						<ChannelMessageAnalytic
							loading={loading}
							channelsMessageAnalytics={channels_message_analytics}
						/>
						<CallAnalytics callsAnalytics={calls_analytics} />
					</div>
				</div>
				<div className={styles.right_sub_container}>
					{/* <TimeSpent loading={loading} /> */}
					<TotalChatsHandled loading={loading} />
					<Intelligence />
					<div className={styles.satisfaction_intent_served_box}>
						<Statisfaction customerSatisfaction={customer_satisfaction} />
						<IntentServed intentsServed={intents_served} />
					</div>
					<div className={styles.two_characterisctics_container}>
						<ChatStatistics
							isAdminView={false}
							statusOfChats={status_of_chats}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default AgentDashboard;
