import styles from './styles.module.css';

function Alert() {
	return (
		<div className={styles.parent}>
			<div className={styles.header}> Alert</div>
			<div className={styles.list_items}>
				<ul className={styles.list}>
					<li> The annual turnover of company is less than 60Cr.</li>
					<li>The market feedback is okayish </li>
				</ul>

			</div>
		</div>
	);
}
export default Alert;
