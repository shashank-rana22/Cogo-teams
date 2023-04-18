import React from 'react';

import styles from './styles.module.css';

function IncidentNumber({ itemData }) {
	const { incidentRefNumber } = itemData || {};
	return (
		<div className={styles.text}>
			#
			{incidentRefNumber}
		</div>
	);
}

export default IncidentNumber;
