import { isEmpty } from '@cogoport/utils';

import Conversations from '../Conversations';
import EmptyChatPage from '../EmptyChatPage';
import ProfileDetails from '../ProfileDetails';

function ConversationsComp({
	activeTab, activeMessageCard, activeVoiceCard, activeMail, firestore, suggestions, userId, isomniChannelAdmin,
	mailProps, setActiveMessage, setRaiseTicketModal, viewType, updateLeaduser, activeCardId, setModalType,
	activeRoomLoading, zippedTicketsData, hasVoiceCallAccess,
}) {
	if ((activeTab === 'message' && !isEmpty(activeMessageCard))
		|| (activeTab === 'voice' && !isEmpty(activeVoiceCard))
		|| (activeTab === 'mail' && !isEmpty(activeMail))) {
		return (
			<>
				<Conversations
					activeTab={activeTab}
					activeMessageCard={activeMessageCard}
					firestore={firestore}
					activeVoiceCard={activeVoiceCard}
					suggestions={suggestions}
					userId={userId}
					isomniChannelAdmin={isomniChannelAdmin}
					mailProps={mailProps}
					setActiveMessage={setActiveMessage}
					setRaiseTicketModal={setRaiseTicketModal}
					viewType={viewType}
				/>

				{activeTab !== 'mail' && (
					<ProfileDetails
						activeMessageCard={activeMessageCard}
						activeTab={activeTab}
						activeVoiceCard={activeVoiceCard}
						updateLeaduser={updateLeaduser}
						activeCardId={activeCardId}
						setActiveMessage={setActiveMessage}
						setModalType={setModalType}
						activeRoomLoading={activeRoomLoading}
						setRaiseTicketModal={setRaiseTicketModal}
						zippedTicketsData={zippedTicketsData}
						viewType={viewType}
						hasVoiceCallAccess={hasVoiceCallAccess}
						firestore={firestore}
						userId={userId}
					/>
				)}
			</>
		);
	}
	return (
		<EmptyChatPage
			displayMessage={activeTab === 'message' ? 'chat' : 'call log'}
		/>
	);
}
export default ConversationsComp;
