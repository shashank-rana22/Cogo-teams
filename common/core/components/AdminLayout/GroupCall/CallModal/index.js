import { Modal } from '@cogoport/components';
import { getCookie } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

// eslint-disable-next-line max-len
const DUMMY_URL = 'https://chatbot.dev.cogoport.io:3010/join/?meeting=U2FsdGVkX1%2BymceEIiSXj4%2Bso1zRVkQs7xIKNpMW0HqFM57zaNJKYxx6zzLLOMhwAdcHZqCWOcwkUl3RBq3JAWuL%2FwlF3%2F50JEYuvKrJO0mMNmgn%2FQWgSYT0XvVpMJjv72dN2goxLe%2F7TA0A4F2%2BHYieVdnQFh%2BY5n4gezpKd65GNVhNlHhoHDDsCPTL9hgKVYOeKIRdrcPINlYqjtGe3pEot7whxgm%2B20a5436Es50%3D';

function CallModal({ url = DUMMY_URL }) {
	const [showDeleteModal, setShowDeleteModal] = useState(true);
	console.log('setShowDeleteModal', setShowDeleteModal);

	const auth = getCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME);

	return (
		<Modal
			show={showDeleteModal}
			size="fullscreen"
			placement="center"
			closeOnOuterClick={false}
			animate
			showCloseIcon={false}
		>
			<Modal.Header title="Video Call" className={styles.modal_header} />
			<Modal.Body className={styles.modal_body}>
				<iframe
					allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay"
					src={`${url}&auth=${auth}`}
					width="100%"
					height="100%"
					title="Video Call"
					style={{ border: 'none' }}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default CallModal;
