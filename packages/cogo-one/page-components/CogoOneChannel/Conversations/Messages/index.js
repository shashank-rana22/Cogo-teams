import { Modal } from '@cogoport/components';
import { collection } from 'firebase/firestore';
import { useState } from 'react';

import { FIRESTORE_PATH } from '../../../../configurations/firebase-config';
import MODAL_COMPONENT_MAPPING from '../../../../constants/MODAL_COMPONENT_MAPPING';
import useAssignChat from '../../../../hooks/useAssignChat';
import useGetMessages from '../../../../hooks/useGetMessages';
import useListAssignedChatTags from '../../../../hooks/useListAssignedChatTags';
import useSendChat from '../../../../hooks/useSendChat';
import useSendCommunicationTemplate from '../../../../hooks/useSendCommunicationTemplate';
import useSendMessage from '../../../../hooks/useSendMessage';
import useUpdateAssignedChat from '../../../../hooks/useUpdateAssignedChat';
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
}) {
	const [headertags, setheaderTags] = useState();
	const [openModal, setOpenModal] = useState({ data: {}, type: null });
	const [draftMessages, setDraftMessages] = useState({});
	const [draftUploadedFiles, setDraftUploadedFiles] = useState({});
	const [uploading, setUploading] = useState({});
	const { tagOptions = [] } = useListAssignedChatTags();
	const formattedData = getActiveCardDetails(activeMessageCard) || {};

	let activeChatCollection;

	const {
		id = '',
		channel_type = '',
		support_agent_id = '',
		spectators_data = [],
		sender = null,
	} = activeMessageCard || {};

	const {
		sendCommunicationTemplate,
		loading: communicationLoading,
	} = useSendCommunicationTemplate({ formattedData, setOpenModal });

	const hasPermissionToEdit = userId === support_agent_id || isomniChannelAdmin;

	const filteredSpectators = (spectators_data || []).filter(
		({ agent_id: spectatorId }) => spectatorId !== support_agent_id,
	);

	const activeAgentName = (spectators_data || []).find(
		(val) => val.agent_id === support_agent_id,
	)?.agent_name;

	const {
		sendMessage,
		loading:createCommunicationLoading,
	} = useSendMessage({ channel_type, sender });

	if (channel_type && id) {
		activeChatCollection = collection(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}/messages`,
		);
	}

	const closeModal = () => setOpenModal({ type: null, data: {} });

	const { sendChatMessage, messageFireBaseDoc, sentQuickSuggestions } = useSendChat({
		firestore,
		channel_type,
		id,
		draftMessages,
		setDraftMessages,
		activeChatCollection,
		draftUploadedFiles,
		setDraftUploadedFiles,
		sendMessage,
		createCommunicationLoading,
		formattedData,
	});

	const { assignChat = () => {}, loading: assignLoading } = useAssignChat({
		messageFireBaseDoc,
		closeModal,
		activeMessageCard,
		formattedData,
	});

	const {
		getNextData = () => {},
		lastPage,
		loadingMessages,
		messagesData,
		loadingPrevMessages,
	} = useGetMessages({ activeChatCollection, id });
	console.log('messagesData:', messagesData);

	const { updateChat, loading } = useUpdateAssignedChat({
		onClose: closeModal,
		activeMessageCard,
		formattedData,
	});

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
						getNextData={getNextData}
						loadingMessages={loadingMessages}
						lastPage={lastPage}
						setOpenModal={setOpenModal}
						activeMessageCard={activeMessageCard}
						suggestions={suggestions}
						setUploading={setUploading}
						sentQuickSuggestions={sentQuickSuggestions}
						hasPermissionToEdit={hasPermissionToEdit}
						loadingPrevMessages={loadingPrevMessages}
						sendCommunicationTemplate={sendCommunicationTemplate}
						communicationLoading={communicationLoading}
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
						assignLoading={assignLoading}
						loading={loading}
					/>
				</Modal>
			)}
		</>
	);
}

export default Messages;
