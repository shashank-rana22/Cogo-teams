import { Placeholder, Avatar, Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Emailbody({
	sender = {},
	recipientData = [],
	ccData = [],
	emptyCcRecipient = false,
	loading = false,
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
						<div className={styles.header_to_cc}>
							To:
							<Tooltip content={recipientData} interactive placement="top">
								<div className={styles.name_div}>
									{(recipientData || []).map((item) => (
										<div className={styles.name}>
											{item}
										</div>
									))}
								</div>
							</Tooltip>
						</div>
						{!emptyCcRecipient && (
							<div className={styles.header_to_cc}>
								CC:
								{(ccData || []).map((item) => (
									<div className={styles.name}>{item}</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Emailbody;
