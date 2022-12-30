import Content from './Content';
import styles from './styles.module.css';

function Stats() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>
					<div className={styles.contract_id}>
						Contract ID #2322
					</div>
					<div className={styles.trade}>
						Export
					</div>
				</div>
				<div className={styles.details}>
					<div>No. of Containers : 150</div>
					<div>Request Date : 10 June  2022</div>
					<div>Validity : 30 Days</div>
				</div>
			</div>
			<Content />
		</div>
	);
}
export default Stats;
