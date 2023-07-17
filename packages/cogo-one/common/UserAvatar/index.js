import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { SOURCE_ICON_MAPPING } from '../../constants';

import styles from './styles.module.css';

const EVENT_ICON_MAPPING = ['user', 'checkout', 'shipment', 'communication'];

function UserAvatar({ type = '', imageSource = '', event = '' }) {
	const eventIcon = EVENT_ICON_MAPPING.includes(event);
	const topIcon = eventIcon ? SOURCE_ICON_MAPPING[event] : SOURCE_ICON_MAPPING[type];

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
