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
				src={imageSource || 'https://www.w3schools.com/howto/img_avatar.png'}
				alt="img"
				disabled={false}
				size="45px"
			/>
		</div>
	);
}

export default UserAvatar;
