import MailConversation from './MailConversation';
import MessageComponent from './MessageComponent';
import styles from './styles.module.css';
import VoiceCall from './VoiceCall';

const CONVERSATION_COMPONENT_MAPPING = {
	message : MessageComponent,
	voice   : VoiceCall,
	mail    : MailConversation,
};

function Conversations({
	activeTab = {},
	firestore = {},
	userId = '',
	setRaiseTicketModal = () => {},
	viewType = '',
	setActiveRoomLoading = false,
	mailProps = {},
	setActiveTab = () => {},
	suggestions = [],
	setModalType = () => {},
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
			setModalType,
		},
		voice: {
			activeVoiceCard: activeTab?.data || {},
		},
		mail: {
			mailProps,
		},
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
