import { Modal, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState, useRef } from 'react';

import ComposeEmailBody from './ComposeEmailBody';
import EmailTemplateList from './EmailTemplateList';
import RenderHeader from './Header';
import mailFunction from './helpers/mailFunctions';
import useMailEditorFunctions from './helpers/useMailEditorFunctions';
import useListEmailTemplates from './hooks/useListEmailTemplates';
import { DEFAULT_EMAIL_STATE } from './mailConstants';
import styles from './styles.module.css';

function MailIcon({ onClick = () => { } }) {
	return (
		<div className={styles.mail_icon_styles}>
			<Image
				onClick={onClick}
				src={GLOBAL_CONSTANTS.image_url.email_icon}
				alt="gmail icon"
				role="presentation"
				height={30}
				width={30}
			/>
		</div>
	);
}

function MailEditorModal({
	email = '',
}) {
	const { userEmailAddress = '', userId = '', userName = '' } = useSelector(({ profile }) => ({
		userEmailAddress : profile?.user?.email,
		userId           : profile?.user?.id,
		userName         : profile?.user?.name,
	}));
	const [buttonType, setButtonType] = useState('');
	const [emailState, setEmailState] = useState({
		...DEFAULT_EMAIL_STATE,
		toUserEmail : [email],
		from_mail   : userEmailAddress,
	});
	const [activeMailAddress, setActiveMailAddress] = useState(userEmailAddress);

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
		fetchEmailTemplate = () => { },
		search = '',
		setSearch = () => { },
	} = useListEmailTemplates({ isTemplateView });

	const { list = [], page = 1, total_count = 0, page_limit = 6 } = data || {};

	const {
		handleKeyPress = () => { },
		handleEdit = () => { },
		handleChange = () => { },
		handleDelete = () => { },
		handleCancel = () => { },
		handleClose = () => { },
		handleAttachmentDelete = () => { },
		getDecodedData = () => { },
	} = mailFunction({
		emailState,
		setEmailState,
		buttonType,
		setButtonType,
		setErrorValue,
		setShowControl,
		showControl,
		setAttachments,
		attachments,
		uploaderRef,
		setActiveMailAddress,
		toEmail: email,
		userEmailAddress,
	});

	const {
		handleSend = () => { },
		replyLoading = false,
	} = useMailEditorFunctions({
		uploading,
		attachments,
		userId,
		emailState,
		setEmailState,
		setButtonType,
		buttonType,
		activeMailAddress,
		setActiveMailAddress,
		userName,
		userEmailAddress,
		email,
	});

	return (
		<>
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
							setButtonType={setButtonType}
						/>
					)}
					className={isTemplateView ? styles.template_view : ''}
				/>
				<Modal.Body>
					{!isTemplateView ? (
						<ComposeEmailBody
							emailState={emailState}
							setEmailState={setEmailState}
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
							userEmailAddress={userEmailAddress}
							email={email}
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
			<MailIcon onClick={() => setButtonType('send_mail')} />
		</>
	);
}

export default MailEditorModal;
