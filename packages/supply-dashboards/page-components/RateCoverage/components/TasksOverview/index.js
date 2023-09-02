import { IcMArrowLeft } from '@cogoport/icons-react';
import React, { useState } from 'react';

import OverviewContent from './OverviewContent';
import styles from './styles.module.css';
import WeeklyOverviewContent from './WeeklyOverviewContent';

function TasksOverview({ data = {}, statsLoading = false }) {
	const [showWeekData, setShowWeekData] = useState(false);
	const handleClick = () => {
		setShowWeekData((prev) => !prev);
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.swipe_button}>
				<IcMArrowLeft onClick={handleClick} />
			</div>
			<div className={styles.stats_container}>
				{showWeekData
					? <WeeklyOverviewContent data={data} statsLoading={statsLoading} />
					: <OverviewContent data={data} statsLoading={statsLoading} />}
			</div>
		</div>
	);
}
export default TasksOverview;
