import { Modal } from '@cogoport/components';
import { collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { FIRESTORE_PATH } from '../../../../configurations/firebase-config';
import MODAL_COMPONENT_MAPPING from '../../../../constants/MODAL_COMPONENT_MAPPING';
import useAssignChat from '../../../../hooks/useAssignChat';
import useGetMessages from '../../../../hooks/useGetMessages';
import useSendChat from '../../../../hooks/useSendChat';
import useSendMessage from '../../../../hooks/useSendMessage';
import useUpdateAssignedChat from '../../../../hooks/useUpdateAssignedChat';
import getActiveCardDetails from '../../../../utils/getActiveCardDetails';

import Header from './Header';
import MessageConversations from './MessageConversations';
import styles from './styles.module.css';

function Messages({ activeMessageCard = {}, firestore, suggestions = [], userId = '' }) {
	const [headertags, setheaderTags] = useState();

	const [openModal, setOpenModal] = useState({ data: {}, type: null });

	const [draftMessages, setDraftMessages] = useState({});

	const [draftUploadedFiles, setDraftUploadedFiles] = useState({});

	const [messages, setMessages] = useState({});

	const [uploading, setUploading] = useState({});

	const [roomData, setRoomData] = useState(activeMessageCard || {});

	useEffect(() => {
		setRoomData(activeMessageCard);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(activeMessageCard)]);

	const formattedData = getActiveCardDetails(activeMessageCard) || {};

	const {
		id = '', channel_type = '', support_agent_id = [],
		spectators_data = [],
	} = roomData || {};
	const hasPermissionToEdit = userId === support_agent_id;
	const filteredSpectators = (spectators_data || []).filter(({ id:spectatorId }) => spectatorId !== support_agent_id);
	const activeAgentName = (spectators_data || []).find((val) => val.id === support_agent_id)?.name;
	const {
		sendMessage,
		loading:createCommunicationLoading,
	} = useSendMessage({ channel_type });

	let activeChatCollection;

	if (channel_type && id) {
		activeChatCollection = collection(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}/messages`,
		);
	}

	const { sendChatMessage, messageFireBaseDoc, sentQuickSuggestions } = useSendChat({
		firestore,
		channel_type,
		id,
		draftMessages,
		setDraftMessages,
		activeChatCollection,
		draftUploadedFiles,
		setDraftUploadedFiles,
		setRoomData,
		sendMessage,
		createCommunicationLoading,
		formattedData,
	});
	const closeModal = () => (setOpenModal({ type: null, data: {} }));
	const {
		assignChat = () => {},
		loading:assignLoading,
	} = useAssignChat({ messageFireBaseDoc, setRoomData, closeModal, roomData });
	const {
		getNextData = () => {},
		getFirebaseData = () => {},
		lastPage,
		messagesData,
	} = useGetMessages({ firestore, activeChatCollection });

	useEffect(() => {
		getFirebaseData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const {
		updateChat,
		loading,
	} = useUpdateAssignedChat({
		roomData,
		onClose: closeModal,
		messageFireBaseDoc,
		setRoomData,
	});

	const {
		comp:ActiveModalComp = null,
		title:{ img = null, name = null } = {}, modalSize = 'md',
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
					roomData={roomData}
					updateChat={updateChat}
					loading={loading}
					closeModal={closeModal}
					assignLoading={assignLoading}
					activeAgentName={activeAgentName}
					hasPermissionToEdit={hasPermissionToEdit}
					filteredSpectators={filteredSpectators}
				/>
				<div className={styles.message_container} key={id}>
					<MessageConversations
						messagesData={messagesData}
						uploading={uploading}
						draftMessage={draftMessages?.[id]}
						draftUploadedFile={draftUploadedFiles?.[id]}
						setDraftMessages={setDraftMessages}
						setDraftUploadedFiles={setDraftUploadedFiles}
						sendChatMessage={sendChatMessage}
						setMessages={setMessages}
						messages={messages}
						getNextData={getNextData}
						lastPage={lastPage}
						setOpenModal={setOpenModal}
						activeMessageCard={roomData}
						suggestions={suggestions}
						setUploading={setUploading}
						sentQuickSuggestions={sentQuickSuggestions}
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
						<Modal.Header title={(
							<div className={styles.modal_header_title}>
								{img && <img src={img} alt="logo" />}
								<div className={styles.modal_title}>{name}</div>
							</div>
						)}
						/>
					)}
					<ActiveModalComp data={openModal?.data || {}} />
				</Modal>
			)}
		</>

	);
}

export default Messages;
