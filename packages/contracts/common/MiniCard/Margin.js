import styles from './styles.module.css';

function Margin() {
	return (
		<div className={styles.card}>
			<div className={styles.heading}>
				Avg. Sell Price in the
				last 30 Days
			</div>
			<div className={styles.margin}>
				<div>1899</div>
				<div>
					<div className={styles.percent}>22%</div>
					<div>icon</div>
				</div>
			</div>
		</div>
	);
}

export default Margin;
