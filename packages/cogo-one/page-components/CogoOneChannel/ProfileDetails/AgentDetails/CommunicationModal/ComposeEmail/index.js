import { Toast, Modal, Button, RTE, Input, Popover } from '@cogoport/components';
import { IcMCross, IcMAttach } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
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
	const [openPopover, setPopover] = useState(false);
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

	function ToolTipFunc() {
		const attachmentDiv = (singleUploadData) => (
			<div className={styles.uploaded_files}>
				<div className={styles.uploaded_files_content}>
					{decode(singleUploadData).fileIcon}
					{decode(singleUploadData)?.uploadedFileName}
				</div>
				<IcMCross
					style={{ cursor: 'pointer' }}
					onClick={(e) => {
						e.stopPropagation();
						handleDelete(singleUploadData);
					}}
				/>
			</div>
		);
		if (isEmpty(attachments)) {
			return null;
		}
		const showMore = (attachments || []).length > 1;
		const lessAttachments = (attachments || []).slice(0, 1);
		const moreAttachments = (attachments || []).slice(1);

		const moreAttachmentContent = (
			<div className={styles.tool_tip_div}>
				{(moreAttachments || []).map((eachData) => (
					attachmentDiv(eachData)
				))}
			</div>
		);
		return (
			<div className={styles.flex}>
				{(lessAttachments || []).map((eachData) => (
					attachmentDiv(eachData)
				))}
				{showMore && (
					<Popover
						theme="light"
						render={moreAttachmentContent}
						placement="top"
						visible={openPopover}
						onClickOutside={() => setPopover(false)}
					>
						<div
							className={styles.show_more_tags}
							role="presentation"
							onClick={() => setPopover((p) => !p)}
						>
							+
							{moreAttachments?.length}
						</div>
					</Popover>
				)}
			</div>
		);
	}
	return (
		<>
			<Modal.Body>
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
						<ToolTipFunc />

					</div>

				</div>
			</Modal.Body>
			<Modal.Footer>
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
