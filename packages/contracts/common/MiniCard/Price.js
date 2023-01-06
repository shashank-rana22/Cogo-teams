import styles from './styles.module.css';

function Price({ data }) {
	return (
		<div className={styles.card}>
			<div className={styles.heading}>
				Projected Consolidated Revenue
				from
			</div>
			<div>
				$
				{' '}
				{data}
			</div>
		</div>
	);
}

export default Price;
