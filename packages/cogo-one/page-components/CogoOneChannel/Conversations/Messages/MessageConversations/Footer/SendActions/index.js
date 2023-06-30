import { Button } from '@cogoport/components';
import { IcMSend, IcMQuickreply } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import useSendPromotionalRate from '../../../../../../../hooks/useSendPromotionalRate';

import styles from './styles.module.css';

function SendActions({
	hasPermissionToEdit,
	openInstantMessages = () => {},
	sendChatMessage = () => {},
	messageLoading,
	scrollToBottom = () => {},
	finalUrl = '',
	draftMessage,
	formattedData = {},
}) {
	const { channel_type = '' } = formattedData;
	const hasNopermissionToSend = !hasPermissionToEdit || messageLoading
	|| (isEmpty(draftMessage?.trim()) && !finalUrl);

	const {
		sendPromotionalRate = () => {},
		loading = false,
	} = useSendPromotionalRate({ formattedData });

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
					style={{ cursor: !hasPermissionToEdit ? 'not-allowed' : 'pointer' }}
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
				style={{ cursor: !hasPermissionToEdit ? 'not-allowed' : 'pointer' }}
			/>
			<IcMSend
				fill="#EE3425"
				onClick={() => {
					if (hasPermissionToEdit && !messageLoading) {
						sendChatMessage(scrollToBottom);
					}
				}}
				style={{ cursor: hasNopermissionToSend ? 'not-allowed' : 'pointer' }}
			/>
		</div>
	);
}

export default SendActions;
