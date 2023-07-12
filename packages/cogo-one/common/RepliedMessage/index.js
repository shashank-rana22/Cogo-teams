import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';

import MessageBody from '../MessageBody';
import MessageTags from '../MessageTags';

import styles from './styles.module.css';

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
	const { session_type = '' } = typeof message === 'object' ? message : {};

	let backgroundColor = '#fff';
	let repliedTo = user_name;
	if (conversation_type === 'received') {
		backgroundColor = '#F3FAFA';
		repliedTo = 'bot';
		if (session_type === 'admin') {
			backgroundColor = '#fffce6';
			repliedTo = send_by;
		}
	}

	const hasTags = !isEmpty(tags);

	return (
		<div
			className={cl`${styles.container} ${hasTags ? styles.tags_container : ''}`}
			style={{ backgroundColor }}
		>
			{hasTags && <div className={styles.tags}><MessageTags tags={tags} /></div>}
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
