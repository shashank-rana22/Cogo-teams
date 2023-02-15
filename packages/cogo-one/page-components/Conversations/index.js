import { Modal } from '@cogoport/components';
import { useState } from 'react';

import MODAL_COMPONENT_MAPPING from '../../constants/MODAL_COMPONENT_MAPPING';

import Header from './Header';
import MessageConversations from './MessageConversations';
import styles from './styles.module.css';

function Conversations() {
	const [openModal, setOpenModal] = useState({ data: {}, type: null });
	const ActiveModalComp = MODAL_COMPONENT_MAPPING[openModal?.type] || null;
	return (
		<>
			<div className={styles.container}>
				<Header setOpenModal={setOpenModal} />
				<div className={styles.message_container}><MessageConversations /></div>
			</div>
			{openModal?.type && ActiveModalComp && (
				<Modal size="md" show>
					<ActiveModalComp />
				</Modal>
			)}
		</>

	);
}

export default Conversations;
