import { Modal } from '@cogoport/components';
import { collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { FIRESTORE_PATH } from '../../../../configurations/firebase-config';
import MODAL_COMPONENT_MAPPING from '../../../../constants/MODAL_COMPONENT_MAPPING';
import useAssignChat from '../../../../hooks/useAssignChat';
import useGetMessages from '../../../../hooks/useGetMessages';
import useSendChat from '../../../../hooks/useSendChat';
import useSendWhatsappMessage from '../../../../hooks/useSendWhatsappMessage';
import getActiveCardDetails from '../../../../utils/getActiveCardDetails';

import Header from './Header';
import MessageConversations from './MessageConversations';
import styles from './styles.module.css';

function Messages({ activeMessageCard = {}, firestore, suggestions = [] }) {
	const [headertags, setheaderTags] = useState();
	const [openModal, setOpenModal] = useState({ data: {}, type: null });
	const [draftMessages, setDraftMessages] = useState({});
	const [draftUploadedFiles, setDraftUploadedFiles] = useState({});
	const [messages, setMessages] = useState({});
	const [uploading, setUploading] = useState({});
	const [roomData, setRoomData] = useState(activeMessageCard || {});
	const { createWhatsappCommunication, loading:createCommunicationLoading } = useSendWhatsappMessage();
	useEffect(() => {
		setRoomData(activeMessageCard);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(activeMessageCard)]);
	const formattedData = getActiveCardDetails(activeMessageCard) || {};
	const {
		id = '', channel_type = '',
		...rest
	} = roomData || {};

	let activeChatCollection;

	if (channel_type) {
		activeChatCollection = collection(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}/messages`,
		);
	}

	const { sendChatMessage, updatetags, messageFireBaseDoc } = useSendChat({
		firestore,
		channel_type,
		id,
		draftMessages,
		setDraftMessages,
		activeChatCollection,
		draftUploadedFiles,
		setDraftUploadedFiles,
		setRoomData,
		createWhatsappCommunication,
		createCommunicationLoading,
		formattedData,
	});

	const { assignChat = () => {} } = useAssignChat({ messageFireBaseDoc, setRoomData });
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
		comp:ActiveModalComp = null,
		title:{ img = null, name = null } = {}, modalSize = 'md',
	} = MODAL_COMPONENT_MAPPING[openModal?.type] || {};

	const closeModal = () => (setOpenModal({ type: null, data: {} }));

	return (
		<>
			<div className={styles.container}>
				<Header
					setOpenModal={setOpenModal}
					restData={rest}
					updatetags={updatetags}
					setheaderTags={setheaderTags}
					headertags={headertags}
					assignChat={assignChat}
					formattedData={formattedData}
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
