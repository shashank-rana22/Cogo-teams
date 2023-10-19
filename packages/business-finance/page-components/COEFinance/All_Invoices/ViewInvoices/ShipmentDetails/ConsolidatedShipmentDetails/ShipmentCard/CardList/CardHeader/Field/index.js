import styles from './styles.module.css';

const TOTAL_WIDTH = 100;
const TOTAL_SPAN = 12;

function Field({ field }) {
	const renderHeaderText = () => field.label;

	const { span } = field || {};
	const widthVal = (span / TOTAL_SPAN) * TOTAL_WIDTH;
	return (
		<div
			style={{ width: `${widthVal}%` }}
			key={field.key}
		>
			<div className={styles.card_title}>
				{renderHeaderText()}
			</div>
		</div>
	);
}
export default Field;
