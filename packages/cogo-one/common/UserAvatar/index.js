import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { SOURCE_ICON_MAPPING } from '../../constants';

import styles from './styles.module.css';

function UserAvatar({ type = '', imageSource = '', event = '' }) {
	const topIcon = SOURCE_ICON_MAPPING[event] || SOURCE_ICON_MAPPING[type];

	return (
		<div className={styles.container}>
			{topIcon && (
				<div className={styles.source_icon}>
					{topIcon}
				</div>
			)}

			<Avatar
				src={imageSource || GLOBAL_CONSTANTS.image_url.user_avatar_image}
				alt="img"
				disabled={false}
				size="45px"
			/>
		</div>
	);
}

export default UserAvatar;
