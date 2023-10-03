import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { getFileAttributes } from '../../../../../../../utils/getFileAttributes';

import styles from './styles.module.css';

const ATTACHMENTS_TO_BE_SHOWN = 2;

function DisplayAttachments({
	mediaUrls = [],
	setActiveAttachmentData = () => {},
}) {
	const attachmentsToShow = (mediaUrls || []).slice(
		GLOBAL_CONSTANTS.zeroth_index,
		ATTACHMENTS_TO_BE_SHOWN,
	);

	const extraAttachments = (mediaUrls || []).slice(ATTACHMENTS_TO_BE_SHOWN);

	return (
		<div className={styles.container}>
			<div className={styles.attachments_container}>
				{(attachmentsToShow || []).map((attachment) => {
					const fileData = getFileAttributes({ finalUrl: attachment });
					const { fileName = '', fileIcon = null } = fileData || {};

					return (
						<div
							className={styles.attachment_styles}
							key={attachment}
							role="presentation"
							onClick={(e) => {
								e.stopPropagation();
								setActiveAttachmentData(fileData);
							}}
						>
							{fileIcon}
							<div className={styles.file_name_styles}>{fileName}</div>
						</div>
					);
				})}
			</div>

			{extraAttachments.length ? (
				<div className={styles.extra_files}>
					{`+${extraAttachments.length} more`}
				</div>
			) : null}
		</div>
	);
}

export default DisplayAttachments;
