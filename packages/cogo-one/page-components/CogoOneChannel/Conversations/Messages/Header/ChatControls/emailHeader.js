import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function EmailHeader({
	formattedData = {},
	isMobile = false,
	setActiveTab = () => {},
}) {
	const {
		last_message_document = {},
	} = formattedData || {};

	const { response = {} } = last_message_document || {};
	const { subject = '' } = response || {};

	if (isMobile) {
		return (
			<div
				role="presentation"
				className={styles.mobil_email_header}
				onClick={() => {
					if (isMobile) {
						setActiveTab(
							(prev) => ({
								...prev,
								showSidebar   : true,
								expandSideBar : true,
							}),
						);
					}
				}}
			>
				Sub:
				{' '}
				{subject || ''}
			</div>
		);
	}

	return (
		<div className={styles.email_header}>
			<Tooltip
				placement="bottom"
				content={subject || ''}
				className={styles.tooltip_container}
				delay={[300, 0]}
			>
				Sub:
				{' '}
				{subject || ''}
			</Tooltip>
		</div>
	);
}

export default EmailHeader;
