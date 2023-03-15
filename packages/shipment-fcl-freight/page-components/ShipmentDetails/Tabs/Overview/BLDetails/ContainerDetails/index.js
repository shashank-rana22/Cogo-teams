import { Tag, cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

// const { Row, Col } = Grid;

function ConatinerDetails({ containerDetails = [] }) {
	let even = false;
	if (containerDetails?.length / 2 === 0) {
		even = true;
	}

	const className = !even ? 'no-border' : '';

	return (
		<div>
			<div className={styles.container}>
				{containerDetails?.map((item, index) => (
					<div md={6} className={cl`${className} random`}>
						<div className={styles.container_item}>
							<div className={styles.container_description}>
								<div className={styles.serial_number}>{index + 1}</div>

								<div className={styles.container_number}>{item?.container_number}</div>

								<div className={styles.tag_wrapper}>
									<Tag>{item?.container_type}</Tag>
								</div>

								<div className={styles.tag_wrapper}>
									<Tag>{item?.container_size}</Tag>
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
