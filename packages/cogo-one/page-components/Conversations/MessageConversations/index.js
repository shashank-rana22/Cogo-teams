/* eslint-disable max-len */
import { IcMHappy, IcMAttach, IcMSend, IcMInfo } from '@cogoport/icons-react';

import ReceiveDiv from './ReceiveDiv';
import SentDiv from './SentDiv';
import styles from './styles.module.css';

function MessageConversations() {
	const suggestions = ['Hello, Goodmorning Sir!', 'Hi, how may I help you?', 'Thank- you'];
	const messages = [{
		name              : 'John Wick',
		time              : '11:19',
		messages          : 'Hello, I am calling to take confirmation ofmy shipment details',
		conversation_type : 'receive',
	}, {
		name              : 'John Wick',
		time              : '11:19',
		messages          : 'Hello, I am calling to take confirmation ofmy shipment details',
		conversation_type : 'sent',
	}];
	return (
		<div>
			<div className={styles.container}>
				{(messages || []).map((eachMessage) => (eachMessage?.conversation_type !== 'sent' ? <ReceiveDiv /> : <SentDiv />))}
			</div>
			<div className={styles.text_area_div}>
				<div className={styles.suggestions_div}>
					<div className={styles.flex}>
						<div className={styles.suggestions_text}>Suggestions:</div>
						{(suggestions || []).map((eachSuggestion) => <div className={styles.tag_div}>{eachSuggestion}</div>)}
					</div>
					<IcMInfo fill="#221F20" height="20px" width="20px" />
				</div>
				<textarea rows={3} placeholder="Type your message..." className={styles.text_area} />
				<div className={styles.flex_space_between}>
					<div className={styles.flex}>
						<IcMAttach fill="#828282" />
						<IcMHappy fill="#828282" />
					</div>
					<div>
						<IcMAttach fill="#4F4F4F" />
						<IcMSend fill="#EE3425" />
					</div>
				</div>
			</div>
		</div>
	);
}
export default MessageConversations;
