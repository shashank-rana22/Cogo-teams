import { cl } from '@cogoport/components';

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
	const Component = CONVERSATION_COMPONENT_MAPPING[activeTab?.tab] || null;

	const COMPONENT_PROPS_MAPPING = {
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

	if (!Component) {
		return null;
	}

	return (
		<div className={cl`${activeTab?.tab === 'mail' ? styles.mail_div : styles.container}`}>
			<Component {...(COMPONENT_PROPS_MAPPING[activeTab?.tab] || {})} />
		</div>
	);
}

export default Conversations;
