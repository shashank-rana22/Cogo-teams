import { Modal } from '@cogoport/components';
import { collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { FIRESTORE_PATH } from '../../../configurations/firebase-config';
import MODAL_COMPONENT_MAPPING from '../../../constants/MODAL_COMPONENT_MAPPING';
import useGetMessages from '../../../hooks/useGetMessages';
import useSendChat from '../../../hooks/useSendChat';

import Header from './Header';
import MessageConversations from './MessageConversations';
import styles from './styles.module.css';

function Messages({ activeMessageCard = {}, firestore }) {
	const [openModal, setOpenModal] = useState({ data: {}, type: null });
	const [draftMessages, setDraftMessages] = useState({});

	const [messages, setMessages] = useState({});

	const { id = '', channel_type = '' } = activeMessageCard || {};

	let activeChatCollection;

	if (channel_type) {
		activeChatCollection = collection(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}/messages`,
		);
	}

	const { sendChatMessage } = useSendChat({
		firestore,
		channel_type,
		id,
		draftMessages,
		setDraftMessages,
		activeChatCollection,
	});

	const {
		getNextData = () => {},
		getFirebaseData = () => {},
		lastPage,
		messagesData,
	} = useGetMessages({ firestore, activeChatCollection });

	useEffect(() => {
		getFirebaseData();
	}, [id]);

	const {
		comp:ActiveModalComp = null,
		title:{ img = null, name = '' } = {},
	} = MODAL_COMPONENT_MAPPING[openModal?.type] || {};

	const closeModal = () => (setOpenModal({ type: null, data: {} }));

	return (
		<>
			<div className={styles.container}>
				<Header setOpenModal={setOpenModal} />
				<div className={styles.message_container}>
					<MessageConversations
						id={id}
						messagesData={messagesData}
						draftMessage={draftMessages[id]}
						setDraftMessages={setDraftMessages}
						sendChatMessage={sendChatMessage}
						setMessages={setMessages}
						messages={messages}
						getNextData={getNextData}
						lastPage={lastPage}
						setOpenModal={setOpenModal}
					/>
				</div>
			</div>
			{openModal?.type && ActiveModalComp && (
				<Modal
					size="md"
					show
					onClose={closeModal}
					placement="center"
					className={styles.styled_ui_modal_container}
				>
					<Modal.Header title={(
						<div className={styles.modal_header_title}>
							{img && <img src={img} alt="logo" />}
							<div className={styles.modal_title}>{name}</div>
						</div>
					)}
					/>
					<ActiveModalComp />
				</Modal>
			)}
		</>

	);
}

export default Messages;
