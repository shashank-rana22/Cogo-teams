import FilterLayout from './FilterLayout';
import styles from './styles.module.css';
import TableLayout from './TableLayout';

function ControlPanel() {
	return (
		<div className={styles.outerContainer}>
			<div className={styles.headTitle}>Automation Desk</div>
			<FilterLayout />
			<TableLayout />
		</div>
	);
}
export default ControlPanel;
