// import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import {
	IcMSend,
	IcMAttach,
	IcMCross,
	IcMImage,
	IcMPdf,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
// import { useTranslation } from 'next-i18next';
import React from 'react';

import CustomFileUploader from '../../../../../common/CustomFileUploader';
import { MATCH_IMAGE_EXTENSION } from '../../../../../constants';

import styles from './styles.module.css';

// import AwsUploader from '@/temp/form/components/Business/AwsUploader';

// const translationKey = 'common:components_header_tickets_details';

function FooterChat({
	setMessage = () => {},
	message = '',
	handleKeyPress = () => {},
	file,
	setFile = () => {},
	uploading = false,
	setUploading = () => {},
	handleSendComment = () => {},
}) {
	// const { t } = useTranslation(['common']);
	// const uploadIcon = () => <IcMAttach className={styles.no_upload} />;

	const handleChange = (obj) => {
		if (obj?.success) {
			setFile({ ...obj });
			setUploading(false);
		}
	};

	// const handleProgress = (obj) => {
	// 	if (obj?.type === 'progress') {
	// 		setUploading(true);
	// 	}
	// };

	return (
		<>
			{(!isEmpty(file) || uploading) && (
				<div className={styles.file_div}>
					{uploading ? (
						<div className={styles.file_details}>Uploading....</div>
					) : (
						<div className={styles.file_details}>
							<div className={styles.file_icon_holder}>
								{file?.name.match(MATCH_IMAGE_EXTENSION) ? (
									<IcMImage className={styles.image_preview} />
								) : (
									<IcMPdf className={styles.pdf_icon} />
								)}
							</div>
							<div className={styles.file_text}>{file?.name}</div>
							<IcMCross
								className={styles.delete_icon}
								onClick={() => setFile({})}
							/>
						</div>
					)}
				</div>
			)}
			<div className={styles.footer_container}>
				<div className={styles.bot_footer}>
					{!isEmpty(file) || uploading ? (
						<IcMAttach className={styles.no_upload} />
					) : (
						// <AwsUploader
						// 	showProgress={false}
						// 	hideUploadedList
						// 	showIconAlways
						// 	onProgress={handleProgress}
						// 	onChange={handleChange}
						// 	uploadIcon={uploadIcon}
						// 	drag
						// />
						<div className={styles.file_uploader_div}>
							<CustomFileUploader
								disabled={uploading}
								handleProgress={setUploading}
								className="file_uploader"
								accept=".png, .pdf, .jpg, .jpeg, .doc, .docx, .csv, .svg, .gif, .mp4, .xlsx"
								multiple
								uploadIcon={(
									<IcMAttach
										className={styles.upload_icon}
										style={{
											cursor: uploading
												? 'not-allowed'
												: 'pointer',
										}}
									/>
								)}
								// onChange={(val) => {
								// 	setAttachments(val);
								// }}
								onChange={handleChange}
								showProgress
								// ref={uploaderRef}
							/>
						</div>
					)}
					<textarea
						className={styles.chat_input}
						placeholder="Type here ..."
						onChange={(e) => setMessage(e?.target?.value)}
						onKeyPress={(e) => handleKeyPress(e)}
						value={message}
					/>
					<IcMSend
						className={styles.send_icon}
						onClick={handleSendComment}
						cursor="pointer"
						fill="#EE3425"
					/>
				</div>
			</div>
		</>
	);
}

export default FooterChat;
