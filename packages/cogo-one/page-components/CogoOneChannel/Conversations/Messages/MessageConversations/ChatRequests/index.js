import React from 'react';

import { getHasAccessToEditGroup } from '../../../../../../helpers/agentDetailsHelpers';
import useTransferChat from '../../../../../../hooks/useTransferChat';

import AddToGroupRequest from './AddToGroupRequest';
import ChatTransfer from './ChatTransfer';
import styles from './styles.module.css';

function ChatRequests({
	firestore = {},
	activeMessageCard = {},
	formattedData = {},
	userId = '',
	viewType = '',
	supportAgentId = '',
	assignLoading = false,
	assignChat = () => {},
}) {
	const {
		dissmissTransferRequest = () => {},
	} = useTransferChat({ firestore, activeMessageCard });

	const hasAccessToEditGroup = getHasAccessToEditGroup({
		formattedMessageData : formattedData,
		agentId              : userId,
		viewType,
	});

	return (
		<div className={styles.chat_requests}>
			<ChatTransfer
				hasRequestedBy={formattedData?.has_requested_by}
				dissmissTransferRequest={dissmissTransferRequest}
				viewType={viewType}
				supportAgentId={supportAgentId}
				userId={userId}
				assignLoading={assignLoading}
				assignChat={assignChat}
			/>

			{hasAccessToEditGroup && (
				<AddToGroupRequest
					firestore={firestore}
					activeMessageCard={activeMessageCard}
				/>
			)}
		</div>
	);
}

export default ChatRequests;
