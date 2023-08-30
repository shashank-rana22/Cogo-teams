import { Toast, Modal, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef } from 'react';

import getFormatedEmailBody from '../../../../../helpers/getFormatedEmailBody';
import getRenderEmailBody from '../../../../../helpers/getRenderEmailBody';
import useListEmailTemplates from '../../../../../hooks/useListEmailTemplates';
import mailFunction from '../../../../../utils/mailFunctions';

import ComposeEmailBody from './ComposeEmailBody';
import EmailTemplateList from './EmailTemplateList';
import RenderHeader from './Header';
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
	} = mailProps;

	const uploaderRef = useRef(null);

	const [showControl, setShowControl] = useState(null);
	const [errorValue, setErrorValue] = useState('');
	const [uploading, setUploading] = useState(false);
	const [attachments, setAttachments] = useState([]);
	const [emailTemplate, setEmailTemplate] = useState({
		isTemplateView : false,
		emailData      : {},
	});

	const { isTemplateView = false, emailData = {} } = emailTemplate;

	const {
		data = {},
		loading = false,
		fetchEmailTemplate = () => {},
		search = '',
		setSearch = () => {},
	} = useListEmailTemplates();
	const { list = [], page = 1, total_count = 0, page_limit = 6 } = data || {};

	const {
		handleKeyPress = () => {},
		handleEdit = () => {},
		handleChange = () => {},
		handleDelete = () => {},
		handleCancel = () => {},
		handleClose = () => {},
		handleAttachmentDelete = () => {},
		getDecodedData = () => {},
	} = mailFunction({
		...mailProps,
		setErrorValue,
		setShowControl,
		showControl,
		setAttachments,
		attachments,
		uploaderRef,
	});

	const handleSend = () => {
		const isEmptyMail = getFormatedEmailBody({ emailState });
		if (replyLoading) {
			return;
		}

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

		const emailBody = getRenderEmailBody({ html: emailState?.body });

		const payload = {
			sender        : emailState?.from_mail || activeMailAddress,
			toUserEmail   : emailState?.toUserEmail,
			ccrecipients  : emailState?.ccrecipients,
			bccrecipients : emailState?.bccrecipients,
			subject       : emailState?.subject,
			content       : emailBody,
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
			<Modal.Header
				title={(
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
						setEmailTemplate={setEmailTemplate}
						isTemplateView={isTemplateView}
					/>
				)}
				className={isTemplateView ? styles.template_view : ''}
			/>
			<Modal.Body>
				{!isTemplateView ? (
					<ComposeEmailBody
						{...mailProps}
						handleKeyPress={handleKeyPress}
						handleEdit={handleEdit}
						handleChange={handleChange}
						handleDelete={handleDelete}
						handleCancel={handleCancel}
						handleAttachmentDelete={handleAttachmentDelete}
						getDecodedData={getDecodedData}
						errorValue={errorValue}
						attachments={attachments}
						showControl={showControl}
						uploading={uploading}
					/>
				) : (
					<EmailTemplateList
						list={list}
						loading={loading}
						search={search}
						setSearch={setSearch}
						fetchEmailTemplate={fetchEmailTemplate}
						setEmailTemplate={setEmailTemplate}
						emailData={emailData}
						setEmailState={setEmailState}
					/>
				)}
			</Modal.Body>
			{isTemplateView ? (
				<Modal.Footer>
					<Pagination
						type="page"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={(val) => fetchEmailTemplate({ page: val })}
					/>
				</Modal.Footer>
			) : null}
		</Modal>
	);
}

export default MailModal;
