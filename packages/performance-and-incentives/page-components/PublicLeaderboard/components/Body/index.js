import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body(props) {
	const {
		view, dateRange, updatedAt, setUpdatedAt,
	} = props;

	return (
		<div className={styles.container}>
			<LeftPanel
				view={view}
				dateRange={dateRange}
				updatedAt={updatedAt}
				setUpdatedAt={setUpdatedAt}
			/>

			<RightPanel view={view} updatedAt={updatedAt} />
		</div>
	);
}

export default Body;
