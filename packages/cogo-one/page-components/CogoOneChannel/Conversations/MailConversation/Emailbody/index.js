import { Placeholder, Avatar, Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Emailbody({
	sender = {},
	recipientData,
	ccData,
	emptyCcRecipient,
	loading,
}) {
	const { emailAddress = {} } = sender || {};
	const { name = '', address = '' } = emailAddress || {};
	const avatarName = name.split(' ').slice(0, 2).join(' ');

	const renderLoader = () => (
		<div className={styles.body_header}>
			<div className={styles.email_body_avatar}>
				<Placeholder type="circle" radius="40px" />
			</div>
			<div className={styles.header_details}>
				<div className={styles.header_name}>
					<Placeholder width="250px" height="14px" />
				</div>
				<div className={styles.header_to}>
					<Placeholder width="250px" height="14px" margin="4px 0px 0px 0px" />
				</div>
			</div>
		</div>
	);
	return (
		<div className={styles.email_body}>
			{loading ? renderLoader() : (
				<div className={styles.body_header}>
					<div>
						<Avatar personName={avatarName} size="46px" />
					</div>
					<div className={styles.header_details}>
						<div className={styles.header_name}>
							{name}
							<span>
								(
								{address}
								)
							</span>
						</div>
						<div className={styles.header_to}>
							To:
							{' '}
							<Tooltip content={recipientData} interactive placement="top">
								<div className={styles.name}>
									{recipientData}
									{recipientData.length === 1 ? '' : ','}
								</div>
							</Tooltip>
							{/* {(toRecipients || []).map((recipient) => {
								const { emailAddress: mail = {} } = recipient || {};
								const { name : recipient_name = '', address: email = '' } = mail || {};
								console.log('recipient_name:', recipient_name);
								return (
									<Tooltip content={email} interactive placement="top">
										<div className={styles.name}>
											{email}
											{(toRecipients || []).length === 1 ? '' : ','}
										</div>
									</Tooltip>
								);
							})} */}
						</div>
						{!emptyCcRecipient && (
							<div className={styles.header_cc}>
								CC:
								{' '}
								<div className={styles.name}>
									{ccData}
									{recipientData.length === 1 ? '' : ','}
								</div>
								{/* {(ccRecipients || []).map((item) => {
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
								})} */}

							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Emailbody;
