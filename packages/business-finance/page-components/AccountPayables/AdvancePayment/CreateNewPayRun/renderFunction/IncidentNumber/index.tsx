import React from 'react';

import styles from './styles.module.css';

function IncidentNumber({ itemData }) {
	return (
		<div className={styles.text}>
			#
			{itemData?.incidentNumber}
		</div>
	);
}

export default IncidentNumber;
