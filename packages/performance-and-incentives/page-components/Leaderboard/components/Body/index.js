import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body() {
	return (
		<div className={styles.container}>
			<LeftPanel />

			<RightPanel />
		</div>

	);
}

export default Body;
