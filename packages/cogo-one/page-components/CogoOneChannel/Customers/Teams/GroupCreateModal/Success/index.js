import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { TEAMS_ICON_MAPPING } from '../../../../../../constants';

import styles from './styles.module.css';

function Success({
	selectedGroup = {},
}) {
	const { group_type = '' } = selectedGroup || {};

	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.success}
				alt="group"
				width={180}
				height={180}
			/>
			<div className={styles.group}>
				<Image
					src={TEAMS_ICON_MAPPING[group_type] || ''}
					alt="group"
					width={26}
					height={26}
				/>

				<div className={styles.type}>
					{startCase(`${group_type} Team`)}
				</div>
			</div>
			<div className={styles.title}>
				Yoohoo! Your team has been created!
			</div>
		</div>
	);
}

export default Success;
