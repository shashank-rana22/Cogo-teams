import { Toast, Modal, RTE, Input } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useState, useRef } from 'react';

import MailRecipientType from '../../../../../common/MailRecipientType';
import { TOOLBARCONFIG } from '../../../../../constants';
import { decode, buttonOptions } from '../../../../../constants/MAIL_CONSTANT';
import getFormatedEmailBody from '../../../../../helpers/getFormatedEmailBody';
import mailFunction from '../../../../../utils/mailFunctions';

import RenderHeader from './Header';
import styles from './styles.module.css';

function MailModal({
	mailProps,
	createMail = () => {},
	createMailLoading = false,
	userId = '',
	attachments = [],
	setAttachments = () => {},
	activeMail = {},
	replyMailApi = () => {},
	replyLoading,
}) {
	const {
		showMailModal,
		buttonType,
		emailAddress,
		recipientArray,
		emailState,
		bccArray,
		setEmailState,
	} = mailProps;

	const [showToControl, setShowToControl] = useState();
	const [showCcControl, setShowCcControl] = useState();
	const [type, setType] = useState('');
	const [recipientValue, setRecipientValue] = useState('');
	const [ccBccValue, setCcBccValue] = useState('');
	const [errorValue, setErrorValue] = useState('');
	const [uploading, setUploading] = useState(false);

	const checkType = buttonOptions.includes(buttonType);

	const uploaderRef = useRef(null);

	const {
		handleKeyPress = () => {},
		handleEdit = () => {},
		handleChange = () => {},
		handleDelete = () => {},
		handleError = () => {},
		handleClose = () => {},
		handleAttachmentDelete = () => {},
	} = mailFunction({
		...mailProps,
		type,
		setErrorValue,
		recipientValue,
		ccBccValue,
		setRecipientValue,
		setType,
		setShowToControl,
		setShowCcControl,
		setCcBccValue,
		setAttachments,
		attachments,
		uploaderRef,
	});

	const handleSend = () => {
		let payload;
		const isEmptyMail = getFormatedEmailBody({ emailState });
		if (isEmptyMail || !emailState?.subject) {
			Toast.error('Both Subject and Body are Requied');
			return;
		}
		if (checkType) {
			payload = {
				sender       : emailAddress,
				toUserEmail  : recipientArray,
				ccrecipients : bccArray,
				subject      : emailState?.subject,
				content      : emailState?.body,
				attachments,
				userId,
				msgId        : activeMail?.id,

			};
			replyMailApi(payload);
		} else {
			payload = {
				attachments,
				ccrecipients : bccArray,
				content      : emailState?.body,
				sender       : emailAddress,
				subject      : emailState?.subject,
				toUserEmail  : recipientArray,
				userId,
			};
			createMail(payload);
		}
	};

	return (
		<Modal
			show={showMailModal}
			onClose={handleClose}
			onOuterClick={handleClose}
			size="lg"
			className={styles.styled_ui_modal_dialog}
			placement="top"
			scroll
		>
			<Modal.Header title={(
				<RenderHeader
					createLoading={createMailLoading}
					replyLoading={replyLoading}
					handleSend={handleSend}
					setUploading={setUploading}
					uploading={uploading}
					setAttachments={setAttachments}
					handleClose={handleClose}
					uploaderRef={uploaderRef}
				/>
			)}
			/>
			<Modal.Body>
				<div className={styles.type_to}>
					<div className={styles.sub_text}>
						To:
					</div>
					<MailRecipientType
						arrayType={recipientArray}
						handleDelete={handleDelete}
						showControl={showToControl}
						type="recipient"
						value={recipientValue}
						errorValue={errorValue}
						handleChange={handleChange}
						handleKeyPress={handleKeyPress}
						handleError={handleError}
						handleEdit={handleEdit}
						inputType="recipient"
					/>
				</div>
				<div className={styles.type_to}>
					<div className={styles.sub_text}>
						Cc/Bcc, From:
					</div>
					<MailRecipientType
						arrayType={bccArray}
						handleDelete={handleDelete}
						showControl={showCcControl}
						type="cc_bcc"
						value={ccBccValue}
						errorValue={errorValue}
						handleChange={handleChange}
						handleKeyPress={handleKeyPress}
						handleError={handleError}
						handleEdit={handleEdit}
						inputType="cc_bcc"
					/>
				</div>
				<div className={styles.type_to}>
					<div className={styles.sub_text}>
						Sub:
						{' '}
					</div>
					<Input
						value={emailState?.subject}
						onChange={(val) => setEmailState((p) => ({ ...p, subject: val }))}
						size="xs"
						placeholder="Enter your Subject"
						className={styles.styled_input}
					/>
				</div>

				<div className={styles.rte_container}>
					<RTE
						value={emailState?.body}
						onChange={(val) => setEmailState((p) => ({ ...p, body: val }))}
						toolbarConfig={TOOLBARCONFIG}
						className={styles.styled_editor}
					/>

					<div className={styles.attachments_scroll}>
						{uploading && <div className={styles.uploading}>{uploading && 'Uploading...'}</div>}
						{(attachments || []).map((data) => {
							const { fileIcon = {}, uploadedFileName = '' } = decode(data) || {};
							return (
								<div className={styles.uploaded_files} key={uploadedFileName}>
									<div className={styles.uploaded_files_content}>
										{fileIcon}
										<div className={styles.content_div}>
											{uploadedFileName}
										</div>
									</div>
									<IcMCross
										className={styles.cross_svg}
										onClick={(e) => {
											e.stopPropagation();
											handleAttachmentDelete(data);
										}}
									/>
								</div>
							);
						})}
					</div>

				</div>
			</Modal.Body>
		</Modal>
	);
}
export default MailModal;
