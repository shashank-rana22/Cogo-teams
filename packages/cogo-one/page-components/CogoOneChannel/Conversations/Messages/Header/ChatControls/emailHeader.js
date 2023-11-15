import { Tooltip } from '@cogoport/components';
import { IcMArrowLeft } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmailHeader({ formattedData = {}, isMobile = false, setActiveTab = () => {} }) {
	const {
		last_message_document = {},
	} = formattedData || {};

	const { response = {} } = last_message_document || {};
	const { subject = '' } = response || {};

	return (
		<div className={styles.email_header}>
			{isMobile ? (
				<IcMArrowLeft
					className={styles.arrow_back}
					onClick={() => setActiveTab(
						(prev) => ({
							...prev,
							data: {},
						}),
					)}
				/>
			) : null}
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
