import { cl } from '@cogoport/components';
import { IcMArrowLeft, IcCWhatsapp, IcMArrowRight, IcCTelegram, IcMPlatformchat } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function UserChannel({ setActiveMessage, userChannelIds = {}, activeChannelId = '' }) {
	const [showUserChannels, setShowUserChannels] = useState(false);
	const CHANNEL_MAPPING = {
		whatsapp_id      : { icon: IcCWhatsapp, channel_type: 'whatsapp' },
		platform_chat_id : { icon: IcMPlatformchat, channel_type: 'platform_chat' },
		telegram_id      : { icon: IcCTelegram, channel_type: 'telegram' },
	};

	return (

		<>
			<div className={cl`${showUserChannels && styles.blur_bg}`} />
			<div
				className={cl`${styles.left_arrow} ${showUserChannels && styles.right_arrow}`}
				role="presentation"
				onClick={() => setShowUserChannels(!showUserChannels)}
			>
				{!showUserChannels ? <IcMArrowLeft /> : <IcMArrowRight />}
			</div>

			<div className={cl`${styles.other_channel_icons}
                 ${!showUserChannels && styles.show_other_channel_icons}`}
			>
				{Object.keys(userChannelIds).map((channel_id) => {
					const { icon:ActiveChannel, channel_type } = CHANNEL_MAPPING[channel_id] || null;

					const id = userChannelIds[channel_id];
					return (
						<div className={cl`${styles.other_channel_icon_div} 
                        ${channel_type === activeChannelId ? styles.active_channel : ''}`}
						>
							<ActiveChannel
								className={styles.other_channel_icon}
								onClick={() => {
									if (channel_type !== activeChannelId) { setActiveMessage({ channel_type, id }); }
								}}
								width={20}
								height={20}
							/>
						</div>
					);
				})}

			</div>

		</>
	);
}

export default UserChannel;
