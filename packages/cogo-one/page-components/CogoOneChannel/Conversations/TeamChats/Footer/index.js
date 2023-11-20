import { Textarea, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef } from 'react';

import useSendTeamsMessage from '../../../../../hooks/useSendTeamsMessage';
import { formatFileAttributes } from '../../../../../utils/getFileAttributes';

import FooterHead from './FooterHead';
import SendActions from './SendActions';
import styles from './styles.module.css';

function Footer({
	hasPermissionToEdit = false,
	activeTeamCard = {},
	activeTab = {},
	firestore = {},
	scrollToLastMessage = () => {},
	internalRoomId = '',
	isMobile = false,
}) {
	const uploaderRef = useRef(null);

	const [draftMessages, setDraftMessages] = useState({});
	const [draftUploadedFiles, setDraftUploadedFiles] = useState({});
	const [uploading, setUploading] = useState({});
	const { group_id = '', id: draftId = '' } = activeTeamCard;

	const activeId = group_id || draftId;

	const cleanUpFunc = () => {
		setDraftMessages((prev) => ({ ...prev, [activeId]: '' }));
		setDraftUploadedFiles((prev) => ({ ...prev, [activeId]: [] }));
		uploaderRef?.current?.externalHandleDelete?.([]);
		scrollToLastMessage();
	};

	const {
		sendMessageLoading = false,
		sendTeamsMessage = () => {},
	} = useSendTeamsMessage({
		activeTab,
		firestore,
		cleanUpFunc,
		draftRoomId: draftId,
	});

	const draftMessage = draftMessages?.[activeId] || '';

	const uploadedFiles = draftUploadedFiles?.[activeId] || [];

	const fileMetaData = formatFileAttributes({ uploadedFiles: draftUploadedFiles?.[activeId] });

	const hasUploadedFiles = !isEmpty(draftUploadedFiles?.[activeId]);

	const sendMessage = () => {
		sendTeamsMessage({
			draftMessage,
			attachments: uploadedFiles,
		});
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey && hasPermissionToEdit) {
			event.preventDefault();
			sendMessage();
		}
	};

	const handleProgress = (val) => {
		setUploading((prev) => ({ ...prev, [activeId]: val }));
	};

	return (
		<>
			<FooterHead
				uploading={uploading}
				roomId={activeId}
				fileMetaData={fileMetaData}
				setDraftUploadedFiles={setDraftUploadedFiles}
				hasUploadedFiles={hasUploadedFiles}
				uploaderRef={uploaderRef}
				hasPermissionToEdit={hasPermissionToEdit}
			/>
			<div className={cl`${styles.text_area_div} ${!hasPermissionToEdit ? styles.disabled : ''}`}>
				<Textarea
					rows={5}
					placeholder={hasPermissionToEdit
						? 'Type your message here...' : 'You don\'t have permission to chat'}
					className={styles.text_area}
					value={draftMessage || ''}
					onChange={(val) => setDraftMessages((prev) => ({ ...prev, [activeId]: val }))}
					style={{ cursor: hasPermissionToEdit ? 'text' : 'not-allowed' }}
					onKeyDown={handleKeyPress}
				/>
				<div className={styles.flex_space_between}>
					<SendActions
						hasPermissionToEdit={hasPermissionToEdit}
						sendMessage={sendMessage}
						messageLoading={sendMessageLoading}
						draftMessage={draftMessage}
						uploading={uploading}
						roomId={activeId}
						handleProgress={handleProgress}
						setDraftUploadedFiles={setDraftUploadedFiles}
						setDraftMessages={setDraftMessages}
						hasUploadedFiles={hasUploadedFiles}
						draftUploadedFiles={draftUploadedFiles}
						ref={uploaderRef}
						internalRoomId={internalRoomId}
						draftRoomId={draftId}
						isMobile={isMobile}
					/>
				</div>
				{!hasPermissionToEdit ? <div className={styles.overlay_div} /> : null}
			</div>
		</>
	);
}

export default Footer;
