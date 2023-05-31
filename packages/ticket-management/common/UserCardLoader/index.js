import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function UserCardLoader() {
	return (
		<div>
			{[...Array(4).keys()].map((key) => (
				<div key={key} className={styles.container}>
					<div className={styles.subcontainer_header}>
						<Placeholder
							width="90px"
							height="18px"
							className={styles.loading_skeleton}
						/>
						<Placeholder
							width="20px"
							height="18px"
							className={styles.loading_skeleton}
						/>
					</div>
					<div className={styles.description}>
						<Placeholder
							width="220px"
							height="18px"
							className={styles.loading_skeleton}
						/>
					</div>
				</div>
			))}
		</div>
	);
}

export default UserCardLoader;
