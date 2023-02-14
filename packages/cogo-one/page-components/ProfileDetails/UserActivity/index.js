import { Select } from '@cogoport/components';
import { useState } from 'react';

import userActivitiesType from '../../../configurations/userActivitiesType';

import styles from './styles.module.css';

function UserActivities() {
	const [activityType, setActivityType] = useState('');
	return (
		<div className={styles.container}>
			<div className={styles.title}>User Activity</div>
			<div className={styles.wrapper}>
				<Select
					value={activityType}
					onChange={setActivityType}
					placeholder="Select activity type"
					options={userActivitiesType}
				/>
			</div>

		</div>
	);
}
export default UserActivities;
