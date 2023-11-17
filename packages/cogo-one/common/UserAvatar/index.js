import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { SOURCE_ICON_MAPPING } from '../../constants';

import styles from './styles.module.css';

function UserAvatar({
	type = '',
	imageSource = '',
	event = '',
	isMobile = false,
}) {
	const topIcon = SOURCE_ICON_MAPPING[event] || SOURCE_ICON_MAPPING[type];

	return (
		<div className={styles.container}>
			{topIcon ? (
				<div className={styles.source_icon}>
					{topIcon}
				</div>
			) : null}

			<Avatar
				src={imageSource || GLOBAL_CONSTANTS.image_url.user_avatar_image}
				alt="img"
				disabled={false}
				size={isMobile ? '35px' : '45px'}
			/>
		</div>
	);
}

export default UserAvatar;
