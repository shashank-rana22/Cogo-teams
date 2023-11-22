import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import getDownloadFiles from '../../../utils/getDownloadFiles';
import { formatFileAttributes } from '../../../utils/getFileAttributes';
import ViewAttachmentsModal from '../../ViewAttachmentsModal';

import styles from './styles.module.css';

function MailAttachments({ mediaUrls = [], isMobile = false }) {
	const [activeAttachmentData, setActiveAttachmentData] = useState({});

	const formattedFiles = formatFileAttributes({ uploadedFiles: mediaUrls });

	if (isEmpty(mediaUrls)) {
		return null;
	}

	return (
		<div className={styles.container}>
			{(formattedFiles || []).map(
				(file = {}) => (
					<div className={styles.preview_wrapper} key={file?.fileUrl}>
						{file?.fileIcon || null}
						<div
							role="presentation"
							className={styles.name}
							onClick={() => setActiveAttachmentData(file)}
						>
							<div className={styles.file_name}>
								{file?.fileName || ''}
							</div>
							.
							<div>
								{file?.fileExtension || ''}
							</div>
						</div>

						<IcMDownload
							className={styles.download_icon}
							onClick={() => getDownloadFiles({ imgUrl: file?.fileUrl })}
						/>
					</div>
				),
			)}

			<ViewAttachmentsModal
				activeAttachmentData={activeAttachmentData}
				setActiveAttachmentData={setActiveAttachmentData}
				urlType="urlBased"
				handleDownload={getDownloadFiles}
				isMobile={isMobile}
			/>
		</div>
	);
}

export default MailAttachments;
