import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';

import MessageBody from '../MessageBody';
import MessageTags from '../MessageTags';

import styles from './styles.module.css';

const getBgColorAndRepliedTo = ({ userName, conversationType, sessionType, sendBy }) => {
	let backgroundColor = '#fff';
	let repliedTo = userName;

	if (conversationType === 'received') {
		backgroundColor = '#F3FAFA';
		repliedTo = 'bot';
		if (sessionType === 'admin') {
			backgroundColor = '#fffce6';
			repliedTo = sendBy;
		}
	}

	return {
		backgroundColor, repliedTo,
	};
};

function RepliedMessage({ reply_metadata = {}, user_name = '' }) {
	const {
		conversation_type = '',
		message_type = '',
		media_url = '',
		send_by = '',
		message = '',
		tags = [],
	} = reply_metadata;

	const displayMessage = typeof message === 'object' ? (message?.text
		|| message?.components?.[GLOBAL_CONSTANTS.zeroth_index]?.text) : message;
	const { session_type = '', tags:messageTags = [] } = typeof message === 'object' ? message : {};

	const { backgroundColor, repliedTo } = getBgColorAndRepliedTo({
		userName         : user_name,
		conversationType : conversation_type,
		sessionType      : session_type,
		sendBy           : send_by,
	});

	const hasTags = !isEmpty(tags);

	const displayTags = hasTags ? tags : messageTags;

	return (
		<div
			className={cl`${styles.container} ${!isEmpty(displayTags) ? styles.tags_container : ''}`}
			style={{ backgroundColor }}
		>
			<div className={styles.tags}><MessageTags tags={displayTags} /></div>
			<div className={styles.name}>{startCase(repliedTo?.toLowerCase() || '')}</div>
			<MessageBody
				response={{
					message: displayMessage,
					media_url,
				}}
				message_type={message_type === 'list' ? 'text' : message_type}
			/>
		</div>
	);
}
export default RepliedMessage;
