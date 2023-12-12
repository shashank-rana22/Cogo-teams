import { IcMEdit } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function MessageTooltip({
	eachMessage = {},
	activeId = '',
	isMobile = false,
	setDraftUploadedFiles = () => {},
	setDraftMessages = () => {},
	setEditMessage = () => {},
}) {
	const handleEdit = () => {
		setDraftMessages(
			(prev) => ({
				...prev,
				[activeId]: eachMessage?.response?.message || '',
			}),
		);
		setDraftUploadedFiles(
			(prev) => ({
				...prev,
				[activeId]: eachMessage?.response?.media_url || [],
			}),
		);
		setEditMessage(true);
	};

	return (
		<div className={styles.popover_content}>
			{isMobile
				? null
				: (
					<IcMEdit
						className={styles.edit_icon}
						onClick={handleEdit}
					/>
				)}
		</div>
	);
}

export default MessageTooltip;
