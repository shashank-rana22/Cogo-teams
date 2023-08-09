import FilterLayout from './FilterLayout';
import styles from './styles.module.css';

function ControlPanel() {
	return (
		<div className={styles.outerContainer}>
			<div className={styles.headTitle}>Automation Desk</div>
			<FilterLayout />
		</div>
	);
}
export default ControlPanel;
