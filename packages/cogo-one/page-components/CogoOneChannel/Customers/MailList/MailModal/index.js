import { Toast, Modal, RTE, Input, Select } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef } from 'react';

import { getUserActiveMails } from '../../../../../configurations/mail-configuration';
import { TOOLBARCONFIG } from '../../../../../constants';
import getFormatedEmailBody from '../../../../../helpers/getFormatedEmailBody';
import mailFunction from '../../../../../utils/mailFunctions';

import RenderHeader from './Header';
import Recipients from './Recipients';
import styles from './styles.module.css';

function MailModal({
	mailProps = {},
	userId = '',
	activeMail = {},
	replyMailApi = () => {},
	replyLoading = false,
}) {
	const {
		buttonType,
		activeMailAddress,
		emailState,
		setEmailState,
		viewType,
		userEmailAddress,
	} = mailProps;

	const uploaderRef = useRef(null);

	const [showControl, setShowControl] = useState(null);
	const [value, setValue] = useState('');
	const [errorValue, setErrorValue] = useState('');
	const [uploading, setUploading] = useState(false);
	const [attachments, setAttachments] = useState([]);

	const {
		handleKeyPress = () => {},
		handleEdit = () => {},
		handleChange = () => {},
		handleDelete = () => {},
		handleError = () => {},
		handleClose = () => {},
		handleAttachmentDelete = () => {},
		decode = () => {},
	} = mailFunction({
		...mailProps,
		setErrorValue,
		value,
		setValue,
		setShowControl,
		showControl,
		setAttachments,
		attachments,
		uploaderRef,
	});

	const userActiveMails = getUserActiveMails({ userEmailAddress, viewType }).reduce(
		(prev, curr) => (
			[...prev, { label: curr, value: curr }]),
		[],
	);

	const handleSend = () => {
		const isEmptyMail = getFormatedEmailBody({ emailState });

		if (uploading) {
			Toast.error('Files are uploading...');
			return;
		}

		if (isEmpty(emailState?.toUserEmail)) {
			Toast.error('To Mail is Required');
			return;
		}

		if (isEmptyMail || !emailState?.subject) {
			Toast.error('Both Subject and Body are Requied');
			return;
		}

		const payload = {
			sender        : emailState?.from_mail || activeMailAddress,
			toUserEmail   : emailState?.toUserEmail,
			ccrecipients  : emailState?.ccrecipients,
			bccrecipients : emailState?.bccrecipients,
			subject       : emailState?.subject,
			content       : emailState?.body,
			msgId         : buttonType !== 'send_mail' ? activeMail?.id : undefined,
			attachments,
			userId,

		};
		replyMailApi(payload);
	};

	return (
		<Modal
			show={buttonType}
			onClose={handleClose}
			onOuterClick={handleClose}
			size="lg"
			className={styles.styled_ui_modal_dialog}
			placement="top"
			scroll
		>
			<Modal.Header title={(
				<RenderHeader
					replyLoading={replyLoading}
					handleSend={handleSend}
					setUploading={setUploading}
					uploading={uploading}
					attachments={attachments}
					setAttachments={setAttachments}
					handleClose={handleClose}
					uploaderRef={uploaderRef}
					buttonType={buttonType}
				/>
			)}
			/>
			<Modal.Body>
				<div className={styles.type_to}>
					<div className={styles.sub_text}>
						From:
					</div>
					<div className={styles.select_container}>
						<Select
							value={emailState?.from_mail || activeMailAddress}
							onChange={(val) => setEmailState((prev) => ({ ...prev, from_mail: val }))}
							options={userActiveMails}
							size="sm"
						/>
					</div>
				</div>
				<Recipients
					emailState={emailState}
					handleChange={handleChange}
					handleDelete={handleDelete}
					handleKeyPress={handleKeyPress}
					handleError={handleError}
					handleEdit={handleEdit}
					showControl={showControl}
					value={value}
					errorValue={errorValue}
					setEmailState={setEmailState}
				/>

				<div className={styles.type_to}>
					<div className={styles.sub_text}>
						Sub:
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
						{uploading && (
							<div className={styles.uploading}>
								{uploading && 'Uploading...'}
							</div>
						)}

						{(attachments || []).map(
							(data) => {
								const {
									fileIcon = {},
									uploadedFileName = '',
								} = decode(data) || {};

								return (
									<div
										className={styles.uploaded_files}
										key={uploadedFileName}
									>
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
							},
						)}
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default MailModal;
