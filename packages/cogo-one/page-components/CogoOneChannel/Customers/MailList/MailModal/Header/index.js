import { cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSend, IcMAttach } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import CustomFileUploader from '../../../../../../common/CustomFileUploader';

import styles from './styles.module.css';

const HEADER_MAPPING = {
	send_mail : 'New Mail',
	forward   : 'Forward Mail',
	reply_all : 'Reply All',
	reply     : 'Reply',
};

function RenderUploadIcon({ uploading = false }) {
	return (
		<div className={styles.upload_icon_container}>
			{uploading ? (
				<Image
					src={GLOBAL_CONSTANTS.image_url.colored_loading}
					width={30}
					height={30}
					alt="uploading"
				/>
			) : <IcMAttach className={styles.upload_icon} />}
		</div>
	);
}

function RenderHeader({
	replyLoading = false,
	handleSend = () => {},
	uploading = false,
	setUploading = () => {},
	setAttachments = () => {},
	handleClose = () => {},
	uploaderRef = {},
	attachments = [],
	buttonType = '',
}) {
	return (
		<>
			<Button
				size="md"
				themeType="link"
				onClick={handleClose}
			>
				Cancel
			</Button>

			<div className={styles.title}>
				{HEADER_MAPPING?.[buttonType] || 'New Message'}
			</div>

			<div className={styles.right_top_header}>
				<div className={styles.file_uploader_div}>
					<CustomFileUploader
						disabled={uploading}
						handleProgress={setUploading}
						className="file_uploader"
						accept=".png, .pdf, .jpg, .jpeg, .doc, .docx, .csv, .svg, .gif, .mp4, .xlsx"
						multiple
						uploadIcon={<RenderUploadIcon uploading={uploading} />}
						value={attachments}
						onChange={setAttachments}
						showProgress={false}
						ref={uploaderRef}
					/>
				</div>

				<div
					className={cl`${replyLoading ? styles.disabled_button : ''} ${styles.send_icon}`}
				>
					<IcMSend onClick={handleSend} />
				</div>
			</div>
		</>
	);
}

export default RenderHeader;
