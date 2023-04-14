import { cl, Popover } from '@cogoport/components';
import {
	IcMHappy,
	IcMAttach,
	IcMSend,
	IcMDelete,
	IcMRefresh,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useRef, useEffect, useState } from 'react';

import CustomFileUploader from '../../../../../common/CustomFileUploader';
import useGetEmojiList from '../../../../../hooks/useGetEmojis';
import getFileAttributes from '../../../../../utils/getFileAttributes';
import RaiseTicket from '../../RaiseTicket';

import EmojisBody from './EmojisBody';
import ReceiveDiv from './ReceiveDiv';
import SentDiv from './SentDiv';
import styles from './styles.module.css';
import TimeLine from './TimeLine';

function MessageMapping({ conversation_type, ...restProps }) {
	switch (conversation_type) {
		case 'sent':
			return <ReceiveDiv {...restProps} />;
		case 'received':
			return <SentDiv {...restProps} />;
		default:
			return <TimeLine {...restProps} />;
	}
}

function MessageConversations({
	messagesData = [],
	draftMessage = '',
	setDraftMessages = () => {},
	sendChatMessage,
	draftUploadedFile : finalUrl = '',
	setDraftUploadedFiles = () => {},
	getNextData,
	setOpenModal,
	activeMessageCard,
	suggestions = [],
	uploading,
	setUploading,
	hasPermissionToEdit = false,
	firstLoadingMessages,
	loadingPrevMessages,
	sentQuickSuggestions = () => {},
	sendCommunicationTemplate = () => {},
	communicationLoading = false,
	lastPage = false,
	messageLoading = false,
	formattedData = {},
}) {
	const [openTicketModal, setOpenTicketModal] = useState({ state: false, data: {} });
	const messageRef = useRef();
	const { id = '', channel_type = '', new_user_message_count = 0 } = activeMessageCard;

	const {
		emojisList = {},
		setOnClicked = () => {},
		onClicked = false,
		emojiListFetch = () => {},
	} = useGetEmojiList({ activeMessageCard });

	const urlArray = decodeURI(finalUrl)?.split('/');
	const fileName = urlArray[(urlArray?.length || 0) - 1] || '';

	const { uploadedFileName, fileIcon } = getFileAttributes({ finalUrl, fileName });

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
	}, [firstLoadingMessages, id]);

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey && hasPermissionToEdit) {
			event.preventDefault();
			sendChatMessage(scrollToBottom);
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

	const ticketPopoverContent = (data) => {
		const triggerModal = () => {
			setOpenTicketModal((p) => {
				if (p?.state) {
					return { state: false, data: {} };
				}
				return { state: true, data };
			});
		};
		return (
			<div className={styles.raise_ticket} role="button" tabIndex={0} onClick={triggerModal}>
				Raise a ticket
			</div>
		);
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
			((finalUrl) || uploading?.[id])
			&& !isEmpty(suggestions)
		) {
			return 'file_present_suggestions';
		}
		if ((finalUrl) || uploading?.[id]) {
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

	const firstLoadingDiv = (
		<div className={styles.flex_div}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-one-loader.gif"
				type="video/gif"
				alt="loading"
				className={styles.object_styles}
			/>
		</div>

	);

	const unreadIndex = new_user_message_count > messagesData.length
		? 0 : messagesData.length - new_user_message_count;

	const messageConversation = (
		<>
			{loadingPrevMessages
				? loader
				: (
					<div className={styles.load_prev_messages}>
						{!lastPage && (
							<IcMRefresh
								className={styles.refresh_icon}
								onClick={getNextData}
							/>
						)}
					</div>
				)}
			{(messagesData || []).map((eachMessage, index) => (
				<MessageMapping
					key={eachMessage?.created_at}
					conversation_type={eachMessage?.conversation_type || 'unknown'}
					eachMessage={eachMessage}
					activeMessageCard={activeMessageCard}
					messageStatus={channel_type === 'platform_chat' && !(index >= unreadIndex)}
					ticketPopoverContent={ticketPopoverContent}
				/>
			))}

		</>
	);
	return (
		<>
			<div className={styles.styled_div}>
				<div
					key={id}
					className={cl`${styles.container} ${styles[chatViewConditon()]}`}
					onScroll={handleScroll}
					ref={messageRef}
				>
					{firstLoadingMessages ? firstLoadingDiv : messageConversation }
				</div>

				<div
					className={cl`${styles.nofile_container} 
				${
					((finalUrl) || uploading?.[id])
					&& styles.upload_file_container
					}`}
				>
					{(finalUrl) && !uploading?.[id] && (
						<>
							<div className={styles.files_view}>
								<div className={styles.file_icon_container}>
									{fileIcon}
								</div>
								<div
									role="presentation"
									className={styles.file_name_container}
									onClick={() => {
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
											if (hasPermissionToEdit && !messageLoading) {
												sentQuickSuggestions(
													eachSuggestion,
													scrollToBottom,
												);
											}
										}}
										style={{
											cursor: (!hasPermissionToEdit || messageLoading) ? 'not-allowed' : 'pointer',
										}}
									>
										{eachSuggestion}
									</div>
								))}
							</div>

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
								<CustomFileUploader
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
									if (hasPermissionToEdit && !messageLoading) {
										sendChatMessage(scrollToBottom);
									}
								}}
								style={{
									cursor: !hasPermissionToEdit || messageLoading
								|| (isEmpty(draftMessage?.trim()) && !finalUrl)
										? 'not-allowed'
										: 'pointer',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
			{openTicketModal?.state && (
				<RaiseTicket
					openTicketModal={openTicketModal}
					setOpenTicketModal={setOpenTicketModal}
					formattedData={formattedData}
				/>
			)}
		</>
	);
}

export default MessageConversations;
