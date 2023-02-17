import Messages from './Messages';
import styles from './styles.module.css';
import VoiceCall from './VoiceCall';

function Conversations({
	activeTab = '',
	activeMessageCard = {},
	firestore,
	activeVoiceCard,
	suggestions = [],

}) {
	return (
		<div className={styles.container}>
			{activeTab === 'message'
				? <Messages activeMessageCard={activeMessageCard} firestore={firestore} suggestions={suggestions} />
				: <VoiceCall activeVoiceCard={activeVoiceCard} /> }
		</div>
	);
}
export default Conversations;
