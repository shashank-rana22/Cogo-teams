import { useState } from 'react';

import LEADERBOARD_LOCATIONS from '../../utils/leaderboard-locations';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body(props) {
	const {
		screen, view, dateRange, updatedAt, setUpdatedAt, setDateRange, duration, setDuration,
	} = props;

	const [score, setScore] = useState({});

	return (
		<div className={styles.container}>
			<LeftPanel
				screen={screen}
				view={view}
				dateRange={dateRange}
				updatedAt={updatedAt}
				setUpdatedAt={setUpdatedAt}
				location={screen === 'comparison' ? LEADERBOARD_LOCATIONS?.mumbai : null}
				duration={duration}
				setDuration={setDuration}
				setDateRange={setDateRange}
				score={score}
				setScore={setScore}
			/>

			{screen === 'overall' ? <RightPanel view={view} updatedAt={updatedAt} /> : (
				<LeftPanel
					screen={screen}
					view={view}
					dateRange={dateRange}
					updatedAt={updatedAt}
					setUpdatedAt={setUpdatedAt}
					location={LEADERBOARD_LOCATIONS?.gurgaon}
					score={score}
					setScore={setScore}
				/>
			)}
		</div>
	);
}

export default Body;
