import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			{Array.from(Array(5)).map(() => (
				<div className={styles.loader_item}>
					<div className={styles.top_part}>
						<Placeholder
							width="100%"
							height="20px"
							style={{ borderRadius: 4 }}
						/>
					</div>
					<div className={styles.bottom_part}>
						<div className={styles.tags_section}>
							{Array.from(Array(3)).map(() => (
								<Placeholder
									width="60px"
									height="16px"
									margin="4px 12px 0 0"
									style={{ borderRadius: 6 }}
								/>
							))}
						</div>
						<Placeholder
							width="60px"
							height="16px"
							margin="4px 0 0 0"
							style={{ borderRadius: 6 }}
						/>
					</div>
				</div>
			))}
		</div>
	);
}

export default Loader;
