import { Modal, Button, RTE, Input } from '@cogoport/components';
import { useState } from 'react';

import { TOOLBARCONFIG } from '../../../../../constants';

import styles from './styles.module.css';

function CommunicationModal({ setModalType = () => {}, receiverEmail = '' }) {
	const closeModal = () => {
		setModalType(null);
	};

	const [emailState, setEmailState] = useState({
		subject : '',
		body    : '',
	});

	return (
		<Modal show size="md" onClose={closeModal} onClickOutside={closeModal} scroll={false}>
			<Modal.Header title={<div className={styles.header}>COMPOSE EMAIL</div>} />
			<Modal.Body>
				<Input
					value={receiverEmail}
					disabled
					size="md"
					className={styles.styled_input}
				/>
				<Input
					value={emailState?.subject}
					onChange={(val) => setEmailState((p) => ({ ...p, subject: val }))}
					size="md"
					placeholder="subject"
					className={styles.styled_input}
				/>
				<RTE
					value={emailState?.body}
					onChange={(val) => setEmailState((p) => ({ ...p, body: val }))}
					toolbarConfig={TOOLBARCONFIG}
					className={styles.styled_editor}
				/>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footer_buttons}>
					<Button size="md" themeType="tertiary" onClick={closeModal}>
						cancel
					</Button>
					<Button size="md" themeType="accent">
						Send
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default CommunicationModal;
