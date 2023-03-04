import { Toast, Modal, Button, RTE, Input } from '@cogoport/components';
import { useState } from 'react';

import { TOOLBARCONFIG } from '../../../../../../constants';
import getFormatedEmailBody from '../../../../../../helpers/getFormatedEmailBody';
import hideDetails from '../../../../../../utils/hideDetails';

import styles from './styles.module.css';

function ComposeEmail({ closeModal = () => {}, userData = {} }) {
	const [emailState, setEmailState] = useState({
		subject : '',
		body    : '',
	});

	const handleSend = () => {
		const isEmpty = getFormatedEmailBody({ emailState });
		if (isEmpty) {
			Toast.error("You can't send a blank email");
		}
	};
	return (
		<>
			<Modal.Body>
				<Input
					value={hideDetails({ data: userData?.email, type: 'mail' })}
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
					<Button size="md" themeType="accent" onClick={handleSend}>
						Send
					</Button>
				</div>
			</Modal.Footer>
		</>
	);
}
export default ComposeEmail;
