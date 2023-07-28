import Calendar from '../../common/Calendar';
import CallAnalytics from '../../common/CallAnalytics';
import ChannelMessageAnalytic from '../../common/ChannelMessageAnalytics';
import ChatStatistics from '../../common/ChatStatistics';
import Header from '../../common/Header';
import LineChart from '../../common/LineChart';

import MyStats from './MyStats';
import Statisfaction from './Statisfaction';
import styles from './styles.module.css';
import TotalChatsHandled from './TotalChatshandled';

function AgentDashboard(props) {
	const {
		timeline = '',
		setTimeline = () => {},
		data = {},
		loading = false,
		setSelectedDate = () => {},
		isRolePresent = false,
	} = props || {};
	const { calls = {}, graph = {} } = data || {};

	return (
		<div className={styles.prime_container}>
			<Header
				timeline={timeline}
				setTimeline={setTimeline}
				setSelectedDate={setSelectedDate}
			/>
			<div className={styles.sub_container}>
				<div className={styles.left_sub_container}>
					<Calendar {...props} />
					<div className={styles.linechart_container}>
						<LineChart
							graph={graph}
							timeline={timeline}
							loading={loading}
						/>
					</div>
					<div className={styles.statistics}>
						<ChannelMessageAnalytic
							loading={loading}
						/>
						<CallAnalytics callsAnalytics={calls} loading={loading} />
					</div>
				</div>
				<div className={styles.right_sub_container}>
					<TotalChatsHandled loading={loading} />
					<div className={styles.satisfaction_intent_served_box}>
						<Statisfaction loading={loading} />
						<MyStats timeline={timeline} />
					</div>
					<div className={styles.two_characterisctics_container}>
						<ChatStatistics
							isAdminView={isRolePresent}
							loading={loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default AgentDashboard;
