import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function CustomTooltip(props) {
	const { bar = {}, point = {} } = props;
	const headingText = bar?.key
		? `${(bar.key || '').split('%')[GLOBAL_CONSTANTS.zeroth_index]} % Daviation`
		: point?.data?.x;

	const value = bar?.key ? `${bar?.value} Rates` : `${point?.data?.y}% Accuracy`;

	return (
		<div className={styles.tooltip_container}>
			<p>
				{headingText}
			</p>
			<h3>{value}</h3>
		</div>
	);
}

export default CustomTooltip;
