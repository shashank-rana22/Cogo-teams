import { IcMDocument, IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { formatFileAttributes } from '../../../utils/getFileAttributes';
import ViewAttachmentsModal from '../../ViewAttachmentsModal';

import styles from './styles.module.css';

function MailAttachments({ mediaUrls = [] }) {
	const [activeAttachmentData, setActiveAttachmentData] = useState({});

	const formatedFiles = formatFileAttributes({ uploadedFiles: mediaUrls });

	if (isEmpty(mediaUrls)) {
		return null;
	}

	return (
		<div className={styles.container}>
			{formatedFiles.map((file) => (
				<div className={styles.preview_wrapper} key={file.fileUrl}>
					<IcMDocument />
					<div
						role="presentation"
						className={styles.name}
						onClick={() => setActiveAttachmentData(file)}
					>
						<div className={styles.file_name}>
							{file.fileName}
						</div>
						.
						<div>
							{file.fileExtension}
						</div>
					</div>

					<IcMDownload
						className={styles.download_icon}
					/>
				</div>
			))}
			<ViewAttachmentsModal
				activeAttachmentData={activeAttachmentData}
				setActiveAttachmentData={setActiveAttachmentData}
				urlType="urlBased"
			/>
		</div>
	);
}

export default MailAttachments;
