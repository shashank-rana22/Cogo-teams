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
	activeMail = {},
	setButtonType = () => {},
	buttonType = '',
	setShowMailModal = () => {},
	setBccArray = () => {},
	setRecipientArray = () => {},
	setEmailState = () => {},
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
				/>
			)}
			{activeTab === 'voice' && (<VoiceCall activeVoiceCard={activeVoiceCard} />)}
			{activeTab === 'mail' && (
				<MailConversation
					activeMail={activeMail}
					setButtonType={setButtonType}
					buttonType={buttonType}
					setShowMailModal={setShowMailModal}
					setBccArray={setBccArray}
					setRecipientArray={setRecipientArray}
					setEmailState={setEmailState}
				/>
			)}
		</div>
	);
}

export default Conversations;
