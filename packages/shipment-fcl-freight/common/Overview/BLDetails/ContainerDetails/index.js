import { startCase } from '@cogoport/utils';
import React from 'react';

import { renderValue } from '../../../CargoDetails/RenderCargoPills/renderValue';

import styles from './styles.module.css';

function ConatinerDetails({ containerDetails = [], cargoDetails = {} }) {
	return (
		<div className={styles.container}>
			{(containerDetails || [])?.map((item, index) => (
				<div>
					<div className={styles.container_item}>
						<div className={styles.container_description}>
							<div className={styles.serial_number}>
								{index + 1}
								:
							</div>
							<div className={styles.container_number}>{item?.container_number}</div>
							<div className={styles.tag_wrapper}>
								<div>{startCase(cargoDetails?.container_type)}</div>
								<div>{renderValue('container_size', cargoDetails)}</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default ConatinerDetails;
