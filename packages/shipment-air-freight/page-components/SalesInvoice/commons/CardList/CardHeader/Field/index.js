import CONSTANTS from '../../../../../../constants/CONSTANTS';

import styles from './styles.module.css';

const { TOTAL_SPAN, FLEX_HUNDRED } = CONSTANTS;
function Field({ field = {}, showCode = false }) {
	const renderHeaderText = () => {
		if (showCode && field.name) {
			return field.name;
		}
		return field.label;
	};
	const { span } = field;
	const widthVal = (span / TOTAL_SPAN) * FLEX_HUNDRED;
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
