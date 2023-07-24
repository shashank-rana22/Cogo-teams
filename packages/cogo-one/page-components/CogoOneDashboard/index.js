import { useState } from 'react';

import AdminDashboard from './components/AdminDashboard';
// import AgentDashboard from './components/AgentDashboard';
import useGetCogoOneAgentStats from './hooks/useGetCogoOneAgentStats';
import styles from './styles.module.css';

function CogoOneDashboard() {
	// COMMENTED CODE ARE DISABLE FOR MEAN-WHILE

	// const {
	// 	userRoleId,
	// 	query,
	// } = useSelector(({ profile, general }) => ({
	// 	userRoleId    : profile.partner.user_role_ids[GLOBAL_CONSTANTS.zeroth_index],
	// 	partnerUserId : profile.partner.partner_user_id,
	// 	query         : general?.query,
	// }));

	const [timeline, setTimeline] = useState('day');
	const [calendarData, setCalendarData] = useState([]);
	const [selectedItem, setSelectedItem] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState({
		startDate : null,
		endDate   : null,
	});

	// const { view = '' } = query || {};

	// const isAgentView = userRoleId.includes(GLOBAL_CONSTANTS.uuid.kam_agent_role_id);

	const {
		loading = false,
		data = {},
		getCogoOneDashboard = () => {},
	} = useGetCogoOneAgentStats({ timeline, selectedDate });

	const commomProps = {
		timeline,
		setTimeline,
		calendarData,
		setCalendarData,
		selectedItem,
		setSelectedItem,
		data,
		loading,
		setSelectedDate,
	};

	return (
		<div>
			{selectedItem && (
				<div className={styles.prime_container}>
					<AdminDashboard {...commomProps} getCogoOneDashboard={getCogoOneDashboard} />
					{/* {isAgentView || view === 'agent'
						? <AgentDashboard {...commomProps} timeline={timeline} />
						: <AdminDashboard {...commomProps} getCogoOneDashboard={getCogoOneDashboard} />} */}
				</div>
			)}
		</div>
	);
}
export default CogoOneDashboard;
