import LEADERBOARD_LOCATIONS from '../../utils/leaderboard-locations';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body(props) {
	const {
		screen, view, dateRange, updatedAt, setUpdatedAt, setDateRange, duration, setDuration,
	} = props;

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
			/>

			{screen === 'overall' ? <RightPanel view={view} updatedAt={updatedAt} /> : (
				<LeftPanel
					screen={screen}
					view={view}
					dateRange={dateRange}
					updatedAt={updatedAt}
					setUpdatedAt={setUpdatedAt}
					location={LEADERBOARD_LOCATIONS?.gurgaon}
				/>
			)}
		</div>
	);
}

export default Body;
