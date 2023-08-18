import { Placeholder, Avatar } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import getUserNameFromEmail from '../../../../../helpers/getUserNameFromEmail';

import styles from './styles.module.css';

function RenderLoader() {
	return (
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
}

function EmailBodyStructure({
	sender = {},
	recipientData = [],
	ccData = [],
	bccData = [],
	loading = false,
}) {
	const { emailAddress = {} } = sender || {};
	const { name = '', address = '' } = emailAddress || {};

	const { shortName, userName } = getUserNameFromEmail({ query: name });

	const RECIPIENT_MAPPING = [
		{ label: 'To', value: recipientData },
		{ label: 'Cc', value: ccData },
		{ label: 'Bcc', value: bccData },
	];

	const filterRecipientData = RECIPIENT_MAPPING.filter((itm) => !isEmpty(itm.value));

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
						personName={shortName}
						size="46px"
					/>
				</div>

				<div className={styles.header_details}>
					<div className={styles.header_name}>
						{userName}
						<span>
							(
							{address}
							)
						</span>
					</div>

					{filterRecipientData.map(
						(itm) => (
							<div
								className={styles.header_to_cc}
								key={itm.label}
							>
								{itm.label}
								:
								<div className={styles.name_div}>
									{itm.value.join(', ')}
								</div>
							</div>
						),
					)}
				</div>
			</div>
		</div>
	);
}

export default EmailBodyStructure;
