/* eslint-disable max-len */
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useState } from 'react';

import AdminDashboard from './AdminDashboard';
import AgentDashboard from './AgentDashboard';
import useGetCogoOneDashboard from './hooks/useGetCogoOneDashboard';
import styles from './styles.module.css';

function CogoOneDashboard() {
	const [timeline, setTimeline] = useState('day');
	const [calendarData, setCalendarData] = useState([]);
	const [selectedItem, setSelectedItem] = useState(format(new Date(), 'dd MMM YYYY'));
	const selectedTimeline = (calendarData || []).filter((d) => format(d.date, 'dd MMM YYYY') === format(selectedItem, 'dd MMM YYYY'))?.[0];

	const { loading, listData = {} } = useGetCogoOneDashboard({ timeline, selectedTimeline, selectedItem });

	const {
		userRoleId,
	} = useSelector(({ profile }) => ({
		userRoleId: profile.partner.user_role_ids[0]
		|| {},
	}));
	const kamAgentId = '0bc8c199-09ed-4a85-b3a3-a855f05a2716'; // KAM - SME Demand
	const isAgentView = userRoleId.includes(kamAgentId);

	const commomProps = {
		timeline,
		setTimeline,
		calendarData,
		setCalendarData,
		selectedItem,
		setSelectedItem,
		listData,
		loading,
	};

	return (
		<div>
			{selectedItem && (
				<div className={styles.prime_container}>
					{isAgentView
						? <AgentDashboard {...commomProps} />
						: <AdminDashboard {...commomProps} />}
				</div>
			)}
		</div>
	);
}
export default CogoOneDashboard;
