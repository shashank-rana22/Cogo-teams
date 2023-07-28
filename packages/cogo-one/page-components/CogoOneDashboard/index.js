import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import getViewTypeMapping from '../../constants/IDS_CONSTANTS';

import AdminDashboard from './components/AdminDashboard';
import AgentDashboard from './components/AgentDashboard';
import useGetCogoOneAgentStats from './hooks/useGetCogoOneAgentStats';
import styles from './styles.module.css';

function CogoOneDashboard() {
	const {
		userData,
	} = useSelector(({ profile }) => ({
		userData: profile.partner,
	}));

	const { user_role_ids: userRoleIds = [] } = userData || {};

	const { ROLE_IDS_CHECK } = getViewTypeMapping();

	const isRolePresent = userRoleIds.some((itm) => ROLE_IDS_CHECK.kam_view.includes(itm));

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

	if (!selectedItem) {
		return null;
	}

	return (
		<div>
			{selectedItem && (
				<div className={styles.prime_container}>
					{isRolePresent
						? <AgentDashboard {...commomProps} isRolePresent={isRolePresent} />
						: <AdminDashboard {...commomProps} getCogoOneDashboard={getCogoOneDashboard} />}
				</div>
			)}
		</div>
	);
}
export default CogoOneDashboard;
