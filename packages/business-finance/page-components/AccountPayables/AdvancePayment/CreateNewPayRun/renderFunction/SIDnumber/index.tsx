import React from 'react';

import styles from './styles.module.css';

function SIDnumber({ itemData }) {
	return (
		<div className={styles.text}>
			#
			{itemData?.sidNumber}
		</div>
	);
}

export default SIDnumber;
