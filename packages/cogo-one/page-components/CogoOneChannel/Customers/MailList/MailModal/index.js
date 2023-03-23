import { Toast, cl, Modal, RTE, Input } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useState, useRef } from 'react';

import CustomInput from '../../../../../common/EmailCustomTag/index';
import { TOOLBARCONFIG } from '../../../../../constants';
import { decode, buttonOptions } from '../../../../../constants/MAIL_CONSTANT';
import getFormatedEmailBody from '../../../../../helpers/getFormatedEmailBody';
import mailFunction from '../../../../../utils/mailFunctions';

import RenderHeader from './Header';
import styles from './styles.module.css';

function MailModal({
	showMailModal,
	setShowMailModal = () => {},
	createMail = () => {},
	createMailLoading = false,
	userId = '',
	recipientArray = [],
	setBccArray = () => {},
	setRecipientArray = () => {},
	bccArray = [],
	emailState = {},
	setEmailState = () => {},
	buttonType = '',
	attachments = [],
	setAttachments = () => {},
	activeMail = {},
	replyMailApi = () => {},
	replyLoading,
	emailAddress = '',
	// mailValue = '',
	// setMailValue = () => {},
	// setButtonType = () => {},
	// buttonType = '',
}) {
	const [showControl, setShowControl] = useState(false);
	const [type, setType] = useState('');
	const [recipientValue, setRecipientValue] = useState('');
	const [ccBccValue, setCcBccValue] = useState('');
	const [error, setError] = useState(false);
	const [errorValue, setErrorValue] = useState('');
	// const [recipientArray, setRecipientArray] = useState([]);
	// const [bccArray, setBccArray] = useState([]);
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
		type,
		setErrorValue,
		recipientValue,
		ccBccValue,
		setError,
		recipientArray,
		bccArray,
		setRecipientArray,
		setRecipientValue,
		setType,
		setShowControl,
		setBccArray,
		setCcBccValue,
		// checkType,
		setAttachments,
		setEmailState,
		setShowMailModal,
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
				// sender       : 'dineshkumar.s@cogoport.com',
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
				// sender       : 'dineshkumar.s@cogoport.com',
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
						{' '}
					</div>
					<div className={styles.tags_div}>
						{(recipientArray || []).map((data) => (
							<CustomInput
								email={data}
								handleDelete={handleDelete}
								type="recipient"
								// checkType={checkType}
							/>
						))}

						{(showControl && type === 'recipient') && (
							<div className={styles.tag_and_errorcontainer}>
								<div className={styles.tag_container}>
									<input
										size="sm"
										placeholder="Enter recipient"
										type="text"
										value={recipientValue}
										onChange={(e) => handleChange(e)}
										onKeyPress={(e) => handleKeyPress(e)}
										className={cl`${error ? styles.error_input_container : styles.input_container}`}
										id="inputId"
									/>
									<div className={styles.cross_icon}>
										<IcMCross onClick={() => handleError('receipient')} />
									</div>
								</div>
								{(error) && (
									<div className={styles.error_content_container}>
										{errorValue}
									</div>
								)}
							</div>
						)}
						<div
							className={styles.add_icon}
							onClick={() => handleEdit('recipient')}
							role="presentation"
						>
							+
						</div>
					</div>
				</div>
				<div className={styles.type_to}>
					<div className={styles.sub_text}>
						Cc/Bcc, From:
						{' '}
					</div>
					<div className={styles.tags_div}>
						{(bccArray || []).map((data) => (
							<CustomInput
								email={data}
								handleDelete={handleDelete}
								type="cc_bcc"
								// checkType={checkType}
							/>
						))}
						{(showControl && type === 'cc_bcc') && (
							<div className={styles.tag_and_errorcontainer}>
								<div className={styles.tag_container}>
									<input
										size="sm"
										placeholder="Enter cc recipient"
										type="text"
										value={ccBccValue}
										onChange={(e) => handleChange(e)}
										onKeyPress={(e) => handleKeyPress(e)}
										className={cl`${error ? styles.error_input_container : styles.input_container}`}
									/>
									<div className={styles.cross_icon}>
										<IcMCross onClick={() => handleError('ccBccValue')} />
									</div>
								</div>
								{(error) && (
									<div className={styles.error_content_container}>
										Enter valid mail
									</div>
								)}
							</div>
						)}
						<div
							className={styles.add_icon}
							onClick={() => handleEdit('cc_bcc')}
							role="presentation"
						>
							+
						</div>
					</div>
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
						{(attachments || []).map((data) => (
							<div className={styles.uploaded_files}>
								<div className={styles.uploaded_files_content}>
									{decode(data)?.fileIcon}
									<div className={styles.content_div}>
										{decode(data)?.uploadedFileName}
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
						))}
					</div>

				</div>
			</Modal.Body>
		</Modal>
	);
}
export default MailModal;
