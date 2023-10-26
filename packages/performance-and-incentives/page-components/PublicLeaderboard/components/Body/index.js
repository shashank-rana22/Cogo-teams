import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body(props) {
	const { view, dateRange, setUpdatedAt } = props;

	return (
		<div className={styles.container}>
			<LeftPanel view={view} dateRange={dateRange} setUpdatedAt={setUpdatedAt} />

			<RightPanel view={view} />
		</div>
	);
}

export default Body;
