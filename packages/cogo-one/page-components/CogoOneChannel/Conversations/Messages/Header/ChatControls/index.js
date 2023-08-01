import { Button } from '@cogoport/components';
import React from 'react';

import HeaderName from '../../../../../../common/HeaderName';
import VideoCalling from '../VideoCalling';

import styles from './styles.module.css';

function ChatControls({
	escalateToSupplyRm = () => {},
	setOpenModal = () => {},
	updateChat = () => {},
	formattedData = {},
	loading = false,
	supplierLoading = false,
	hasPermissionToEdit = false,
	canMessageOnBotSession = false,
}) {
	const {
		channel_type,
		organization_id = '',
		user_id,
		user_type = '',
		account_type = '',
		id,
		support_agent_id: chatAssignTo = '',
	} = formattedData || {};

	const handleEsclateClick = () => {
		escalateToSupplyRm({
			payload: {
				organization_id,
				organization_user_id : user_id,
				channel              : channel_type,
				channel_chat_id      : id,
			},
		});
	};

	return (
		<div className={styles.flex_space_between}>
			<HeaderName formattedData={formattedData} />

			<div className={styles.button_flex}>
				{(user_type === 'cp' && chatAssignTo) ? (
					<VideoCalling formattedData={formattedData} />
				) : null}

				{account_type === 'service_provider' && (
					<Button
						themeType="secondary"
						size="sm"
						disabled={!hasPermissionToEdit || canMessageOnBotSession}
						onClick={handleEsclateClick}
						loading={supplierLoading}
						className={styles.escalate_button}
					>
						escalate
					</Button>
				)}

				<Button
					themeType="primary"
					size="sm"
					disabled={!hasPermissionToEdit || canMessageOnBotSession}
					onClick={() => setOpenModal({
						type : 'mark_as_closed',
						data : {
							updateChat,
							loading,
						},
					})}
				>
					Mark as Closed
				</Button>
			</div>
		</div>
	);
}

export default ChatControls;
