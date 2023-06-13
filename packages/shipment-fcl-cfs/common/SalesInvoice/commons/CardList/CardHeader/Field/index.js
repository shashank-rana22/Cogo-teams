import React from 'react';

import styles from './styles.module.css';

const SPAN_COUNT = 12;
const MULTIPLIER = 100;

function Field({ field = {}, showCode = false }) {
	const renderHeaderText = () => {
		if (showCode && field.name) {
			return field.name;
		}
		return field.label;
	};
	const { span } = field;
	const widthVal = (span / SPAN_COUNT) * MULTIPLIER;
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
