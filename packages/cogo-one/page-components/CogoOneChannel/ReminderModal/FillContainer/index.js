import { SVG_SIZE, RADIUS } from '../../../../constants/PROGRESS_BAR_DIMENSIONS';

import styles from './styles.module.css';

function FillContainer({ label = '', value = 0 }) {
	return (
		<div className={styles.container}>
			<svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
				<circle
					cx={SVG_SIZE / 2}
					cy={SVG_SIZE / 2}
					r={RADIUS}
					fill="#DDEBC0"
				/>
				<text className={styles.text_styles} x="50%" y="55%" textAnchor="middle">
					{value}
				</text>
			</svg>
			<div className={styles.label_text}>{label}</div>
		</div>
	);
}

export default FillContainer;
