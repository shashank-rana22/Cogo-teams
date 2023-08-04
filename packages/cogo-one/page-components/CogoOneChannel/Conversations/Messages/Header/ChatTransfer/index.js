import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../constants/viewTypeMapping';

import styles from './styles.module.css';

function ChatTransfer({
	viewType = '',
	supportAgentId = '',
	userId = '',
	assignLoading = false,
	hasRequestedBy = {},
	assignChat = () => {},
	dissmissTransferRequest = () => {},
}) {
	const { agent_id = '', agent_name = '' } = hasRequestedBy || {};

	const hasAccessToApprove = (
		supportAgentId === userId
		|| VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.has_permission_to_edit
	);

	const showApprovePanel = (!!agent_id && hasAccessToApprove);

	const handleClick = () => {
		if (assignLoading) {
			return;
		}

		assignChat({
			payload: {
				agent_id,
				is_allowed_to_chat: true,
			},
		});
	};

	if (!showApprovePanel) {
		return null;
	}

	return (
		<div className={styles.approve_req}>
			<div className={styles.agent_name}>
				{`${agent_name || 'A agent'} has requested you to transfer chat`}
			</div>

			<IcCFtick
				className={styles.icon_styles}
				cursor={assignLoading ? 'disabled' : 'pointer'}
				onClick={handleClick}
			/>

			<IcCFcrossInCircle
				className={styles.icon_styles}
				cursor="pointer"
				onClick={dissmissTransferRequest}
			/>
		</div>
	);
}

export default ChatTransfer;
