import MessageBody from '../../../../../../common/MessageBody';

import styles from './styles.module.css';

function RepliedMessage({ reply_metadata = {}, user_name = '' }) {
	const {
		conversation_type = '',
		message_type = '',
		media_url = '',
		send_by = '',
		message = '',
	} = reply_metadata;

	const displayMessage = typeof message === 'object' ? message?.text : message;
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
	console.log('media_url:', media_url, message);
	console.log('message_type:', message_type);
	return (
		<div
			className={styles.container}
			style={{ '--background-color': backgroundColor }}
		>
			<div className={styles.name}>{repliedTo}</div>
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
