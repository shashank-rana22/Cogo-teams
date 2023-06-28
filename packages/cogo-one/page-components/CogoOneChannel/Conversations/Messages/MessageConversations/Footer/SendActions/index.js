import { Button } from '@cogoport/components';
import { IcMSend, IcMQuickreply } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import useSendPromotionalRate from '../../../../../../../hooks/useSendPromotionalRate';

import styles from './styles.module.css';

const COMMON_FUNC = () => {};
function SendActions({
	hasPermissionToEdit, openInstantMessages = COMMON_FUNC,
	activeMessageCard = {}, sendChatMessage = COMMON_FUNC,
	messageLoading, scrollToBottom = COMMON_FUNC,
	finalUrl = '', draftMessage,
}) {
	const {
		sendPromotionalRate = () => {},
		loading = false,
	} = useSendPromotionalRate({ activeMessageCard });

	return (
		<div className={styles.send_messages}>
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
				style={{
					cursor: !hasPermissionToEdit
						? 'not-allowed'
						: 'pointer',
				}}
			>
				Send Promotional Rate
			</Button>
			<IcMQuickreply
				fill="#828282"
				onClick={() => {
					if (hasPermissionToEdit) {
						openInstantMessages();
					}
				}}
				style={{
					cursor: !hasPermissionToEdit
						? 'not-allowed'
						: 'pointer',
				}}
			/>
			<IcMSend
				fill="#EE3425"
				onClick={() => {
					if (hasPermissionToEdit && !messageLoading) {
						sendChatMessage(scrollToBottom);
					}
				}}
				style={{
					cursor: !hasPermissionToEdit || messageLoading
								|| (isEmpty(draftMessage?.trim()) && !finalUrl)
						? 'not-allowed'
						: 'pointer',
				}}
			/>
		</div>
	);
}

export default SendActions;
