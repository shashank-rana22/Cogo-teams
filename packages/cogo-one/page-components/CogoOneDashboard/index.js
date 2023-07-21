import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import AdminDashboard from './components/AdminDashboard';
import AgentDashboard from './components/AgentDashboard';
import useGetCogoOneAgentStats from './hooks/useGetCogoOneAgentStats';
import styles from './styles.module.css';

function CogoOneDashboard() {
	const {
		userRoleId,
		query,
	} = useSelector(({ profile, general }) => ({
		userRoleId    : profile.partner.user_role_ids[GLOBAL_CONSTANTS.zeroth_index],
		partnerUserId : profile.partner.partner_user_id,
		query         : general?.query,
	}));

	const [timeline, setTimeline] = useState('day');
	const [calendarData, setCalendarData] = useState([]);
	const [selectedItem, setSelectedItem] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState({
		startDate : null,
		endDate   : null,
	});

	const { view = '' } = query || {};

	const isAgentView = userRoleId.includes(GLOBAL_CONSTANTS.uuid.kam_agent_role_id);

	// const selectedTimeline = useCallback(() => (calendarData || []).filter(
	// 	(d) => format(d.date, GLOBAL_CONSTANTS.formats.date['dd MMM YYYY']) === format(
	// 		selectedItem,
	// 		GLOBAL_CONSTANTS.formats.date['dd MMM YYYY'],
	// 	),
	// )?.[GLOBAL_CONSTANTS.zeroth_index], [calendarData, selectedItem]);

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
					{isAgentView || view === 'agent'
						? <AgentDashboard {...commomProps} timeline={timeline} />
						: <AdminDashboard {...commomProps} getCogoOneDashboard={getCogoOneDashboard} />}
				</div>
			)}
		</div>
	);
}
export default CogoOneDashboard;
