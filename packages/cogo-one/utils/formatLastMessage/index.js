import { IcMDocument, IcMImage, IcMTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

const formatLastMessage = (lastMessage) => {
	if (typeof lastMessage === 'string') {
		return (
			<div
				className={styles.content}
				dangerouslySetInnerHTML={{ __html: lastMessage || '' }}
			/>
		);
	}
	const { response:{ message = '' } = {}, conversation_type = '', message_type = '' } = lastMessage || {};
	const ActiveIcon = message_type === 'image' ? IcMImage : IcMDocument;
	return (
		<div className={styles.styled_flex}>
			{conversation_type === 'received' && <IcMTick height="15px" width="15px" />}
			{message_type !== 'text' && ActiveIcon && <ActiveIcon height="15px" width="15px" />}
			<div
				className={styles.content}
				dangerouslySetInnerHTML={{ __html: message || message_type }}
			/>
		</div>
	);
};
export default formatLastMessage;
