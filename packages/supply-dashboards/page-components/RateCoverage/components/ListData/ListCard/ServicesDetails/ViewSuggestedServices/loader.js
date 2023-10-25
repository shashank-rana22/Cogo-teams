import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoaderComponenet() {
	return (
		<div>
			<div className={styles.loader}>
				SUGGESTED SERVICE PROVIDERS
			</div>
			<div className={styles.flex}>
				{[...Array(6)].map((i) => (
					<div
						key={i}
						className={styles.Placeholder}
					>
						<Placeholder style={{ borderRadius: '4px', margin: '10px' }} width="100%" />
					</div>
				))}
				<div />
			</div>
		</div>
	);
}

export default LoaderComponenet;
