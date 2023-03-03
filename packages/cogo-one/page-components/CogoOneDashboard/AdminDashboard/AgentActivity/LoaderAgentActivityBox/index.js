import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoaderAgentActivity() {
	return (
		<div className={styles.main_box}>
			{
			[...Array(3)].map(() => (
				<div className={styles.loader_box}>
					<Placeholder
						width="270px"
						height="55px"
						className={styles.profile_box}
					/>
					<Placeholder
						width="270px"
						height="55px"
						className={styles.profile_box}
					/>
					<Placeholder
						width="270px"
						height="55px"
						className={styles.profile_box}
					/>
				</div>
			))
		}
		</div>
	);
}

export default LoaderAgentActivity;
