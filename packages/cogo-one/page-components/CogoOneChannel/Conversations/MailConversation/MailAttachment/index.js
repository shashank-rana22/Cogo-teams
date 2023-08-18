import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDocument, IcMDownload } from '@cogoport/icons-react';
import { useState } from 'react';

import ViewAttachmentsModal from '../../../../../common/ViewAttachmentsModal';
import saveByteArray from '../../../../../utils/mailAttachment';
import base64ToArrayBuffer from '../../../../../utils/mailAttachmentToBytes';

import styles from './styles.module.css';

const INCREASE_COUNT_BY_ONE = 1;

function RenderFileName({ name = '' }) {
	const lastDotIndex = name.lastIndexOf('.');
	const filename = name.substring(GLOBAL_CONSTANTS.zeroth_index, lastDotIndex);
	const extension = name.substring(lastDotIndex + INCREASE_COUNT_BY_ONE);

	return (
		<>
			<div className={styles.file_name}>
				{filename}
			</div>
			.
			<div>
				{extension}
			</div>
		</>
	);
}

const handleDownload = (data) => {
	const sampleArr = base64ToArrayBuffer(data?.contentBytes);
	saveByteArray(data, sampleArr);
};

function MailAttachments({
	attachmentData = {},
	loading = false,
}) {
	const [activeAttachmentData, setActiveAttachmentData] = useState(null);

	const allAttachements = attachmentData?.value || [];
	const externalAttachements = allAttachements.filter((att) => !att.isInline);

	return (
		<div className={styles.container}>
			{loading ? (
				<div className={styles.content}>
					<Placeholder width="220px" height="18px" />
				</div>
			) : (
				<div className={styles.content}>
					{externalAttachements.map(
						(item) => (
							<div className={styles.preview_wrapper} key={item.id}>
								<IcMDocument />
								<div
									role="presentation"
									className={styles.name}
									onClick={() => setActiveAttachmentData(item)}
								>
									<RenderFileName name={decodeURI(item?.name)} />
								</div>

								<IcMDownload
									onClick={() => handleDownload(item)}
									className={styles.download_icon}
								/>
							</div>
						),
					)}
				</div>
			)}

			{activeAttachmentData && (
				<ViewAttachmentsModal
					handleDownload={handleDownload}
					activeAttachmentData={activeAttachmentData}
					setActiveAttachmentData={setActiveAttachmentData}
				/>
			)}
		</div>
	);
}

export default MailAttachments;
