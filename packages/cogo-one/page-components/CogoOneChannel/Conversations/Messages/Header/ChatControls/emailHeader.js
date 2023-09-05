import React from 'react';

import styles from './styles.module.css';

function EmailHeader({ formattedData = {} }) {
	const {
		last_message = '',
		last_message_document = {},
	} = formattedData || {};

	const { response = {} } = last_message_document || {};
	const { subject = '' } = response || {};

	return (
		<div className={styles.email_header}>
			Sub:
			{' '}
			{subject || last_message}
		</div>
	);
}

export default EmailHeader;
