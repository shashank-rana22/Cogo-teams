import styles from './styles.module.css';

const SPAN_COUNT = 12;
const PERCENTAGE_FACTOR = 100;

function Field({ field = {}, showCode = false }) {
	const renderHeaderText = () => {
		if (showCode && field.name) {
			return field.name;
		}
		return field.label;
	};
	const { span } = field;
	const widthVal = (span / SPAN_COUNT) * PERCENTAGE_FACTOR;
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
