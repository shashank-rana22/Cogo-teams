import { Flex } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SuggestedServices() {
	return (
		<div className={styles.container}>
			<Flex direction="column" justifyContent="center">
				<div className={styles.service_name}>Vessel Traffic Service</div>
				<div className={styles.avg_margin}>Average Margin $20</div>
			</Flex>

			<div className={styles.icon_wrapper}>
				<IcMPlus />
			</div>
		</div>
	);
}

export default SuggestedServices;
