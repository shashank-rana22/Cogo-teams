import { Modal } from '@cogoport/components';
import { collection } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

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
	const messageRef = useRef(null);

	const { id = '', channel_type = '' } = activeMessageCard || {};

	let activeChatCollection;

	if (channel_type) {
		activeChatCollection = collection(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}/messages`,
		);
	}
	const { sendChatMessage } = useSendChat({ firestore, channel_type, id, draftMessages, setDraftMessages });
	const {
		getNextData,
		getFirebaseData,
		lastPage,
		messagesData,
	} = useGetMessages({ firestore, activeChatCollection });

	const scrollBottom = () => {
		setTimeout(() => {
			messageRef?.current?.scrollTo({
				top      : (messageRef?.current?.scrollHeight || 0) + 10,
				behavior : 'smooth',
			});
		}, 100);
	};

	useEffect(() => {
		getFirebaseData();
		scrollBottom();
	}, [activeMessageCard?.id, messageRef]);

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop === 0;
		if (!lastPage && bottom) {
			getNextData();
		}
	};
	const ActiveModalComp = MODAL_COMPONENT_MAPPING[openModal?.type] || null;

	const closeModal = () => (setOpenModal({ type: null, data: {} }));

	return (
		<>
			<div className={styles.container}>
				<Header setOpenModal={setOpenModal} />
				<div className={styles.message_container} onScroll={handleScroll} ref={messageRef}>
					<MessageConversations
						messagesData={messagesData}
						draftMessages={draftMessages}
						setDraftMessages={setDraftMessages}
						id={id}
					/>
				</div>
			</div>
			{openModal?.type && ActiveModalComp && (
				<Modal size="md" show onClose={closeModal} onOuterClick={closeModal} isClosable>
					<ActiveModalComp />
				</Modal>
			)}
		</>

	);
}

export default Messages;
