import { cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSend, IcMAttach, IcMArrowBack, IcMMinus, IcMCross } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

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
	sendLoading = false,
	activeMailAddress = '',
	hideFromMail = false,
	userActiveMails = [],
	isMobile = false,
}) {
	return (
		<div className={styles.mail_modal_header}>
			<div className={styles.header}>
				<div
					className={styles.title}
					role="presentation"
				>
					{HEADER_MAPPING[buttonType] || 'New Message'}
				</div>

				<div className={styles.right_container}>

					{isEmpty(userActiveMails)
						? null
						: (
							<div
								className={cl`${styles.minimize_button} 
									${(replyLoading || sendLoading) ? styles.disable_icon : ''}`}
								title="minimize"
							>
								<IcMMinus onClick={() => {
									if (replyLoading || sendLoading) {
										return;
									}
									handleSaveDraft({ isMinimize: true });
									setMinimizeModal(true);
								}}
								/>
							</div>
						)}
					<div
						className={cl`${styles.minimize_button} 
						${(replyLoading || sendLoading) ? styles.disable_icon : ''}`}
						title="Cancel"
					>
						<IcMCross
							onClick={() => {
								if (replyLoading || sendLoading) {
									return;
								}
								handleClose();
							}}
						/>
					</div>
				</div>
			</div>

			{isEmpty(userActiveMails)
				? null
				: (
					<>
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
							<div
								className={styles.right_top_header}
								style={{ justifyContent: hideFromMail ? 'space-between' : 'flex-end' }}
							>
								{hideFromMail ? (
									<div className={styles.from_address}>
										<span>From: </span>
										{activeMailAddress}
									</div>
								) : null}

								<div className={styles.actions_container}>
									{isMobile ? null : (
										<div className={styles.template_button}>
											<Button
												size="sm"
												themeType="accent"
												disabled={replyLoading || sendLoading}
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
									)}

									<Button
										size="sm"
										themeType="secondary"
										disabled={replyLoading || sendLoading}
										onClick={handleSaveDraft}
									>
										Save as draft
									</Button>

									{DISABLE_ATTACHMENTS_FOR.includes(buttonType) ? null : (
										<div className={styles.file_uploader_div} title="attachment">
											<CustomFileUploader
												disabled={uploading || replyLoading || sendLoading}
												handleProgress={setUploading}
												className="file_uploader"
												accept=".png,.pdf,.jpg,.jpeg,.doc,.docx,.csv,.svg,.gif,.mp4,.xlsx"
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
										className={cl`
								${(replyLoading || sendLoading) ? styles.disabled_button : ''} 
								${styles.send_icon}`}
										title={`mail will be sent from ${activeMailAddress}`}
									>
										<IcMSend onClick={handleSend} />
									</div>
								</div>
							</div>
						)}
					</>
				)}
		</div>
	);
}

export default RenderHeader;
