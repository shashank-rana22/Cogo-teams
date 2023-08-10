import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADER_LENGTH = 2;

function LoadingState() {
	return ([...Array(LOADER_LENGTH).keys()].map(
		(key) => (
			<div
				className={styles.container}
				key={key}
			>
				<div className={styles.icon_type}>
					<Placeholder
						type="circle"
						radius="30px"
					/>
				</div>
				<div className={styles.details}>
					<div className={styles.header}>
						<div className={styles.name}>
							<Placeholder
								height="16px"
								width="160px"
							/>
						</div>
					</div>

					<div className={styles.organization}>
						<Placeholder
							height="10px"
							width="80px"
							margin="10px 0px 0px 0px"
						/>
					</div>
				</div>
			</div>
		),
	));
}

export default LoadingState;
