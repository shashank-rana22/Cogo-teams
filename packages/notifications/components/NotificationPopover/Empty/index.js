import React from 'react';

import styles from './styles.module.css';

function Empty() {
	return (
		<div className={styles.container}>
			<div className={styles.load_heading}>Yay!! no new notifications...</div>
		</div>
	);
}
export default Empty;
