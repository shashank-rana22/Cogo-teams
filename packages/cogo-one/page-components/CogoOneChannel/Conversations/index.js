import MailConversation from './MailConversation';
import Messages from './Messages';
import styles from './styles.module.css';
import VoiceCall from './VoiceCall';

const CONVERSATION_COMPONENT_MAPPING = {
	message : Messages,
	voice   : VoiceCall,
	mail    : MailConversation,
};

function Conversations({
	activeTab = {},
	firestore,
	userId,
	setRaiseTicketModal = () => {},
	viewType = '',
	setActiveRoomLoading,
	mailProps,
	setActiveTab,
	suggestions,
}) {
	const componentPropsMapping = {
		message: {
			firestore,
			activeTab,
			userId,
			viewType,
			setRaiseTicketModal,
			setActiveRoomLoading,
			setActiveTab,
			suggestions,
		},
		voice : { activeVoiceCard: activeTab?.data || {} },
		mail  : { mailProps },
	};

	const Component = CONVERSATION_COMPONENT_MAPPING[activeTab?.tab] || null;

	if (!Component) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Component
				key={activeTab?.tab}
				{...(componentPropsMapping[activeTab?.tab] || {})}
			/>
		</div>
	);
}

export default Conversations;
