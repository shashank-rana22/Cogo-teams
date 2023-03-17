import { Avatar, Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Emailbody({ sender = {}, toRecipients = [] }) {
	return (
		<div className={styles.email_body}>

			<div className={styles.body_header}>
				<div className={styles.email_body_avatar}>
					<Avatar personName={sender.emailAddress?.name} size="44px" />
				</div>
				<div className={styles.header_details}>
					<div className={styles.header_name}>
						{sender.emailAddress?.name}
					</div>
					<div className={styles.header_to}>
						To:
						{' '}
						&nbsp;
						{toRecipients.map((recipient) => (

							<Tooltip content={recipient?.emailAddress?.address} interactive placement="top">
								{recipient?.emailAddress?.name}
									&nbsp;
							</Tooltip>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Emailbody;
