import { useState } from 'react';

import useListTopTenReferral from '../../../hooks/useListTopTenReferral';
import ActivityModal from '../../Dashboard/ActivityModal';

import NetworkList from './NetworkList';
import PerformanceStats from './PerformaceStats';
import styles from './styles.module.css';
import UserList from './UsersList';

function UserPerformance({ selectedDate = {}, setSelectedDate = () => {} }) {
	const [showOptions, setShowOptions] = useState({});
	const [showActivityModal, setShowActivityModal] = useState(false);

	const { data = {}, loading = false } = useListTopTenReferral();
	const { referral_network = {}, referral_user = [] } = data || {};
	const { list = [] } = referral_network || {};

	return (
		<div>
			<PerformanceStats selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
			<div className={styles.list_div}>
				<NetworkList
					setShowOptions={setShowOptions}
					setShowActivityModal={setShowActivityModal}
					data={list || []}
					loading={loading}
				/>
				<UserList
					setShowOptions={setShowOptions}
					setShowActivityModal={setShowActivityModal}
					data={referral_user || []}
					loading={loading}
				/>
			</div>
			<ActivityModal
				activityModal={showActivityModal}
				setActivityModal={setShowActivityModal}
				userDate={showOptions}
			/>
		</div>
	);
}

export default UserPerformance;
