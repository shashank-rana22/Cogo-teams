import { Modal, Pagination } from '@cogoport/components';
import { IcMExpand } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef, useMemo } from 'react';

import { HEADER_MAPPING } from '../../../../../constants/mailConstants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../constants/viewTypeMapping';
import useMailEditorFunctions from '../../../../../helpers/mailEditorFunctions';
import useListEmailTemplates from '../../../../../hooks/useListEmailTemplates';
import mailFunction from '../../../../../utils/mailFunctions';

import ComposeEmailBody from './ComposeEmailBody';
import EmailTemplateList from './EmailTemplateList';
import RenderHeader from './RenderHeader';
import styles from './styles.module.css';

const HIDE_FROM_MAIL = 1;

function MailEditorModal({
	mailProps = {},
	userId = '',
	activeMail = {},
	viewType = '',
	firestore = {},
}) {
	const {
		buttonType = '',
		setEmailState = () => {},
		setButtonType = () => {},
		resetEmailState = () => {},
		setMailAttachments = () => {},
		mailAttachments = [],
		emailState = {},
		userSharedMails = [],
		activeMailAddress = '',
	} = mailProps;

	const uploaderRef = useRef(null);

	const [showControl, setShowControl] = useState(null);
	const [errorValue, setErrorValue] = useState('');
	const [minimizeModal, setMinimizeModal] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [sendLoading, setSendLoading] = useState(false);
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
	} = useListEmailTemplates({ isTemplateView, viewType });

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
		setAttachments : setMailAttachments,
		attachments    : mailAttachments,
		uploaderRef,
	});

	const restrictMailToOrganizations = (
		VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.permissions?.restrict_mail_to_organizations || false
	);

	const showOrgSpecificMail = buttonType === 'send_mail' && restrictMailToOrganizations;

	const activeFromMail = emailState?.from_mail || activeMailAddress;

	const userActiveMails = useMemo(
		() => (
			[...new Set([
				...(userSharedMails || []),
				...(activeFromMail ? [activeFromMail] : []),
			])]
		),
		[activeFromMail, userSharedMails],
	);

	const hideFromMail = (
		isEmpty(userActiveMails)
		|| userActiveMails.length === HIDE_FROM_MAIL
		|| buttonType !== 'send_mail'
	);

	const {
		handleSend = () => {},
		replyLoading = false,
		handleSaveDraft = () => {},
	} = useMailEditorFunctions({
		uploading,
		activeMail,
		attachments: mailAttachments,
		userId,
		mailProps,
		firestore,
		sendLoading,
		setSendLoading,
		showOrgSpecificMail,
	});

	if (minimizeModal) {
		return (
			<div
				className={styles.minimized_modal_styles}
				role="presentation"
				onClick={() => setMinimizeModal(false)}
			>
				<div className={styles.expand_icon}>
					<IcMExpand />
				</div>

				<div className={styles.title}>
					{HEADER_MAPPING[buttonType] || 'New Message'}
				</div>
			</div>
		);
	}

	return (
		<Modal
			show={buttonType}
			onClose={handleClose}
			size="lg"
			className={styles.styled_ui_modal_dialog}
			placement="top"
			scroll
			animate={false}
			showCloseIcon={false}
			closeOnOuterClick={isEmpty(userActiveMails)}
		>
			<Modal.Header
				title={(
					<RenderHeader
						replyLoading={replyLoading}
						handleSend={handleSend}
						setUploading={setUploading}
						uploading={uploading}
						attachments={mailAttachments}
						setAttachments={setMailAttachments}
						handleClose={handleClose}
						uploaderRef={uploaderRef}
						buttonType={buttonType}
						setEmailTemplate={setEmailTemplate}
						isTemplateView={isTemplateView}
						setButtonType={setButtonType}
						handleSaveDraft={handleSaveDraft}
						setMinimizeModal={setMinimizeModal}
						resetEmailState={resetEmailState}
						sendLoading={sendLoading}
						showOrgSpecificMail={showOrgSpecificMail}
						hideFromMail={hideFromMail}
						userActiveMails={userActiveMails}
						activeMailAddress={activeFromMail}
					/>
				)}
				className={styles.modal_header}
			/>
			<Modal.Body>
				{!isTemplateView ? (
					<ComposeEmailBody
						{...mailProps}
						userActiveMails={userActiveMails}
						hideFromMail={hideFromMail}
						handleKeyPress={handleKeyPress}
						handleEdit={handleEdit}
						handleChange={handleChange}
						handleDelete={handleDelete}
						handleCancel={handleCancel}
						handleAttachmentDelete={handleAttachmentDelete}
						getDecodedData={getDecodedData}
						errorValue={errorValue}
						attachments={mailAttachments}
						showControl={showControl}
						uploading={uploading}
						mailProps={mailProps}
						showOrgSpecificMail={showOrgSpecificMail}
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

export default MailEditorModal;
