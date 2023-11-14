import { collection } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

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
import MessageModals from './MessageModals';
import styles from './styles.module.css';

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
	mailProps = {},
	isMobile = false,
}) {
	const activeRoomSnapshotListener = useRef(null);

	const [openModal, setOpenModal] = useState({ data: {}, type: null });

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

	const activeCardId = activeTab?.data?.id;
	const activeChannelType = activeTab?.data?.channel_type;

	const commonProps = {
		firestore,
		formattedData,
		hasPermissionToEdit,
		closeModal,
		canMessageOnBotSession,
		viewType,
		hasNoFireBaseRoom,
		assignLoading,
		setOpenModal,
		assignChat,
		userId,
		supportAgentId,
		activeMessageCard: activeTab?.data,
		setActiveTab,
		isMobile,
	};

	useEffect(() => {
		mountActiveRoomSnapShot({
			activeRoomSnapshotListener,
			setActiveRoomLoading,
			activeCardId,
			firestore,
			activeChannelType,
			setActiveTab,
		});

		return () => {
			snapshotCleaner({ ref: activeRoomSnapshotListener });
		};
	}, [activeCardId, activeChannelType, firestore, setActiveRoomLoading, setActiveTab]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<Header
						{...commonProps}
						updateChat={updateChat}
						loading={loading}
						activeAgentName={activeAgentName}
						filteredSpectators={filteredSpectators}
						tagOptions={tagOptions}
						showBotMessages={showBotMessages}
						requestForAssignChat={requestForAssignChat}
						requestAssignLoading={requestAssignLoading}
						escalateToSupplyRm={escalateToSupplyRm}
						supplierLoading={supplierLoading}
						setActiveTab={setActiveTab}
					/>
				</div>
				<div className={styles.message_container}>
					<MessageConversations
						{...commonProps}
						suggestions={suggestions}
						setRaiseTicketModal={setRaiseTicketModal}
						setModalType={setModalType}
						activeTab={activeTab}
						activeChatCollection={activeChatCollection}
						newUserRoomLoading={newUserRoomLoading}
						communicationLoading={communicationLoading}
						mailProps={mailProps}
						sendCommunicationTemplate={sendCommunicationTemplate}
					/>
				</div>
			</div>
			<MessageModals
				openModal={openModal}
				closeModal={closeModal}
				activeTab={activeTab}
				loading={loading}
				assignLoading={assignLoading}
				viewType={viewType}
				formattedData={formattedData}
			/>
		</>
	);
}

export default Messages;
