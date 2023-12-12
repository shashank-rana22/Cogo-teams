import { Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React, { useState } from 'react';

import MessageBody from '../../../../../../common/MessageBody';
import { MessageTooltip, EditMessage } from '../../../../../../common/MessageOptions';

import styles from './styles.module.css';

function SentComponent({
	activeId = '',
	eachMessage = {},
	isMobile = false,
	activeTab = {},
}) {
	const [editMessage, setEditMessage] = useState(false);
	const [draftMessages, setDraftMessages] = useState({});
	const [draftUploadedFiles, setDraftUploadedFiles] = useState({});

	const {
		created_at = {},
		response = {},
		is_edited = false,
	} = eachMessage || {};

	const date = created_at
		? formatDate({
			date       : new Date(created_at),
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
			formatType : 'dateTime',
			separator  : ' ',
		}) : null;

	return (
		<div className={styles.container}>
			<div className={styles.details}>
				{editMessage ? (
					<div className={styles.edit_message_footer}>
						<EditMessage
							eachMessage={eachMessage}
							setEditMessage={setEditMessage}
							activeTab={activeTab}
							isMobile={isMobile}
							activeId={activeId}
							draftMessages={draftMessages}
							setDraftMessages={setDraftMessages}
							draftUploadedFiles={draftUploadedFiles}
							setDraftUploadedFiles={setDraftUploadedFiles}
						/>
					</div>
				) : (
					<div className={styles.message_card}>
						{isMobile ? (
							<MessageBody
								response={response}
								message_type={response?.message_type || 'text'}
							/>
						) : (
							<Popover
								placement="top-end"
								trigger="mouseenter"
								interactive
								delay={[300, null]}
								content={(
									<MessageTooltip
										activeId={activeId}
										eachMessage={eachMessage}
										activeTab={activeTab}
										isMobile={isMobile}
										setDraftUploadedFiles={setDraftUploadedFiles}
										setDraftMessages={setDraftMessages}
										setEditMessage={setEditMessage}
									/>
								)}
								className={styles.popover_styles}
							>
								<MessageBody
									response={response}
									message_type={response?.message_type || 'text'}
								/>
							</Popover>
						)}
					</div>
				)}
				<div className={styles.sent_date}>
					{date}

					<span>
						{is_edited ? ' (Edited)' : ''}
					</span>
				</div>
			</div>

		</div>
	);
}

export default SentComponent;
