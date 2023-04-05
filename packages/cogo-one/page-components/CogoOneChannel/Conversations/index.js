import { cl } from '@cogoport/components';

import MailConversation from './MailConversation';
import Messages from './Messages';
import styles from './styles.module.css';
import VoiceCall from './VoiceCall';

function Conversations({
	activeTab = '',
	activeMessageCard = {},
	firestore,
	activeVoiceCard,
	suggestions = [],
	userId,
	isomniChannelAdmin = false,
	showBotMessages = false,
	mailProps,
	setActiveMessage = () => {},
}) {
	return (
		<div className={cl`${activeTab === 'mail' ? styles.mail_div : styles.container}`}>
			{activeTab === 'message' && (
				<Messages
					activeMessageCard={activeMessageCard}
					firestore={firestore}
					suggestions={suggestions}
					userId={userId}
					isomniChannelAdmin={isomniChannelAdmin}
					showBotMessages={showBotMessages}
					setActiveMessage={setActiveMessage}
				/>
			)}
			{activeTab === 'voice' && (<VoiceCall activeVoiceCard={activeVoiceCard} />)}
			{activeTab === 'mail' && (
				<MailConversation
					mailProps={mailProps}
				/>
			)}
		</div>
	);
}

export default Conversations;
