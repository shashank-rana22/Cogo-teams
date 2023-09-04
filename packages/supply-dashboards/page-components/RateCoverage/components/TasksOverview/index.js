import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import OverviewContent from './OverviewContent';
import styles from './styles.module.css';
import WeeklyOverviewContent from './WeeklyOverviewContent';

function TasksOverview({ data = {}, statsLoading = false, showWeekData = false, setShowWeekData = () => {} }) {
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
			<div className={styles.swipe_button}>
				<IcMArrowRight onClick={handleClick} />
			</div>
		</div>
	);
}
export default TasksOverview;
