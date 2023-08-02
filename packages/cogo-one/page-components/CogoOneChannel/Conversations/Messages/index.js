import { collection } from 'firebase/firestore';
import { useState, useEffect, useRef, useCallback } from 'react';

import { FIRESTORE_PATH } from '../../../../configurations/firebase-config';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';
import { getHasPermissionToEdit } from '../../../../helpers/conversationHelpers';
import { snapshotCleaner, mountActiveRoomSnapShot } from '../../../../helpers/snapshotHelpers';
import useAssignChat from '../../../../hooks/useAssignChat';
import useEscalateToSupplyRm from '../../../../hooks/useEscalateToSupplyRm';
import useListAssignedChatTags from '../../../../hooks/useListAssignedChatTags';
import useRequestAssignChat from '../../../../hooks/useRequestAssignChat';
import useSendCommunicationTemplate from '../../../../hooks/useSendCommunicationTemplate';
import useUpdateAssignedChat from '../../../../hooks/useUpdateAssignedChat';
import getActiveCardDetails from '../../../../utils/getActiveCardDetails';

import Header from './Header';
import MessageConversations from './MessageConversations';
import Footer from './MessageConversations/Footer';
import MessageModals from './MessageModals';
import styles from './styles.module.css';

const TIMEOUT_FOR_SCROLL = 200;

function Messages({
	activeTab = {},
	firestore = {},
	suggestions = [],
	userId = '',
	setRaiseTicketModal = () => {},
	viewType = '',
	setActiveRoomLoading = false,
	setActiveTab = () => {},
	newUserRoomLoading = false,
	setModalType = () => {},
}) {
	const activeRoomSnapshotListener = useRef(null);
	const conversationsDivRef = useRef(null);

	const [openModal, setOpenModal] = useState({ data: {}, type: null });
	const [mailActions, setMailActions] = useState({ actionType: '', data: {} });

	const { tagOptions = [] } = useListAssignedChatTags();
	const { escalateToSupplyRm, supplierLoading } = useEscalateToSupplyRm();

	const formattedData = getActiveCardDetails(activeTab?.data) || {};
	const { hasNoFireBaseRoom = false } = activeTab || {};

	const closeModal = () => {
		setOpenModal({ type: null, data: {} });
	};

	let activeChatCollection;

	const {
		id = '', channel_type = '', support_agent_id : supportAgentId = '', spectators_data = [], session_type = '',
	} = formattedData || {};

	const {
		sendCommunicationTemplate, loading: communicationLoading,
	} = useSendCommunicationTemplate({ formattedData, callbackfunc: closeModal, isOtherChannels: false });

	const showBotMessages = session_type === 'bot';

	const canMessageOnBotSession = showBotMessages
		&& VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.can_message_on_bot_session;

	const hasPermissionToEdit = getHasPermissionToEdit({
		showBotMessages,
		userId,
		formattedData,
		canMessageOnBotSession,
		viewType,
		hasNoFireBaseRoom,
	});

	const filteredSpectators = (spectators_data || []).filter(
		({ agent_id: spectatorId }) => spectatorId !== supportAgentId,
	);

	const activeAgentName = (spectators_data || []).find(
		(val) => val.agent_id === supportAgentId,
	)?.agent_name;

	if (channel_type && id) {
		activeChatCollection = collection(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}/messages`,
		);
	}

	const { assignChat = () => {}, loading: assignLoading } = useAssignChat({
		firestore,
		closeModal,
		activeMessageCard: activeTab?.data,
		formattedData,
		canMessageOnBotSession,
	});

	const { updateChat, loading } = useUpdateAssignedChat({
		onClose           : closeModal,
		activeMessageCard : activeTab?.data,
		formattedData,
	});

	const {
		requestForAssignChat,
		requestAssignLoading,
	} = useRequestAssignChat();

	const scrollToLastMessage = useCallback(() => {
		setTimeout(() => {
			conversationsDivRef.current?.scrollTo({
				top   	  : conversationsDivRef.current.scrollHeight,
				behavior : 'smooth',
			});
		}, TIMEOUT_FOR_SCROLL);
	}, []);

	const activeCardId = activeTab?.data?.id;
	const activeChannelType = activeTab?.data?.channel_type;

	const { actionType = '' } = mailActions || {};

	useEffect(() => {
		mountActiveRoomSnapShot({
			activeRoomSnapshotListener,
			setActiveRoomLoading,
			activeCardId,
			firestore,
			activeChannelType,
			setActiveTab,
		});

		setMailActions({ actionType: '', data: {} });

		return () => {
			snapshotCleaner({ ref: activeRoomSnapshotListener });
		};
	}, [activeCardId, activeChannelType, firestore, setActiveRoomLoading, setActiveTab]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<Header
						setOpenModal={setOpenModal}
						assignChat={assignChat}
						formattedData={formattedData}
						updateChat={updateChat}
						loading={loading}
						activeMessageCard={activeTab?.data}
						closeModal={closeModal}
						assignLoading={assignLoading}
						activeAgentName={activeAgentName}
						hasPermissionToEdit={hasPermissionToEdit}
						filteredSpectators={filteredSpectators}
						tagOptions={tagOptions}
						supportAgentId={supportAgentId}
						showBotMessages={showBotMessages}
						userId={userId}
						requestForAssignChat={requestForAssignChat}
						requestAssignLoading={requestAssignLoading}
						canMessageOnBotSession={canMessageOnBotSession}
						viewType={viewType}
						firestore={firestore}
						escalateToSupplyRm={escalateToSupplyRm}
						supplierLoading={supplierLoading}
						hasNoFireBaseRoom={hasNoFireBaseRoom}
					/>
				</div>
				<div
					className={styles.message_container}
					style={{ height: (channel_type === 'email' && !actionType) ? '83%' : '64%' }}
				>
					<MessageConversations
						formattedData={formattedData}
						activeMessageCard={activeTab?.data}
						suggestions={suggestions}
						hasPermissionToEdit={hasPermissionToEdit}
						closeModal={closeModal}
						setRaiseTicketModal={setRaiseTicketModal}
						canMessageOnBotSession={canMessageOnBotSession}
						viewType={viewType}
						hasNoFireBaseRoom={hasNoFireBaseRoom}
						setModalType={setModalType}
						activeTab={activeTab}
						activeChatCollection={activeChatCollection}
						newUserRoomLoading={newUserRoomLoading}
						firestore={firestore}
						ref={conversationsDivRef}
						scrollToLastMessage={scrollToLastMessage}
						setMailActions={setMailActions}
						mailActions={mailActions}
					/>
				</div>
				<div className={styles.footer}>
					{(channel_type !== 'email' || actionType) && (
						<Footer
							canMessageOnBotSession={canMessageOnBotSession}
							hasPermissionToEdit={hasPermissionToEdit}
							suggestions={suggestions}
							formattedData={formattedData}
							viewType={viewType}
							firestore={firestore}
							activeChatCollection={activeChatCollection}
							setOpenModal={setOpenModal}
							sendCommunicationTemplate={sendCommunicationTemplate}
							communicationLoading={communicationLoading}
							assignChat={assignChat}
							assignLoading={assignLoading}
							scrollToBottom={scrollToLastMessage}
							mailActions={mailActions}
							setMailActions={setMailActions}
						/>
					)}
				</div>
			</div>
			<MessageModals
				openModal={openModal}
				closeModal={closeModal}
				activeTab={activeTab}
				loading={loading}
				assignLoading={assignLoading}
				viewType={viewType}
			/>
		</>
	);
}

export default Messages;
