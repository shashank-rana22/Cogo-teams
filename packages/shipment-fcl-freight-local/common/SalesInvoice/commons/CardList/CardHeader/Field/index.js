import styles from './styles.module.css';

const TOTAL_SPAN = 12;
const PERCENT = 100;

function Field({ field = {}, showCode = false }) {
	const renderHeaderText = () => {
		if (showCode && field.name) {
			return field.name;
		}
		return field.label;
	};
	const { span } = field;
	const widthVal = (span / TOTAL_SPAN) * PERCENT;
	return (
		<div
			style={{ width: `${widthVal}%` }}
			key={field?.key || field?.label}
		>
			<div className={styles.card_title}>
				{renderHeaderText()}
			</div>
		</div>
	);
}
export default Field;
