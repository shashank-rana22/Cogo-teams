import { Placeholder, Avatar, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const COUNTRY_CODE_END = 2;

function RenderLoader() {
	return (
		<div className={styles.body_header}>
			<div className={styles.email_body_avatar}>
				<Placeholder
					type="circle"
					radius="40px"
				/>
			</div>
			<div className={styles.header_details}>
				<div className={styles.header_name}>
					<Placeholder
						width="250px"
						height="14px"
					/>
				</div>
				<div className={styles.header_to}>
					<Placeholder
						width="250px"
						height="14px"
						margin="4px 0px 0px 0px"
					/>
				</div>
			</div>
		</div>
	);
}

function EmailBodyStructure({
	sender = {},
	recipientData = [],
	ccData = [],
	emptyCcRecipient = false,
	loading = false,
}) {
	const { emailAddress = {} } = sender || {};
	const { name = '', address = '' } = emailAddress || {};

	const avatarName = name.split(' ').slice(GLOBAL_CONSTANTS.zeroth_index, COUNTRY_CODE_END).join(' ');

	if (loading) {
		return (
			<div className={styles.email_body}>
				<RenderLoader />
			</div>
		);
	}

	return (
		<div className={styles.email_body}>
			<div className={styles.body_header}>
				<div>
					<Avatar
						personName={avatarName}
						size="46px"
					/>
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
						<Tooltip
							content={recipientData}
							interactive
							placement="top"
						>
							<div className={styles.name_div}>
								{(recipientData || []).map((item) => (
									<div className={styles.name} key={item}>
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
								<div className={styles.name} key={item}>
									{item}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default EmailBodyStructure;
