import styles from './styles.module.css';

function Price({ heading = 'Projected Consolidated Revenue from', data }) {
	return (
		<div className={styles.card}>
			<div className={styles.heading}>
				{heading}
			</div>
			<div className={styles.price}>
				$
				{data}
			</div>
		</div>
	);
}

export default Price;
