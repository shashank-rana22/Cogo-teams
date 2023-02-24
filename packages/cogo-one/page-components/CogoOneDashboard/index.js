// import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import AdminDashboard from './AdminDashboard';
import AgentDashboard from './AgentDashboard';
import styles from './styles.module.css';

function CogoOneDashboard({ isAdminView = false }) {
	// const [activeTab, setActiveTab] = useState('day');
	// const { user } = useSelector(({ profile }) => profile);
	// const {
	// 	user_data,
	// } = useSelector(({ profile }) => ({
	// 	user_data: profile || {},
	// }));

	const [calendarType, setCalendarType] = useState('day');

	return (
		<div className={styles.prime_container}>
			{isAdminView
				? <AdminDashboard calendarType={calendarType} setCalendarType={setCalendarType} />
				: <AgentDashboard calendarType={calendarType} setCalendarType={setCalendarType} />}
		</div>
	);
}
export default CogoOneDashboard;
