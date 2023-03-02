import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoaderEscalation() {
	return (
		<>
			{
                [...Array(7)].map(() => (
	<div className={styles.loader_box}>
		<div className={styles.left_loader}>
			<Placeholder width="30px" height="30px" margin="8px 5px" className={styles.picture_placeholder} />
			<div className={styles.left_loader_pair}>
				<Placeholder width="120px" height="10px" margin="8px 5px" className={styles.redflags_placeholder} />
				<Placeholder width="45px" height="10px" margin="2px 5px" className={styles.redflags_placeholder} />
			</div>
		</div>
		<div>
			<Placeholder width="40px" height="30px" margin="8px 5px" className={styles.redflags_placeholder} />
		</div>

	</div>
                ))
            }
		</>
	);
}

export default LoaderEscalation;
