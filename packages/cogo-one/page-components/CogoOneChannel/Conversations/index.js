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
}) {
	return (
		<div className={styles.container}>
			{activeTab === 'message'
				? (
					<Messages
						activeMessageCard={activeMessageCard}
						firestore={firestore}
						suggestions={suggestions}
						userId={userId}
						isomniChannelAdmin={isomniChannelAdmin}
						showBotMessages={showBotMessages}
					/>
				)
				: <VoiceCall activeVoiceCard={activeVoiceCard} /> }
		</div>
	);
}

export default Conversations;
