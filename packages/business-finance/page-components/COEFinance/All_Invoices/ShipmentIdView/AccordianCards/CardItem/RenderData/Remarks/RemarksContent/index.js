import React from 'react';

import styles from './styles.module.css';

function RemarksContent({ item }) {
	return (
		<div>
			{item.remarks ? (
				<div className={styles.conatiner}>{item.remarks}</div>
			) : (
				'No remarks'
			)}
		</div>
	);
}

export default RemarksContent;
