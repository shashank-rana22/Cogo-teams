import { Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef } from 'react';

import RTE_TOOL_BAR_CONFIG from '../../../../../constants/rteToolBarConfig';
import useSendTeamsMessage from '../../../../../hooks/useSendTeamsMessage';
import { formatFileAttributes } from '../../../../../utils/getFileAttributes';

import FooterHead from './FooterHead';
import SendActions from './SendActions';
import styles from './styles.module.css';

function Footer({
	suggestions = [],
	hasPermissionToEdit = false,
	activeTeamCard = {},
	activeTab = {},
	firestore = {},
	scrollToLastMessage = () => {},
	internalRoomId = '',
	draftRoomId = '',
}) {
	const uploaderRef = useRef(null);

	const [draftMessages, setDraftMessages] = useState({});
	const [draftUploadedFiles, setDraftUploadedFiles] = useState({});
	const [uploading, setUploading] = useState({});
	const { room_id = '', id: draftId = '' } = activeTeamCard;

	const activeId = draftId || room_id;

	const cleanUpFunc = () => {
		setDraftMessages((prev) => ({ ...prev, [activeId]: '' }));
		setDraftUploadedFiles((prev) => ({ ...prev, [activeId]: '' }));
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
		draftRoomId,
	});

	const draftMessage = draftMessages?.[activeId] || '';

	const uploadedFiles = draftUploadedFiles?.[activeId] || [];

	const fileMetaData = formatFileAttributes({ uploadedFiles: draftUploadedFiles?.[activeId] });

	const hasUploadedFiles = !isEmpty(draftUploadedFiles?.[activeId]);

	const sendMessage = () => {
		sendTeamsMessage({ draftMessage, attachments: uploadedFiles });
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

			<div className={styles.text_area_div}>
				{!isEmpty(suggestions) ? (
					<div className={styles.suggestions_div}>
						<div className={styles.flex_container}>
							<div className={styles.suggestions_text}>
								Suggestions:
							</div>
							{(suggestions || []).map((eachSuggestion) => (
								<div
									key={eachSuggestion}
									className={styles.tag_div}
									role="presentation"
									style={{ cursor: (sendMessageLoading || !draftRoomId) ? 'not-allowed' : 'pointer' }}
									onClick={() => {
										sendTeamsMessage({ draftMessage: eachSuggestion });
									}}
								>
									{eachSuggestion}
								</div>
							))}
						</div>
					</div>
				) : null}
				<Textarea
					rows={5}
					placeholder="Type your message here..."
					className={styles.text_area}
					value={draftMessage || ''}
					onChange={(val) => setDraftMessages((prev) => ({ ...prev, [activeId]: val }))}
					style={{ cursor: hasPermissionToEdit ? 'text' : 'not-allowed' }}
					onKeyDown={handleKeyPress}
					modules={{ toolbar: RTE_TOOL_BAR_CONFIG }}
					showToolbar={false}
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
						draftRoomId={draftRoomId}
					/>
				</div>
			</div>
		</>
	);
}

export default Footer;
