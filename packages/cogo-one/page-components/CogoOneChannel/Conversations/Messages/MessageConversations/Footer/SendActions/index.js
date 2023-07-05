import { Button } from '@cogoport/components';
import { IcMSend, IcMQuickreply } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../../constants/viewTypeMapping';
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
	viewType = '',
}) {
	const { channel_type = '', session_type = '', account_type = '' } = formattedData;

	const hasNoPermissionToSend = !hasPermissionToEdit || messageLoading
	|| (isEmpty(draftMessage?.trim()) && !finalUrl);

	const {
		sendPromotionalRate = () => {},
		loading = false,
	} = useSendPromotionalRate({ formattedData });

	const isSendPromotionalRate = (session_type === 'bot' || session_type === 'admin')
    && channel_type === 'whatsapp' && VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.send_promotional_rate
	&& account_type === 'importer_exporter';

	return (
		<div className={styles.send_messages}>
			{isSendPromotionalRate && (
				<Button
					size="sm"
					themeType="primary"
					className={styles.promotional_rate}
					loading={loading}
					disabled={!isSendPromotionalRate}
					onClick={() => {
						if (isSendPromotionalRate) {
							sendPromotionalRate();
						}
					}}
					style={{ cursor: !isSendPromotionalRate ? 'not-allowed' : 'pointer' }}
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
				style={{ cursor: hasNoPermissionToSend ? 'not-allowed' : 'pointer' }}
			/>
		</div>
	);
}

export default SendActions;
