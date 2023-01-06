import styles from './styles.module.css';

function Percentage({ data }) {
	return (
		<div className={styles.card}>
			<div className={styles.heading}>
				Projected
				Consolidated Profitability
			</div>
			<div>
				{data}
				{' '}
				%
			</div>
		</div>
	);
}

export default Percentage;
