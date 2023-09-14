import { Modal, Pagination } from '@cogoport/components';
import { IcMExpand } from '@cogoport/icons-react';
import { useState, useRef } from 'react';

import { HEADER_MAPPING } from '../../../../../constants/mailConstants';
import useMailEditorFunctions from '../../../../../helpers/mailEditorFunctions';
import useListEmailTemplates from '../../../../../hooks/useListEmailTemplates';
import mailFunction from '../../../../../utils/mailFunctions';

import ComposeEmailBody from './ComposeEmailBody';
import EmailTemplateList from './EmailTemplateList';
import RenderHeader from './RenderHeader';
import styles from './styles.module.css';

function MailEditorModal({
	mailProps = {},
	userId = '',
	activeMail = {},
	viewType = '',
	firestore = {},
}) {
	const {
		buttonType,
		setEmailState,
		setButtonType,
	} = mailProps;

	const uploaderRef = useRef(null);

	const [showControl, setShowControl] = useState(null);
	const [errorValue, setErrorValue] = useState('');
	const [minimizeModal, setMinimizeModal] = useState(false);
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
		setAttachments,
		attachments,
		uploaderRef,
	});

	const {
		handleSend = () => {},
		replyLoading = false,
		handleSaveDraft = () => {},
	} = useMailEditorFunctions({
		uploading,
		activeMail,
		attachments,
		userId,
		mailProps,
		firestore,
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
			closeOnOuterClick={false}
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
						handleSaveDraft={handleSaveDraft}
						setMinimizeModal={setMinimizeModal}
					/>
				)}
				className={styles.modal_header}
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

export default MailEditorModal;
