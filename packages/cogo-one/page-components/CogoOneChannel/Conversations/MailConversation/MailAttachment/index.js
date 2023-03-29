import { Placeholder, Modal } from '@cogoport/components';
import { IcMDocument, IcMDownload } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetMailAttachment from '../../../../../hooks/useGetMailAttachment';
import saveByteArray from '../../../../../utils/mailAttachment';
import base64ToArrayBuffer from '../../../../../utils/mailAttachmentToBytes';

import styles from './styles.module.css';

const renderContent = (showPreview) => `data:${showPreview?.contentType};base64,${showPreview?.contentBytes}`;

function MailAttachments({ activeMail, emailAddress }) {
	const { attachmentData = {}, attachmentLoading } = useGetMailAttachment({ activeMail, emailAddress });
	const allAttachements = attachmentData?.value || [];
	const [showPreview, setShowPreview] = useState(null);
	const externalAttachements = allAttachements.filter((att) => !att.isInline);

	const handleDownload = (data) => {
		const sampleArr = base64ToArrayBuffer(data?.contentBytes);
		saveByteArray(data, sampleArr);
	};

	const renderTitle = (item) => (
		<div className={styles.title}>
			<div>{decodeURI(item?.name)}</div>
			<IcMDownload onClick={() => handleDownload(item)} className={styles.download_icon} />
		</div>
	);

	const renderFileName = (name) => {
		const lastDotIndex = name.lastIndexOf('.');
		const filename = name.substring(0, lastDotIndex);
		const extension = name.substring(lastDotIndex + 1);
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
	};

	return (
		<div className={styles.container}>
			{attachmentLoading ? (
				<div className={styles.content}>
					<Placeholder width="120px" height="18px" />
				</div>
			) : (
				<div className={styles.content}>
					{externalAttachements.map((item) => (
						<div className={styles.preview_wrapper} key={item.id}>
							<IcMDocument />
							<div
								role="button"
								tabIndex={0}
								className={styles.name}
								onClick={() => setShowPreview(item)}
							>
								{renderFileName(decodeURI(item?.name))}
							</div>
							<IcMDownload
								onClick={() => handleDownload(item)}
								className={styles.download_icon}
							/>
						</div>
					))}
				</div>

			)}
			{showPreview && (
				<Modal
					show={showPreview}
					onClose={() => setShowPreview(null)}
					size="fullscreen"
					placement="fullscreen"
					onOuterClick={() => setShowPreview(null)}
					showCloseIcon
					className={styles.styled_ui_modal_dialog}
				>
					<Modal.Header title={renderTitle(showPreview)} />
					<Modal.Body>
						<object
							className={styles.media_styles}
							aria-label="Doc Preview"
							data={renderContent(showPreview)}
						/>
					</Modal.Body>

				</Modal>
			)}
		</div>
	);
}

export default MailAttachments;
