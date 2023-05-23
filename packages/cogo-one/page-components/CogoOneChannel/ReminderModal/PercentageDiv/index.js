import { SVG_SIZE, STROKE_WIDTH, RADIUS, CIRCUMFERENCE } from '../../../../constants/PROGRESS_BAR_DIMENSIONS';

import styles from './styles.module.css';

function PercentageDiv({ eachStat = {} }) {
	const { label, value = 0, target } = eachStat;

	const offset = value - target >= 0 ? 0 : CIRCUMFERENCE - (Number(value / target) || 0) * CIRCUMFERENCE;
	return (
		<div className={styles.container}>
			<svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
				<circle
					cx={SVG_SIZE / 2}
					cy={SVG_SIZE / 2}
					r={RADIUS}
					stroke="#e8e8e8"
					fill="none"
					strokeWidth={`${STROKE_WIDTH}px`}
				/>
				<circle
					className={styles.fill_circle_styles}
					cx={SVG_SIZE / 2}
					cy={SVG_SIZE / 2}
					r={RADIUS}
					strokeWidth={`${STROKE_WIDTH}px`}
					transform={`rotate(-90 ${SVG_SIZE / 2} ${SVG_SIZE / 2})`}
					strokeDasharray={CIRCUMFERENCE}
					strokeDashoffset={offset}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<div className={styles.text_styles}>
				{`${value}/${target}`}
			</div>
			<div className={styles.label_text}>{label}</div>
		</div>
	);
}

export default PercentageDiv;
