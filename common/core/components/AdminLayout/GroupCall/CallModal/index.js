import { Modal } from '@cogoport/components';
import { getCookie } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function CallModal({
	url = '',
	showDeleteModal = false,
	setShowDeleteModal = () => {},
}) {
	if (!url) {
		return null;
	}
	console.log('meeting_link', url, showDeleteModal);

	// eslint-disable-next-line max-len
	const cogo_admin_auth_token = getCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME) || 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc3NzgxNzIsImlhdCI6MTY5NzYwNTM3MiwiVXNlclNlc3Npb25JRCI6IjEwOWM3MWQxLTNlOGMtNDM5OS1hOGY5LWVjMzEwY2JhODk2YiJ9.R8Qb7n3gMO8EXnl-i-Sv2ZvlEBOsanmP_n1C5cvWfHoJV3-3aTtzDR0TOsDtC3RZdawxMesLU008R21TMGGL3Q';

	return (
		<Modal show={showDeleteModal} size="fullscreen" placement="center" onClose={() => setShowDeleteModal(false)}>
			<Modal.Header title="Video Call" className={styles.modal_header} />
			<Modal.Body className={styles.modal_body}>
				<iframe
					allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay"
					src={`${url}&auth=${cogo_admin_auth_token}`}
					type="application/pdf"
					width="100%"
					height="100%"
					title="Document"
					style={{ border: 'none' }}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default CallModal;
