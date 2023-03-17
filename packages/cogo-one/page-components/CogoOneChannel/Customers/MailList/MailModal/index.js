import { Toast, cl, Modal, Button, RTE, Input } from '@cogoport/components';
import { IcMSend, IcMAttach, IcMCross } from '@cogoport/icons-react';
import { useState, useRef } from 'react';

import CustomFileUploader from '../../../../../common/CustomFileUploader';
import CustomInput from '../../../../../common/EmailCustomTag/index';
import { TOOLBARCONFIG } from '../../../../../constants';
import getFormatedEmailBody from '../../../../../helpers/getFormatedEmailBody';
import getFileAttributes from '../../../../../utils/getFileAttributes';

import styles from './styles.module.css';

function MailModal({
	showMailModal, setShowMailModal, userData = {}, sendQuickCommuncation = () => {},
	loading,
}) {
	const [showControl, setShowControl] = useState(false);
	const [type, setType] = useState('');
	const [recipientValue, setRecipientValue] = useState('');
	const [ccBccValue, setCcBccValue] = useState('');
	const [error, setError] = useState(false);
	const [errorValue, setErrorValue] = useState('');
	const [recipientArray, setRecipientArray] = useState([]);
	const [bccArray, setBccArray] = useState([]);
	const [uploading, setUploading] = useState(false);

	const [attachments, setAttachments] = useState([]);
	const [emailState, setEmailState] = useState({
		subject : '',
		body    : '',
	});

	const uploaderRef = useRef(null);

	const handleProgress = (val) => {
		setUploading(val);
	};

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

	const renderHeader = () => (
		<>
			<div className={styles.send_icon}>
				<IcMSend
					onClick={handleSend}
					loading={loading}
				/>
			</div>
			<div className={styles.title}>New Message</div>
			<div className={styles.right_header}>
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
				<Button size="md" themeType="link" onClick={() => setShowMailModal(false)}>Cancel</Button>
			</div>
		</>
	);

	const handleEdit = (val) => {
		setType(val);
		setShowControl(true);
		setError(false);
		setErrorValue(null);
		if (type === 'recipient') {
			setCcBccValue('');
		} else {
			setRecipientValue('');
		}
	};

	const handleChange = (item) => {
		if (type === 'recipient') {
			setRecipientValue(item.target?.value);
		} else {
			setCcBccValue(item.target?.value);
		}
	};

	const validateEmail = (emailInput) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(emailInput);
	};

	const isInList = (email, data) => data.includes(email);

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if ((type === 'recipient' && !validateEmail(recipientValue))
			|| (type === 'cc_bcc' && !validateEmail(ccBccValue))) {
				setErrorValue('Enter valid id');
				setError(true);
				return;
			}
			if ((type === 'recipient' && isInList(recipientValue, recipientArray))
			|| (type === 'cc_bcc' && isInList(ccBccValue, bccArray))) {
				setErrorValue('Email already present');
				setError(true);
				return;
			}

			setError(false);
			setErrorValue(null);
			if (type === 'recipient') {
				setRecipientArray((prev) => [...prev, recipientValue]);
				setRecipientValue('');
				setType('');
				setShowControl(false);
			} else {
				setBccArray((prev) => [...prev, ccBccValue]);
				setCcBccValue('');
				setType('');
				setShowControl(false);
			}
		}
	};

	const handleDelete = (val, emailType) => {
		if (emailType === 'recipient') {
			setRecipientArray((p) => p.filter((data) => data !== val));
		} else {
			setBccArray((p) => p.filter((data) => data !== val));
		}
	};

	const handleAttachmentDelete = (url) => {
		const filteredAttachments = attachments.filter((data) => data !== url);
		setAttachments(filteredAttachments);
		uploaderRef?.current?.externalHandleDelete(filteredAttachments);
	};

	const handleError = (s) => {
		setError(false);
		if (s === 'receipient') { setRecipientValue(''); } else { setCcBccValue(''); }
		setShowControl(false);
	};

	const decode = (data = '') => {
		const val = decodeURI(data).split('/');
		const fileName = val[val.length - 1];
		const { uploadedFileName, fileIcon } = getFileAttributes({ fileName, finalUrl: data });
		return { uploadedFileName, fileIcon };
	};
	return (
		<Modal
			show={showMailModal}
			onClose={() => setShowMailModal(false)}
			onOuterClick={() => setShowMailModal(false)}
			size="lg"
			className={styles.styled_ui_modal_dialog}
			placement="top"
			scroll
		>
			<Modal.Header title={renderHeader()} />
			<Modal.Body>
				<div className={styles.type_to}>
					<div className={styles.sub_text}>
						To:
						{' '}
					</div>
					<div className={styles.tags_div}>
						{
							recipientArray.map((data) => (
								<CustomInput
									email={data}
									handleDelete={handleDelete}
									type="recipient"
								/>
							))
						}
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
						{
							bccArray.map((data) => (
								<CustomInput
									email={data}
									handleDelete={handleDelete}
									type="cc_bcc"
								/>
							))
						}
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
