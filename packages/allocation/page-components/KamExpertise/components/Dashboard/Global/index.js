import React from 'react';

import Header from './Header';
import KamData from './KamData';
import styles from './styles.module.css';

function Global() {
	return (
		<>
			<Header />
			<div className={styles.tab_list}>
				<KamData />
			</div>
		</>
	);
}

export default Global;
