import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body(props) {
	const { dateRange } = props;

	return (
		<div className={styles.container}>
			<LeftPanel dateRange={dateRange} />

			<RightPanel />
		</div>

	);
}

export default Body;
