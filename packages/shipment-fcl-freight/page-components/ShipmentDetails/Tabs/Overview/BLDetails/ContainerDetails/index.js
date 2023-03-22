import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ConatinerDetails({ containerDetails = [] }) {
	let even = false;
	if ((containerDetails || []).length / 2 === 0) {
		even = true;
	}

	const className = !even ? 'no-border' : '';

	return (
		<div>
			<div className={styles.container}>
				{(containerDetails || [])?.map((item, index) => (
					<div className={cl`${className} random`}>
						<div className={styles.container_item}>
							<div className={styles.container_description}>
								<div className={styles.serial_number}>
									{index + 1}
									:
								</div>
								<div className={styles.container_number}>{item?.container_number}</div>
								<div className={styles.tag_wrapper}>
									<div>{item?.container_type}</div>
									<div>{item?.container_size}</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ConatinerDetails;
