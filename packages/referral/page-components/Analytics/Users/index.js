import { useState } from 'react';

import useListTopTenReferralUser from '../../../hooks/useListTopTenReferralUser';
import ActivityModal from '../../Dashboard/ActivityModal';

import NetworkList from './NetworkList';
import PerformanceStats from './PerformaceStats';
import styles from './styles.module.css';
import UserList from './UsersList';

function UserPerformance({ selectedDate = {}, setSelectedDate = () => {} }) {
	const [showPopover, setShowPopover] = useState(false);
	const [showOptions, setShowOptions] = useState({});
	const [filterValue, setFilterValue] = useState({
		levelType : '',
		userCount : '',
	});
	const [showActivityModal, setShowActivityModal] = useState(false);

	const { data = {} } = useListTopTenReferralUser();
	const { referral_network = {}, referral_user = {} } = data || {};
	console.log('networkData:', data);
	return (
		<div>
			<PerformanceStats selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
			<div className={styles.list_div}>
				<NetworkList
					showPopover={showPopover}
					setShowPopover={setShowPopover}
					filterValue={filterValue}
					setFilterValue={setFilterValue}
					setShowOptions={setShowOptions}
					showOptions={showOptions}
					showActivityModal={showActivityModal}
					setShowActivityModal={setShowActivityModal}
					data={referral_network}
				/>
				<UserList
					showPopover={showPopover}
					setShowPopover={setShowPopover}
					filterValue={filterValue}
					setFilterValue={setFilterValue}
					setShowOptions={setShowOptions}
					showOptions={showOptions}
					setShowActivityModal={setShowActivityModal}
					data={referral_user}
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
