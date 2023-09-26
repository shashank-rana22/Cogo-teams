import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body(props) {
	const { view, dateRange } = props;

	return (
		<div className={styles.container}>
			<LeftPanel view={view} dateRange={dateRange} />

			<RightPanel view={view} dateRange={dateRange} />
		</div>
	);
}

export default Body;
