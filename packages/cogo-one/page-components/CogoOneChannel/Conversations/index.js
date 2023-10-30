import MailConversation from './MailConversation';
import MessageComponent from './MessageComponent';
import styles from './styles.module.css';
import TeamChats from './TeamChats';
import VoiceCall from './VoiceCall';

const CONVERSATION_COMPONENT_MAPPING = {
	message         : MessageComponent,
	voice           : VoiceCall,
	outlook         : MailConversation,
	firebase_emails : MessageComponent,
	teams           : TeamChats,
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
	listCogooneGroupMembers = () => {},
	membersList = [],
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
			mailProps,
		},
		voice: {
			activeVoiceCard: activeTab?.data || {},
		},
		outlook: {
			mailProps,
		},
		firebase_emails: {
			firestore,
			activeTab,
			userId,
			viewType,
			setRaiseTicketModal,
			setActiveRoomLoading,
			setActiveTab,
			suggestions,
			setModalType,
			mailProps,
		},
		teams: {
			activeTeamCard : activeTab?.data || {},
			suggestions,
			viewType,
			loggedInUserId : userId,
			firestore,
			setActiveTab,
			activeTab,
			listCogooneGroupMembers,
			membersList,
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
