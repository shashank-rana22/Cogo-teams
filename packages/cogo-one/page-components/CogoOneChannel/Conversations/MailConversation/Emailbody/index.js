import { Avatar, Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Emailbody({ sender = {}, toRecipients = [], ccRecipients = [] }) {
	const { emailAddress = {} } = sender || {};
	const { name = '', address = '' } = emailAddress || {};
	const avatarName = name.split(' ').slice(0, 2).join(' ');
	return (
		<div className={styles.email_body}>
			<div className={styles.body_header}>
				<div className={styles.email_body_avatar}>
					<Avatar personName={avatarName} size="46px" />
				</div>
				<div className={styles.header_details}>
					<div className={styles.header_name}>
						{name}
						{' '}
						(
						<span>{address}</span>
						)
					</div>
					<div className={styles.header_to}>
						To:
						{' '}
						{(toRecipients || []).map((recipient) => {
							const { emailAddress: mail = {} } = recipient || {};
							const { name : recipient_name = '', address: email = '' } = mail || {};
							return (
								<Tooltip content={email} interactive placement="top">
									<div className={styles.name}>
										{recipient_name}
										{(toRecipients || []).length === 1 ? '' : ','}
									</div>
								</Tooltip>
							);
						})}
					</div>
					{!isEmpty(ccRecipients || []) && (
						<div className={styles.header_cc}>
							CC:
							{' '}
							{(ccRecipients || []).map((item) => {
								const { emailAddress: ccAddress = {} } = item || {};
								const { address: ccMail = '' } = ccAddress || {};
								return (
								// <Tooltip content={ccMail} interactive placement="top">
									<div className={styles.name}>
										{ccMail}
										,
									</div>
								// </Tooltip>
								);
							})}

						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Emailbody;
