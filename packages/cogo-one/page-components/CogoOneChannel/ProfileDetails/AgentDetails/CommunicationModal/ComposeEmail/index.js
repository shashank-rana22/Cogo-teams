import { Toast, Modal, Button, RTE, Input } from '@cogoport/components';
import { IcMCross, IcMAttach } from '@cogoport/icons-react';
import { useState, useRef } from 'react';

import CustomFileUploader from '../../../../../../common/CustomFileUploader';
import { TOOLBARCONFIG } from '../../../../../../constants';
import getFormatedEmailBody from '../../../../../../helpers/getFormatedEmailBody';
import getFileAttributes from '../../../../../../utils/getFileAttributes';
import hideDetails from '../../../../../../utils/hideDetails';

import styles from './styles.module.css';

function ComposeEmail({
	closeModal = () => {},
	userData = {},
	sendQuickCommuncation = () => {},
	loading,
}) {
	const [attachments, setAttachments] = useState([]);
	const [emailState, setEmailState] = useState({
		subject : '',
		body    : '',
	});
	const [uploading, setUploading] = useState(false);
	const uploaderRef = useRef(null);
	const handleSend = () => {
		const isEmptyMail = getFormatedEmailBody({ emailState });
		if (isEmptyMail || !emailState?.subject) {
			Toast.error('Both Subject and Body are Requied');
		} else {
			sendQuickCommuncation({
				template_name         : 'send_email_template',
				otherChannelRecipient : userData?.email,
				variables             : { ...emailState },
				type                  : 'email',
				attachment_urls       : attachments || [],
			});
		}
	};
	const handleProgress = (val) => {
		setUploading(val);
	};

	const decode = (data = '') => {
		const val = decodeURI(data).split('/');
		const fileName = val[val.length - 1];
		const { uploadedFileName, fileIcon } = getFileAttributes({ fileName, finalUrl: data });
		return { uploadedFileName, fileIcon };
	};

	const handleDelete = (url) => {
		const filteredAttachments = attachments.filter((data) => data !== url);
		setAttachments(filteredAttachments);
		uploaderRef?.current?.externalHandleDelete(filteredAttachments);
	};

	return (
		<>
			<Modal.Body className={styles.modal_body}>
				<Input
					value={hideDetails({ data: userData?.email, type: 'mail' })}
					disabled
					size="md"
					className={styles.styled_input}
				/>
				<Input
					value={emailState?.subject}
					onChange={(val) => setEmailState((p) => ({ ...p, subject: val }))}
					size="md"
					placeholder="Enter your Subject here..."
					className={styles.styled_input}
				/>
				<div className={styles.rte_container}>
					<div className={styles.file_uploader_div}>
						<CustomFileUploader
							disabled={uploading}
							handleProgress={handleProgress}
							className="file_uploader"
							accept=".png, .pdf, .jpg, .jpeg, .doc, .docx, .csv, .svg, .gif, .mp4, .xlsx"
							multiple
							uploadIcon={(
								<IcMAttach
									className={styles.upload_icon}
									fill="#000000"
									style={{
										cursor: uploading
											? 'not-allowed'
											: 'pointer',
									}}
								/>
							)}
							onChange={(val) => {
								setAttachments(val);
							}}
							showProgress={false}
							ref={uploaderRef}
						/>
					</div>
					<RTE
						value={emailState?.body}
						onChange={(val) => setEmailState((p) => ({ ...p, body: val }))}
						toolbarConfig={TOOLBARCONFIG}
						className={styles.styled_editor}
					/>

					<div className={styles.attachments_scroll}>
						<div className={styles.uploading}>{uploading && 'Uploading...'}</div>
						{(attachments || []).map((eachAttachement) => {
							const { fileIcon, uploadedFileName } = decode(eachAttachement);
							return (
								<div className={styles.uploaded_files}>
									<div className={styles.uploaded_files_content}>
										{fileIcon}
										<div className={styles.content_div}>
											{uploadedFileName}
										</div>
									</div>
									<IcMCross
										className={styles.cross_svg}
										onClick={() => handleDelete(eachAttachement)}
									/>
								</div>
							);
						})}
					</div>

				</div>
			</Modal.Body>
			<Modal.Footer className={styles.footer_shadow}>
				<div className={styles.footer_buttons}>
					<Button size="md" themeType="tertiary" onClick={closeModal}>
						cancel
					</Button>
					<Button
						size="md"
						themeType="accent"
						onClick={handleSend}
						loading={loading}
					>
						Send
					</Button>
				</div>

			</Modal.Footer>

		</>
	);
}

export default ComposeEmail;
