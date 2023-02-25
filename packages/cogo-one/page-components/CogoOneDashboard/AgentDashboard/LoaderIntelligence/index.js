import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function IntelligenceLoader() {
	return (
		<>
			{
                [...Array(1)].map(() => (
	<div className={styles.loader_box}>

		<Placeholder width="10px" height="10px" margin="8px 5px" className={styles.dot_placeholder} />
		<div className={styles.left_loader_pair}>
			<Placeholder width="140px" height="10px" margin="8px 5px" className={styles.text_placeholder} />
			<Placeholder width="65px" height="10px" margin="2px 5px" className={styles.text_placeholder} />
		</div>

	</div>
                ))
            }
		</>
	);
}

export default IntelligenceLoader;
