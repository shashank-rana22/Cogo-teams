import React from 'react';

import styles from './styles.module.css';

function IncidentNumber({ itemData }) {
	const { incidentRefNo } = itemData || {};
	return (
		<div className={styles.text}>
			#
			{incidentRefNo}
		</div>
	);
}

export default IncidentNumber;
