import React from 'react';

import styles from './styles.module.css';

function SIDnumber({ itemData }) {
	const { jobNumber } = itemData || {};
	return (
		<div className={styles.text}>
			#
			{jobNumber}
		</div>
	);
}

export default SIDnumber;
