import { Avatar } from '@cogoport/components';
import React from 'react';

import { SOURCE_ICON_MAPPING } from '../../constants';

import styles from './styles.module.css';

function UserAvatar({ type = '', imageSource = '' }) {
	const TopIcon = SOURCE_ICON_MAPPING[type];

	return (
		<div className={styles.container}>
			{TopIcon && (
				<div className={styles.source_icon}>
					{TopIcon }
				</div>
			)}

			<Avatar
				src={imageSource}
				alt="img"
				disabled={false}
				size="55px"
			/>
		</div>
	);
}

export default UserAvatar;
