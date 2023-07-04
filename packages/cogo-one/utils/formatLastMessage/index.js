import { IcMDocument, IcMImage, IcMTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

const formatLastMessage = ({ lastMessage, viewType }) => {
	if (typeof lastMessage === 'string') {
		return (
			<div
				className={styles.content}
				dangerouslySetInnerHTML={{ __html: lastMessage || '' }}
			/>
		);
	}

	const {
		response: { message = '' } = {},
		conversation_type = '',
		message_type = '',
		agent_type: lastMessageAgentType = 'bot',
	} = lastMessage || {};

	const ActiveIcon = message_type === 'image' ? IcMImage : IcMDocument;

	const messageToBeShown = (lastMessageAgentType === 'bot'
								|| viewType === 'cogoone_admin'
								|| viewType.includes(lastMessageAgentType));

	if (!messageToBeShown) {
		return <div className={styles.styled_flex} />;
	}

	return (
		<div className={styles.styled_flex}>
			{conversation_type === 'received' && <IcMTick height="20px" width="20px" />}

			{message_type !== 'text' && ActiveIcon && <ActiveIcon height="20px" width="20px" />}

			<div
				className={styles.content}
				dangerouslySetInnerHTML={{ __html: message || message_type }}
			/>
		</div>
	);
};

export default formatLastMessage;
