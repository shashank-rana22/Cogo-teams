import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const EMAILS_TO_BE_SHOWN = 5;

function ListEmails({
	emailSuggestions = [],
	type = '',
	handleKeyPress = () => {},
}) {
	return (
		<div className={styles.list_container}>
			{emailSuggestions.slice(
				GLOBAL_CONSTANTS.zeroth_index,
				EMAILS_TO_BE_SHOWN,
			).map(
				(itm) => (
					<div
						className={styles.email_container}
						key={itm}
						role="presentation"
						onClick={() => handleKeyPress({ type, email: itm })}
					>
						{itm}
					</div>
				),
			)}
		</div>
	);
}

export default ListEmails;
