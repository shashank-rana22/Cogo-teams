import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef } from 'react';

import CustomSunEditor from '../../../../../common/CustomSunEditor';
import { RTE_TEAMS_BAR_CONFIG } from '../../../../../constants/rteToolBarConfig';
import useSendTeamsMessage from '../../../../../hooks/useSendTeamsMessage';
import useUpdateTeamsMessage from '../../../../../hooks/useUpdateTeamsMessage';
import { formatFileAttributes } from '../../../../../utils/getFileAttributes';

import FooterHead from './FooterHead';
import SendActions from './SendActions';
import styles from './styles.module.css';

function Footer({
	hasPermissionToEdit = false,
	activeTab = {},
	scrollToLastMessage = () => {},
	isMobile = false,
	draftMessages = {},
	setDraftMessages = () => {},
	draftUploadedFiles = {},
	setDraftUploadedFiles = () => {},
	communicationData = {},
	callbackFunc = () => {},
	communicationLoading = false,
}) {
	const uploaderRef = useRef(null);
	const sunEditorRef = useRef();

	const [uploading, setUploading] = useState({});
	const [editorType, setEditorType] = useState('text');
	const { group_id = '', id: draftId = '' } = activeTab?.data || {};

	const activeId = group_id || draftId;
	const isEditMessage = !isEmpty(communicationData);

	const getSunEditorInstance = (sunEditor) => {
		sunEditorRef.current = sunEditor;
	};

	const cleanUpFunc = () => {
		setDraftMessages((prev) => ({ ...prev, [activeId]: '' }));
		sunEditorRef.current?.setContents('');
		setEditorType('text');
		setDraftUploadedFiles((prev) => ({ ...prev, [activeId]: [] }));
		uploaderRef?.current?.externalHandleDelete?.([]);
		scrollToLastMessage();
		callbackFunc();
	};

	const {
		sendMessageLoading = false,
		sendTeamsMessage = () => {},
	} = useSendTeamsMessage({
		activeTab,
		cleanUpFunc,
		draftRoomId: draftId,
	});

	const {
		updateMessageLoading = false,
		updateTeamsMessage = () => {},
	} = useUpdateTeamsMessage({
		cleanUpFunc,
		communicationData,
		activeId,
	});

	const draftMessage = draftMessages?.[activeId] || '';

	const uploadedFiles = draftUploadedFiles?.[activeId] || [];

	const fileMetaData = formatFileAttributes({ uploadedFiles: draftUploadedFiles?.[activeId] });

	const hasUploadedFiles = !isEmpty(draftUploadedFiles?.[activeId]);

	const sendMessage = () => {
		console.log('dfghjklhgfghj');
		if (isEditMessage) {
			console.log('edit=true');
			updateTeamsMessage({
				draftMessage : sunEditorRef.current?.getContents() || draftMessage,
				attachments  : uploadedFiles,
			});
			return;
		}

		sendTeamsMessage({
			draftMessage : sunEditorRef.current?.getContents() || draftMessage,
			attachments  : uploadedFiles,
		});
	};

	const handleKeyPress = (event) => {
		if (isEditMessage) {
			return;
		}

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
			<div className={cl`${styles.text_area_div} 
				${isEditMessage ? styles.edit_text_area : ''}
				${!hasPermissionToEdit ? styles.disabled : ''}
				${editorType === 'text' ? styles.simple_text_format : ''}
				`}
			>
				<CustomSunEditor
					key={`${activeId}_${editorType}`}
					defaultValue={draftMessage || ''}
					onChange={(val) => setDraftMessages(
						(prev) => ({ ...prev, [activeId]: val }),
					)}
					setOptions={{
						buttonList : RTE_TEAMS_BAR_CONFIG,
						defaultTag : 'div',
						minHeight  : '70px',
						maxHeight  : isEditMessage
							? 'calc(47vh - 90px)' : 'calc(55vh - 46px)',
						popupDisplay  : 'local',
						showPathLabel : false,
						resizingBar   : false,
					}}
					autoFocus
					onKeyDown={handleKeyPress}
					messageLoading={sendMessageLoading || updateMessageLoading || communicationLoading}
					getSunEditorInstance={getSunEditorInstance}
					placeholder={hasPermissionToEdit
						? 'Type your message here...' : 'You don\'t have permission to chat'}
				/>
				<div className={cl`${styles.flex_space_between} 
					${isEditMessage ? styles.edit_option_control : ''}`}
				>
					<SendActions
						hasPermissionToEdit={hasPermissionToEdit}
						sendMessage={sendMessage}
						messageLoading={sendMessageLoading || updateMessageLoading || communicationLoading}
						draftMessage={draftMessage}
						uploading={uploading}
						roomId={activeId}
						handleProgress={handleProgress}
						setDraftUploadedFiles={setDraftUploadedFiles}
						setDraftMessages={setDraftMessages}
						hasUploadedFiles={hasUploadedFiles}
						draftUploadedFiles={draftUploadedFiles}
						ref={uploaderRef}
						draftRoomId={draftId}
						isMobile={isMobile}
						setEditorType={setEditorType}
						isEditMessage={isEditMessage}
						cleanUpFunc={cleanUpFunc}
						sunEditorRef={sunEditorRef}
						uploadedFiles={uploadedFiles}
					/>
				</div>
				{!hasPermissionToEdit ? <div className={styles.overlay_div} /> : null}
			</div>
		</>
	);
}

export default Footer;
