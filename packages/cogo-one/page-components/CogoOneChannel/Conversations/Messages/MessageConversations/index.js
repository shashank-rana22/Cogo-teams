/* eslint-disable max-len */
import { cl, Popover } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import {
	IcMHappy,
	IcMAttach,
	IcMSend,
	IcMInfo,
	IcMDelete,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useRef, useEffect } from 'react';

import useGetEmojiList from '../../../../../hooks/useGetEmojis';
import getFileAttributes from '../../../../../utils/getFileAttributes';

import EmojisBody from './EmojisBody';
import ReceiveDiv from './ReceiveDiv';
import SentDiv from './SentDiv';
import styles from './styles.module.css';

function MessageConversations({
	messagesData = [],
	draftMessage = '',
	setDraftMessages = () => {},
	sendChatMessage,
	draftUploadedFile = {},
	setDraftUploadedFiles = () => {},
	getNextData,
	setOpenModal,
	activeMessageCard,
	suggestions = [],
	uploading,
	setUploading,
	hasPermissionToEdit = false,
	loadingMessages,
	loadingPrevMessages,
	sentQuickSuggestions = () => {},
	sendCommunicationTemplate = () => {},
	communicationLoading = false,
	lastPage = false,
}) {
	const messageRef = useRef();
	const { id = '', channel_type = '' } = activeMessageCard;

	const {
		emojisList = {},
		setOnClicked = () => {},
		onClicked = false,
		emojiListFetch = () => {},
	} = useGetEmojiList({ activeMessageCard });

	const { fileName = '', finalUrl = '' } = draftUploadedFile;

	const { uploadedFileName, fileIcon } = getFileAttributes({ fileName });

	const scrollToBottom = () => {
		setTimeout(() => {
			messageRef.current?.scrollTo({
				top   	  : messageRef.current.scrollHeight,
				behavior : 'smooth',
			});
		}, 200);
	};

	useEffect(() => {
		scrollToBottom();
	}, [loadingMessages, id]);

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey && hasPermissionToEdit) {
			event.preventDefault();
			sendChatMessage();
			scrollToBottom();
		}
	};

	const handleProgress = (val) => {
		setUploading((prev) => ({ ...prev, [id]: val }));
	};

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop === 0;
		if (bottom && !lastPage && !loadingPrevMessages) {
			getNextData();
		}
	};

	useEffect(() => {
		if (id) {
			emojiListFetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const openInstantMessages = () => {
		setOpenModal({
			type : 'instant_messages',
			data : {
				updateMessage: (val) => {
					setDraftMessages((p) => ({ ...p, [id]: val }));
					setOpenModal({ type: null, data: {} });
				},
				sendCommunicationTemplate,
				communicationLoading,
				channel_type,
			},
		});
	};

	const chatViewConditon = () => {
		if (
			(!isEmpty(draftUploadedFile) || uploading?.[id])
			&& !isEmpty(suggestions)
		) {
			return 'file_present_suggestions';
		}
		if (!isEmpty(draftUploadedFile) || uploading?.[id]) {
			return 'file_present_nosuggestions';
		}
		if (!isEmpty(suggestions)) {
			return 'suggestions_exist';
		}
		return 'no_suggestions';
	};

	const loader = (
		<div className={styles.loader}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/spinner.svg"
				alt="load"
			/>
		</div>
	);
	return (
		<div className={styles.styled_div}>
			<div
				key={id}
				className={cl`${styles.container} ${styles[chatViewConditon()]}`}
				onScroll={handleScroll}
				ref={messageRef}
			>
				{loadingPrevMessages && loader}
				{(messagesData || []).map((eachMessage) => (
					eachMessage?.conversation_type !== 'received' ? (
						<ReceiveDiv
							eachMessage={eachMessage}
							activeMessageCard={activeMessageCard}
						/>
					) : (
						<SentDiv
							eachMessage={eachMessage}
							activeMessageCard={activeMessageCard}
						/>
					)
				))}
			</div>

			<div
				className={cl`${styles.nofile_container} 
				${
					(!isEmpty(draftUploadedFile) || uploading?.[id])
					&& styles.upload_file_container
				}`}
			>
				{!isEmpty(draftUploadedFile) && !uploading?.[id] && (
					<>
						<div className={styles.files_view}>
							<div className={styles.file_icon_container}>
								{fileIcon}
							</div>
							<div
								role="presentation"
								className={styles.file_name_container}
								onClick={() => {
									// eslint-disable-next-line no-undef
									window.open(
										finalUrl,
										'_blank',
										'noreferrer',
									);
								}}
							>
								{uploadedFileName}
							</div>
						</div>
						<div className={styles.delete_icon_container}>
							<IcMDelete
								className={styles.delete_icon}
								onClick={() => setDraftUploadedFiles((p) => ({ ...p, [id]: undefined }))}
							/>
						</div>
					</>
				)}
				{uploading?.[id] && (
					<div className={styles.uploading}>uploading.....</div>
				)}
			</div>

			<div
				className={cl`${styles.text_area_div} ${
					hasPermissionToEdit ? '' : styles.opacity
				}`}
			>
				{!isEmpty(suggestions) && (
					<div className={styles.suggestions_div}>
						<div className={styles.flex}>
							<div className={styles.suggestions_text}>
								Suggestions:
							</div>
							{(suggestions || []).map((eachSuggestion) => (
								<div
									className={styles.tag_div}
									role="presentation"
									onClick={() => {
										if (hasPermissionToEdit) {
											sentQuickSuggestions(
												eachSuggestion,
												scrollToBottom,
											);
										}
									}}
								>
									{eachSuggestion}
								</div>
							))}
						</div>
						<IcMInfo fill="#221F20" height="20px" width="20px" />
					</div>
				)}
				<textarea
					rows={4}
					placeholder={
						hasPermissionToEdit
							? 'Type your message...'
							: 'You do not have typing controls as you are observing this chat'
					}
					className={styles.text_area}
					value={draftMessage || ''}
					onChange={(e) => setDraftMessages((p) => ({
						...p,
						[id]: e.target.value,
					}))}
					disabled={!hasPermissionToEdit}
					style={{
						cursor: !hasPermissionToEdit ? 'not-allowed' : 'text',
					}}
					onKeyPress={(e) => handleKeyPress(e)}
				/>

				<div className={styles.flex_space_between}>
					<div className={styles.icon_tools}>
						{hasPermissionToEdit && (
							<FileUploader
								defaultValues={!isEmpty(draftUploadedFile)
									? [draftUploadedFile]
									: ['']}
								disabled={uploading?.[id]}
								handleProgress={handleProgress}
								showProgress={false}
								draggable
								className="file_uploader"
								uploadIcon={(
									<IcMAttach
										className={styles.upload_icon}
										style={{
											cursor: !hasPermissionToEdit
												? 'not-allowed'
												: 'pointer',
										}}
									/>
								)}
								onChange={(val) => {
									setDraftUploadedFiles((prev) => ({
										...prev,
										[id]: val,
									}));
								}}
							/>
						)}

						<Popover
							placement="top"
							render={(
								<EmojisBody
									emojisList={emojisList}
									setOnClicked={setOnClicked}
									updateMessage={(val) => setDraftMessages((p) => ({
										...p,
										[id]: !p?.[id]
											? val
											: p?.[id]?.concat(val),
									}))}
								/>
							)}
							visible={onClicked}
							maxWidth={355}
							onClickOutside={() => {
								if (hasPermissionToEdit) {
									setOnClicked(false);
								}
							}}
						>
							<IcMHappy
								fill="#828282"
								onClick={() => {
									if (hasPermissionToEdit) {
										setOnClicked((p) => !p);
									}
								}}
								style={{
									cursor: !hasPermissionToEdit
										? 'not-allowed'
										: 'pointer',
								}}
							/>
						</Popover>
					</div>
					<div>
						<img
							role="presentation"
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Vector%20(5).svg"
							alt="img"
							onClick={() => {
								if (hasPermissionToEdit) {
									openInstantMessages();
								}
							}}
							style={{
								cursor: !hasPermissionToEdit
									? 'not-allowed'
									: 'pointer',
							}}
						/>
						<IcMSend
							fill="#EE3425"
							onClick={() => {
								if (hasPermissionToEdit) {
									sendChatMessage();
									scrollToBottom();
								}
							}}
							style={{
								cursor: !hasPermissionToEdit
									? 'not-allowed'
									: 'pointer',
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MessageConversations;
