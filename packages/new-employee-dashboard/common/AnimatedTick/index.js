import styles from './styles.module.css';

function AnimatedTick() {
	return (
		<div>
			<svg width="120" height="120">
				<circle
					className={styles.circle}
					fill="#73AF55"
					stroke="#73AF55"
					strokeWidth="6"
					strokeMiterlimit="10"
					cx="65.1"
					cy="65.1"
					r="40"
				/>
				<polyline
					className={styles.check}
					fill="none"
					stroke="#ffffff"
					strokeWidth="6"
					strokeLinecap="round"
					strokeMiterlimit="10"
					points="90,50 60,83 40.8,67.5 "
				/>
			</svg>

		</div>
	);
}

export default AnimatedTick;
