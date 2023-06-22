import { Modal } from '@cogoport/components';
import { collection } from 'firebase/firestore';
import { useState } from 'react';

import { FIRESTORE_PATH } from '../../../../configurations/firebase-config';
import MODAL_COMPONENT_MAPPING from '../../../../constants/MODAL_COMPONENT_MAPPING';
import useAssignChat from '../../../../hooks/useAssignChat';
import useEscalateToSupplyRm from '../../../../hooks/useEscalateToSupplyRm';
import useGetMessages from '../../../../hooks/useGetMessages';
import useListAssignedChatTags from '../../../../hooks/useListAssignedChatTags';
import useRequestAssignChat from '../../../../hooks/useRequestAssignChat';
import useSendChat from '../../../../hooks/useSendChat';
import useSendCommunicationTemplate from '../../../../hooks/useSendCommunicationTemplate';
import useUpdateAssignedChat from '../../../../hooks/useUpdateAssignedChat';
import useUpdateUserRoom from '../../../../hooks/useUpdateUserRoom';
import getActiveCardDetails from '../../../../utils/getActiveCardDetails';

import Header from './Header';
import MessageConversations from './MessageConversations';
import styles from './styles.module.css';

function Messages({
	activeMessageCard = {},
	firestore,
	suggestions = [],
	userId = '',
	isomniChannelAdmin = false,
	setActiveMessage = () => {},
	setRaiseTicketModal = () => {},
	viewType = '',
}) {
	const [headertags, setheaderTags] = useState();
	const [openModal, setOpenModal] = useState({ data: {}, type: null });
	const [draftMessages, setDraftMessages] = useState({});
	const [draftUploadedFiles, setDraftUploadedFiles] = useState({});
	const [uploading, setUploading] = useState({});

	const { tagOptions = [] } = useListAssignedChatTags();

	const { escalateToSupplyRm, supplierLoading } = useEscalateToSupplyRm();

	const formattedData = getActiveCardDetails(activeMessageCard) || {};

	const closeModal = () => {
		setOpenModal({ type: null, data: {} });
	};

	let activeChatCollection;

	const {
		id = '',
		channel_type = '',
		support_agent_id = '',
		spectators_data = [],
		session_type = '',
	} = activeMessageCard || {};

	const {
		sendCommunicationTemplate,
		loading: communicationLoading,
	} = useSendCommunicationTemplate({ formattedData, callbackfunc: closeModal, isOtherChannels: false });

	const showBotMessages = session_type === 'bot';

	const canMessageOnBotSession = showBotMessages && ['shipment_view'].includes(viewType);

	const hasPermissionToEdit = canMessageOnBotSession || (!showBotMessages && (userId === support_agent_id
		|| ['admin_view', 'shipment_view'].includes(viewType))) || activeMessageCard.group_members?.includes(userId);

	const filteredSpectators = (spectators_data || []).filter(
		({ agent_id: spectatorId }) => spectatorId !== support_agent_id,
	);

	const activeAgentName = (spectators_data || []).find(
		(val) => val.agent_id === support_agent_id,
	)?.agent_name;

	if (channel_type && id) {
		activeChatCollection = collection(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}/messages`,
		);
	}

	const { sendChatMessage, messageFireBaseDoc, sentQuickSuggestions, messageLoading } = useSendChat({
		firestore,
		channel_type,
		id,
		draftMessages,
		setDraftMessages,
		activeChatCollection,
		draftUploadedFiles,
		setDraftUploadedFiles,
		formattedData,
	});

	const { assignChat = () => {}, loading: assignLoading } = useAssignChat({
		messageFireBaseDoc,
		channel_type,
		firestore,
		closeModal,
		activeMessageCard,
		formattedData,
		canMessageOnBotSession,
	});

	const {
		getNextData = () => {},
		lastPage,
		firstLoadingMessages,
		messagesData,
		loadingPrevMessages,
	} = useGetMessages({ activeChatCollection, id });

	const { updateChat, loading } = useUpdateAssignedChat({
		onClose: closeModal,
		activeMessageCard,
		formattedData,
	});

	const {
		updateRoomLoading,
		updateUserRoom,
	} = useUpdateUserRoom();
	const {
		requestForAssignChat,
		requestAssignLoading,
	} = useRequestAssignChat();

	const changeSessionAndMessage = (type = '') => {
		const callbackFunc = type === 'quick_message' ? sentQuickSuggestions : sendChatMessage;
		if (!canMessageOnBotSession) {
			return callbackFunc;
		}
		return (scrollToBottom, val) => assignChat(
			{
				payload      : { agent_id: userId, is_allowed_to_chat: true },
				callbackFunc : () => callbackFunc(scrollToBottom, val),
			},
		);
	};

	const {
		comp: ActiveModalComp = null,
		title: { img = null, name = null } = {},
		modalSize = 'md',
	} = MODAL_COMPONENT_MAPPING[openModal?.type] || {};

	return (
		<>
			<div className={styles.container}>
				<Header
					setOpenModal={setOpenModal}
					setheaderTags={setheaderTags}
					headertags={headertags}
					assignChat={assignChat}
					formattedData={formattedData}
					updateChat={updateChat}
					loading={loading}
					activeMessageCard={activeMessageCard}
					closeModal={closeModal}
					assignLoading={assignLoading}
					activeAgentName={activeAgentName}
					hasPermissionToEdit={hasPermissionToEdit}
					filteredSpectators={filteredSpectators}
					tagOptions={tagOptions}
					support_agent_id={support_agent_id}
					showBotMessages={showBotMessages}
					userId={userId}
					isomniChannelAdmin={isomniChannelAdmin}
					updateRoomLoading={updateRoomLoading}
					updateUserRoom={updateUserRoom}
					requestForAssignChat={requestForAssignChat}
					requestAssignLoading={requestAssignLoading}
					canMessageOnBotSession={canMessageOnBotSession}
					viewType={viewType}
					firestore={firestore}
					escalateToSupplyRm={escalateToSupplyRm}
					supplierLoading={supplierLoading}
				/>
				<div className={styles.message_container} key={id}>
					<MessageConversations
						formattedData={formattedData}
						messagesData={messagesData}
						uploading={uploading}
						draftMessage={draftMessages?.[id]}
						draftUploadedFile={draftUploadedFiles?.[id]}
						setDraftMessages={setDraftMessages}
						setDraftUploadedFiles={setDraftUploadedFiles}
						sendChatMessage={changeSessionAndMessage('chat_message')}
						getNextData={getNextData}
						firstLoadingMessages={firstLoadingMessages}
						lastPage={lastPage}
						setOpenModal={setOpenModal}
						activeMessageCard={activeMessageCard}
						suggestions={suggestions}
						setUploading={setUploading}
						sentQuickSuggestions={changeSessionAndMessage('quick_message')}
						hasPermissionToEdit={hasPermissionToEdit}
						loadingPrevMessages={loadingPrevMessages}
						sendCommunicationTemplate={sendCommunicationTemplate}
						communicationLoading={communicationLoading}
						closeModal={closeModal}
						messageLoading={canMessageOnBotSession ? (messageLoading || assignLoading) : messageLoading}
						setActiveMessage={setActiveMessage}
						setRaiseTicketModal={setRaiseTicketModal}
						canMessageOnBotSession={canMessageOnBotSession}
						changeSessionAndMessage={changeSessionAndMessage}
					/>
				</div>
			</div>
			{openModal?.type && ActiveModalComp && (
				<Modal
					size={modalSize}
					show
					onClose={closeModal}
					placement="center"
					className={styles.styled_ui_modal_container}
				>
					{name && (
						<Modal.Header
							title={(
								<div className={styles.modal_header_title}>
									{img && <img src={img} alt="logo" />}
									<div className={styles.modal_title}>
										{name}
									</div>
								</div>
							)}
						/>
					)}
					<ActiveModalComp
						data={openModal?.data || {}}
						activeMessageCard={activeMessageCard}
						assignLoading={assignLoading}
						loading={loading}
					/>
				</Modal>
			)}
		</>
	);
}

export default Messages;
