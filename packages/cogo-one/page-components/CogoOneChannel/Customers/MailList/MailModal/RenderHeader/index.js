import { cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSend, IcMAttach, IcMArrowBack, IcMMinus } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import CustomFileUploader from '../../../../../../common/CustomFileUploader';
import { HEADER_MAPPING } from '../../../../../../constants/mailConstants';

import styles from './styles.module.css';

const DISABLE_ATTACHMENTS_FOR = ['forward'];

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
	setEmailTemplate = () => {},
	isTemplateView = false,
	setMinimizeModal = () => {},
	handleSaveDraft = () => {},
}) {
	return (
		<div className={styles.mail_modal_header}>
			<div className={styles.header}>
				<div className={styles.left_container}>
					<Button
						size="md"
						themeType="link"
						onClick={handleClose}
					>
						Cancel
					</Button>
				</div>

				<div
					className={styles.title}
					role="presentation"
				>
					{HEADER_MAPPING[buttonType] || 'New Message'}
				</div>

				<div className={styles.right_container}>
					<div className={styles.minimize_button} title="minimize">
						<IcMMinus onClick={() => {
							handleSaveDraft({ isMinimize: true });
							setMinimizeModal(true);
						}}
						/>
					</div>
				</div>
			</div>

			<div className={styles.top_left_section}>
				{isTemplateView ? (
					<div className={styles.back_icon}>
						<IcMArrowBack
							onClick={() => setEmailTemplate(() => ({
								emailData      : {},
								isTemplateView : false,
							}))}
							width={20}
							height={20}
							cursor="pointer"
						/>
						Back
					</div>
				) : null}
			</div>

			{isTemplateView ? null : (
				<div className={styles.right_top_header}>
					<div className={styles.template_button}>
						<Button
							size="sm"
							themeType="accent"
							disabled={replyLoading}
							onClick={() => setEmailTemplate(
								(prev) => ({
									...prev,
									isTemplateView: true,
								}),
							)}
						>
							Add Template
						</Button>
					</div>

					{['reply', 'reply_all', 'forward'].includes(buttonType) && (
						<Button
							size="sm"
							themeType="secondary"
							disabled={replyLoading}
							onClick={handleSaveDraft}
						>
							Save as draft
						</Button>
					)}

					{DISABLE_ATTACHMENTS_FOR.includes(buttonType) ? null : (
						<div className={styles.file_uploader_div} title="attachment">
							<CustomFileUploader
								disabled={uploading || replyLoading}
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
					)}

					<div
						className={cl`${replyLoading ? styles.disabled_button : ''} ${styles.send_icon}`}
						title="send"
					>
						<IcMSend onClick={handleSend} />
					</div>
				</div>
			)}
		</div>
	);
}

export default RenderHeader;
