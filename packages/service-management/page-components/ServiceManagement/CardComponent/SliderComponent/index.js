import React from 'react';

import styles from './styles.module.css';

function SliderComponent() {
	return (
		<div className={styles.container}>
			<div className={styles.line} />
			<div className={styles.left} />
			<div className={styles.right} />
		</div>
	);
}

export default SliderComponent;
