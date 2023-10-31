import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body(props) {
	const {
		screen, view, dateRange, updatedAt, setUpdatedAt,
	} = props;

	return (
		<div className={styles.container}>
			<LeftPanel
				screen={screen}
				view={view}
				dateRange={dateRange}
				updatedAt={updatedAt}
				setUpdatedAt={setUpdatedAt}
				location={screen === 'comparison' ? 'mumbai' : null}
			/>

			{screen === 'overall'

				? <RightPanel view={view} updatedAt={updatedAt} /> : (
					<LeftPanel
						screen={screen}
						view={view}
						dateRange={dateRange}
						updatedAt={updatedAt}
						setUpdatedAt={setUpdatedAt}
						location="gurgaon"
					/>
				)}
		</div>
	);
}

export default Body;
