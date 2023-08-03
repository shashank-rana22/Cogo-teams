import dynamic from 'next/dynamic';
import React from 'react';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./maps'), { ssr: false });

function MapsUi() {
	return (
		<div className={styles.container}>
			<CogoMaps />
		</div>
	);
}

export default MapsUi;
