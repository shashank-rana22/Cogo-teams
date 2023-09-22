import { Button, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import AddMembers from './AddMembers';
import styles from './styles.module.css';

function Header() {
	const [showPopover, setShowPopover] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.group}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.teams}
					alt="group"
					width={40}
					height={40}
				/>
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
				<Popover placement="bottom" render={showPopover ? (<AddMembers />) : null}>
					<Button themeType="tertiary" onClick={() => setShowPopover((prev) => !prev)}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.groups}
							alt="group"
							width={28}
							height={25}
						/>
					</Button>
				</Popover>

				<Button themeType="tertiary">
					<Image
						src={GLOBAL_CONSTANTS.image_url.video_call}
						alt="group"
						width={22}
						height={22}
					/>
				</Button>
			</div>
		</div>
	);
}

export default Header;
