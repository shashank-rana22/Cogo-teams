import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body(props) {
	const {
		view, dateRange, updatedAt, setUpdatedAt, list,
		loading,
		totalReportCount,
	} = props;

	return (
		<div className={styles.container}>
			<LeftPanel
				view={view}
				dateRange={dateRange}
				updatedAt={updatedAt}
				setUpdatedAt={setUpdatedAt}
				list={list}
				loading={loading}
				totalReportCount={totalReportCount}
			/>

			<RightPanel view={view} updatedAt={updatedAt} />
		</div>
	);
}

export default Body;
