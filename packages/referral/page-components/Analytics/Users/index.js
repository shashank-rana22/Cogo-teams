import { useState } from 'react';

import ActivityModal from '../../Dashboard/ActivityModal';

import NetworkList from './NetworkList';
import PerformanceStats from './PerformaceStats';
import styles from './styles.module.css';
import UserList from './UsersList';

function UserPerformance() {
	const [showPopover, setShowPopover] = useState(false);
	const [showOptions, setShowOptions] = useState({});
	const [filterValue, setFilterValue] = useState({
		levelType : '',
		userCount : '',
	});
	const [showActivityModal, setShowActivityModal] = useState(false);
	return (
		<div>
			<PerformanceStats />
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
				/>
				<UserList
					showPopover={showPopover}
					setShowPopover={setShowPopover}
					filterValue={filterValue}
					setFilterValue={setFilterValue}
					setShowOptions={setShowOptions}
					showOptions={showOptions}
					setShowActivityModal={setShowActivityModal}
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
