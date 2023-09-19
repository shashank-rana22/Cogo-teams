import React from 'react';

import styles from './styles.module.css';

const TWELVE = 12;
const HUNDRED = 100;

function Field({ field = {}, showCode = false }) {
	const renderHeaderText = () => {
		if (showCode && field?.name) {
			return field?.name;
		}
		return field?.label;
	};

	const { span = 1 } = field;
	const widthVal = (span / TWELVE) * HUNDRED;

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
