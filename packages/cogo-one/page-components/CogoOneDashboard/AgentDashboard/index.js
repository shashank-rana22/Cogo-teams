// import Calendar from '../common/Calendar';
import CallAnalytics from '../common/CallAnalytics';
import ChannelMessageAnalytic from '../common/ChannelMessageAnalytics';
import ChatStatistics from '../common/ChatStatistics';
import Header from '../common/Header';
import LineChart from '../common/LineChart';

import Improvement from './Improvement';
import IntentServed from './IntentServed';
import Statisfaction from './Statisfaction';
import styles from './styles.module.css';
import TotalChatsHandled from './TotalChatshandled';

function AgentDashboard(props) {
	const { timeline = '', setTimeline = () => {}, listData = {}, loading = false } = props || {};

	const {
		customer_satisfaction = {}, intents_served = {}, calls_analytics = {},
		channels_message_analytics = {}, cogo_one_dashboard_graph = {}, status_of_chats = {}, total_customers = '',
		agent_delay = '',
	} = listData || {};

	return (
		<div className={styles.prime_container}>
			<Header
				timeline={timeline}
				setTimeline={setTimeline}
			/>
			<div className={styles.sub_container}>
				<div className={styles.left_sub_container}>
					{/* <Calendar props={props} /> */}
					<div className={styles.linechart_container}>
						<LineChart
							cogoOneDashboardGraph={cogo_one_dashboard_graph}
							timeline={timeline}
							loading={loading}
						/>
					</div>
					<div className={styles.statistics}>
						<ChannelMessageAnalytic
							loading={loading}
							channelsMessageAnalytics={channels_message_analytics}
						/>
						<CallAnalytics callsAnalytics={calls_analytics} loading={loading} />
					</div>
				</div>
				<div className={styles.right_sub_container}>
					<TotalChatsHandled loading={loading} totalCustomers={total_customers} />
					<Improvement loading={loading} agentDelay={agent_delay} />
					<div className={styles.satisfaction_intent_served_box}>
						<Statisfaction customerSatisfaction={customer_satisfaction} loading={loading} />
						<IntentServed intentsServed={intents_served} loading={loading} />
					</div>
					<div className={styles.two_characterisctics_container}>
						<ChatStatistics
							isAdminView={false}
							statusOfChats={status_of_chats}
							loading={loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default AgentDashboard;
