/* eslint-disable custom-eslint/variables-name-check */
import { Button, Popover, Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import AddMembers from './AddMembers';
import styles from './styles.module.css';

function Header({ viewType = '' }) {
	const [showPopover, setShowPopover] = useState(false);
	const type = 'single';

	const USER_AVATAR_MAPPING = {
		single: (<Avatar
			personName="Lachiram naik"
			alt="img"
			disabled={false}
			size="40px"
			className={styles.styled_avatar}
		/>),
		group: (<Image
			src={GLOBAL_CONSTANTS.image_url.teams}
			alt="group"
			width={40}
			height={40}
		/>),
	};

	const ACTION_ICON_MAPPING = {
		single: (
			<IcMCall
				width={22}
				height={22}
				fill="#777"
			/>
		),
		group: (<Image
			src={GLOBAL_CONSTANTS.image_url.video_call}
			alt="group"
			width={22}
			height={22}
		/>),
	};

	return (
		<div className={styles.container}>
			<div className={styles.group}>
				{USER_AVATAR_MAPPING[type]}
				<div className={styles.info}>
					<div className={styles.group_name}>
						Purnendu & Ankur
					</div>
					<div className={styles.label}>
						Ankur is typing..
					</div>
				</div>
			</div>
			<div className={styles.group}>
				<Button themeType="tertiary">
					{ACTION_ICON_MAPPING[type]}
				</Button>
				<Popover
					placement="bottom"
					visible={showPopover}
					render={showPopover ? (
						<AddMembers viewType={viewType} />
					) : null}
				>
					<Button themeType="tertiary" onClick={() => setShowPopover((prev) => !prev)}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.groups}
							alt="group"
							width={28}
							height={25}
						/>
					</Button>
				</Popover>

			</div>
		</div>
	);
}

export default Header;
