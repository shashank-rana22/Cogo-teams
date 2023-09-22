import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body(props) {
	const { dateRange, entity } = props;

	return (
		<div className={styles.container}>
			<LeftPanel dateRange={dateRange} entity={entity} />

			<RightPanel />
		</div>

	);
}

export default Body;
