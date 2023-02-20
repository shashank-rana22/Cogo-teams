import React from 'react';

import Air from './Air';
import Header from './Header';
import styles from './styles.module.css';

function GroundOps() {
	return (
		<div className={styles.container}>
			<Header />
			<div style={{ marginTop: 20 }}>
				<Air />
			</div>
		</div>
	);
}

export default GroundOps;
