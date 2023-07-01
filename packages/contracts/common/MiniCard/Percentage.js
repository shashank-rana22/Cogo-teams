import styles from './styles.module.css';

function Percentage({ heading = 'Projected Consolidated Profitability', data }) {
	return (
		<div className={styles.card}>
			<div className={styles.heading}>
				{heading}
			</div>
			<div className={data > 0 ? styles.percentage : styles.neg_percentage}>
				{(data) ? `${data}%` : 'NA'}
			</div>
		</div>
	);
}

export default Percentage;
