import { useState } from 'react';

import AdminDashboard from './AdminDashboard';
import AgentDashboard from './AgentDashboard';
import useGetCogoOneDashboard from './hooks/useGetCogoOneDashboard';
import styles from './styles.module.css';

function CogoOneDashboard({ isAdminView = true }) {
	const [timeline, setTimeline] = useState('day');
	const [calendarData, setCalendarData] = useState([]);
	const [selectedItem, setSelectedItem] = useState('');
	const selectedTimeline = (calendarData || []).filter((d) => d.key === selectedItem)?.[0];

	const { listData = {} } = useGetCogoOneDashboard({ timeline, selectedTimeline });

	console.log(listData, 'listData');

	const commomProps = {
		timeline,
		setTimeline,
		calendarData,
		setCalendarData,
		selectedItem,
		setSelectedItem,
		listData,
	};
	return (
		<div className={styles.prime_container}>
			{isAdminView
				? <AdminDashboard {...commomProps} />
				: <AgentDashboard {...commomProps} />}
		</div>
	);
}
export default CogoOneDashboard;
