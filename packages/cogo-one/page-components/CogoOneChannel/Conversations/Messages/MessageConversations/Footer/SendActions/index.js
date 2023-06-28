import { Button } from '@cogoport/components';
import { IcMSend, IcMQuickreply } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import { ICON_STYLING } from '../../../../../../../constants';
import useSendPromotionalRate from '../../../../../../../hooks/useSendPromotionalRate';

import styles from './styles.module.css';

function SendActions({
	hasPermissionToEdit,
	openInstantMessages = () => {},
	activeMessageCard = {},
	sendChatMessage = () => {},
	messageLoading,
	scrollToBottom = () => {},
	finalUrl = '',
	draftMessage,
}) {
	const { channel_type = '' } = activeMessageCard;
	const iconStyles = ICON_STYLING({ hasPermissionToEdit });
	const {
		sendPromotionalRate = () => {},
		loading = false,
	} = useSendPromotionalRate({ activeMessageCard });

	return (
		<div className={styles.send_messages}>
			{channel_type === 'whatsapp' && (
				<Button
					size="sm"
					themeType="primary"
					className={styles.promotional_rate}
					loading={loading}
					disabled={!hasPermissionToEdit}
					onClick={() => {
						if (hasPermissionToEdit) {
							sendPromotionalRate();
						}
					}}
					style={iconStyles}
				>
					Send Promotional Rate
				</Button>
			)}

			<IcMQuickreply
				fill="#828282"
				onClick={() => {
					if (hasPermissionToEdit) {
						openInstantMessages();
					}
				}}
				style={iconStyles}
			/>
			<IcMSend
				fill="#EE3425"
				onClick={() => {
					if (hasPermissionToEdit && !messageLoading) {
						sendChatMessage(scrollToBottom);
					}
				}}
				style={{
					cursor: !hasPermissionToEdit || messageLoading || (isEmpty(draftMessage?.trim()) && !finalUrl)
						? 'not-allowed'
						: 'pointer',
				}}
			/>
		</div>
	);
}

export default SendActions;
