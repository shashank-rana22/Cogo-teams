import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import Calendar from '../../common/Calendar';
import CallAnalytics from '../../common/CallAnalytics';
import ChannelMessageAnalytic from '../../common/ChannelMessageAnalytics';
import ChatStatistics from '../../common/ChatStatistics';
import Header from '../../common/Header';
import LineChart from '../../common/LineChart';
import useGetCogoOneAgentStats from '../../hooks/useGetCogoOneAgentStats';

import MyStats from './MyStats';
import Statisfaction from './Statisfaction';
import styles from './styles.module.css';
import TotalChatsHandled from './TotalChatshandled';

function AgentDashboard({ isRolePresent = false }) {
	const { query } = useRouter();

	const { id = '' } = query || {};

	const [timeline, setTimeline] = useState('day');
	const [calendarData, setCalendarData] = useState([]);
	const [selectedItem, setSelectedItem] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState({
		startDate : null,
		endDate   : null,
	});

	const {
		loading = false,
		data = {},
		getCogoOneDashboard = () => {},
	} = useGetCogoOneAgentStats({ timeline, selectedDate, id, isRolePresent });

	const props = {
		timeline,
		setTimeline,
		calendarData,
		setCalendarData,
		selectedItem,
		setSelectedItem,
		setSelectedDate,
		getCogoOneDashboard,
	};

	const { calls = [], graph = {}, feedback = [], messages = [] } = data || {};

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
							messages={messages}
						/>
						<CallAnalytics callsAnalytics={calls} loading={loading} />
					</div>
				</div>
				<div className={styles.right_sub_container}>
					<TotalChatsHandled agentId={id} timeline={timeline} />
					<div className={styles.satisfaction_intent_served_box}>
						<Statisfaction loading={loading} feedback={feedback} />
						<MyStats
							timeline={timeline}
							agentId={id}
							calls={calls}
							loading={loading}
							isRolePresent={isRolePresent}
						/>
					</div>
					<div className={cl`${(isRolePresent)
						? styles.agent_view : styles.two_characterisctics_container}`}
					>
						<ChatStatistics
							isAdminView={false}
							agentId={id}
							timeline={timeline}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default AgentDashboard;
