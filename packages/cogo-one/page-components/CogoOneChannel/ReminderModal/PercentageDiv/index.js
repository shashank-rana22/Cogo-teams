import styles from './styles.module.css';

const RADIUS = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const C_X = 80;
const C_Y = 80;
function PercentageDiv({ eachStat = {} }) {
	const { label, value = 0, target } = eachStat;

	const offset = CIRCUMFERENCE - (Number(value / target) || 0) * CIRCUMFERENCE;
	return (
		<div className={styles.container}>
			<svg width="160" height="160" viewBox="0 0 100% 100%">
				<circle
					cx={C_X}
					cy={C_Y}
					r={RADIUS}
					fill="transparent"
					stroke="#cccccc"
					strokeWidth="10"
				/>
				<circle
					cx={C_X}
					cy={C_Y}
					r={RADIUS}
					fill="transparent"
					stroke="#ff5722"
					strokeWidth="10"
					strokeDasharray={CIRCUMFERENCE}
					strokeDashoffset={offset}
					strokeLinecap="round"
				/>
				<text
					x="50%"
					y="50%"
					dominantBaseline="middle"
					textAnchor="middle"
					className={styles.text_styles}
				>
					{`${value}/${target}`}
				</text>
			</svg>
			<div className={styles.label_text}>{label}</div>
		</div>
	);
}

export default PercentageDiv;
