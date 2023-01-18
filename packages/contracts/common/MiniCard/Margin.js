import styles from './styles.module.css';

function Margin({ heading = '', value = '' }) {
	return (
		<div className={styles.card}>
			<div className={styles.heading}>{heading}</div>
			<div className={styles.margin}>
				<div className={styles.value_ctr}>
					$
					{value}
					/ctr
				</div>
			</div>
		</div>
	);
}

export default Margin;
