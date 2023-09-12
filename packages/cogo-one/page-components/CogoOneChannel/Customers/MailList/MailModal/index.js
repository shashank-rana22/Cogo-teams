import { Modal, Pagination } from '@cogoport/components';
import { useState, useRef } from 'react';

import useMailEditorFunctions from '../../../../../helpers/mailEditorFunctions';
import useListEmailTemplates from '../../../../../hooks/useListEmailTemplates';
import mailFunction from '../../../../../utils/mailFunctions';

import ComposeEmailBody from './ComposeEmailBody';
import EmailTemplateList from './EmailTemplateList';
import RenderHeader from './Header';
import styles from './styles.module.css';

function MailEditorModal({
	mailProps = {},
	userId = '',
	activeMail = {},
	viewType = '',
}) {
	const {
		buttonType,
		setEmailState,
		setButtonType,
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
	} = useMailEditorFunctions({
		uploading,
		activeMail,
		attachments,
		userId,
		mailProps,
	});

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
						setButtonType={setButtonType}
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

export default MailEditorModal;
