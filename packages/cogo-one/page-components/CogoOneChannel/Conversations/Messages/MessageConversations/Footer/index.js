/* eslint-disable max-lines-per-function */
import { cl, Popover, Textarea, Input } from '@cogoport/components';
import {
	IcMHappy,
	IcMAttach,
	IcMDelete,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import CustomFileUploader from '../../../../../../common/CustomFileUploader';
import MailRecipientType from '../../../../../../common/MailRecipientType';
import { ACCEPT_FILE_MAPPING } from '../../../../../../constants';
import getMailReciepientMapping from '../../../../../../helpers/getMailReciepientMapping';
import useGetEmojiList from '../../../../../../hooks/useGetEmojis';
import useSendChat from '../../../../../../hooks/useSendChat';
import useSendOmnichannelMail from '../../../../../../hooks/useSendOmnichannelMail';
import getFileAttributes from '../../../../../../utils/getFileAttributes';
import mailFunction from '../../../../../../utils/mailFunctions';
import EmojisBody from '../EmojisBody';
import styles from '../styles.module.css';

import SendActions from './SendActions';

const LAST_VALUE = 1;

const getPlaceHolder = ({ hasPermissionToEdit, canMessageOnBotSession }) => {
	if (canMessageOnBotSession) {
		return 'This chat is currently in bot session, send a message to talk with customer';
	}
	if (hasPermissionToEdit) {
		return 'Type your message...';
	}
	return 'You do not have permission to chat';
};

function Footer({
	canMessageOnBotSession = false,
	hasPermissionToEdit = false,
	suggestions = [],
	scrollToBottom = () => {},
	formattedData = {},
	viewType = '',
	firestore = {},
	activeChatCollection = {},
	setOpenModal = () => {},
	sendCommunicationTemplate = () => {},
	communicationLoading = false,
	assignChat = () => {},
	assignLoading = false,
	mailActions = {},
}) {
	const [draftMessages, setDraftMessages] = useState({});
	const [draftUploadedFiles, setDraftUploadedFiles] = useState({});
	const [uploading, setUploading] = useState({});
	const [emailState, setEmailState] = useState({
		toUserEmail   : [],
		subject       : '',
		ccrecipients  : [],
		bccrecipients : [],
	});

	const [showControl, setShowControl] = useState('');
	const [errorValue, setErrorValue] = useState('');

	const { id = '', channel_type = '' } = formattedData;

	const finalUrl = draftUploadedFiles?.[id];
	const draftMessage = draftMessages?.[id];

	const { sendChatMessage, sendQuickSuggestions, messageLoading } = useSendChat({
		firestore,
		channelType: channel_type,
		id,
		draftMessages,
		setDraftMessages,
		activeChatCollection,
		draftUploadedFiles,
		setDraftUploadedFiles,
		formattedData,
		assignChat,
		canMessageOnBotSession,
	});

	const {
		// mailLoading = false,
		sendMail = () => {},
	} = useSendOmnichannelMail({
		scrollToBottom,
		formattedData,
		emailState,
		draftUploadedFiles,
		draftMessage,
		finalUrl,
		setDraftMessages,
		setDraftUploadedFiles,
		mailActions,
		id,
	});

	const {
		emojisList = {},
		setOnClicked = () => {},
		onClicked = false,
	} = useGetEmojiList();

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey && hasPermissionToEdit) {
			event.preventDefault();
			sendChatMessage(scrollToBottom);
		}
	};

	const handleProgress = (val) => {
		setUploading((prev) => ({ ...prev, [id]: val }));
	};

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

	const urlArray = decodeURI(finalUrl)?.split('/');
	const fileName = urlArray?.[urlArray.length - LAST_VALUE] || '';

	const { uploadedFileName, fileIcon } = getFileAttributes({ finalUrl, fileName });

	const emailReceipientProps = mailFunction({
		setErrorValue,
		emailState,
		setShowControl,
		showControl,
		setEmailState,
	});

	const isEmail = channel_type === 'email';

	useEffect(() => {
		const { data, actionType = '' } = mailActions || {};
		const { response } = data || {};
		const { sender = '', subject = '' } = response || {};

		setEmailState(actionType === 'reply'
			? {
				toUserEmail : [sender],
				subject     : subject ? `RE: ${subject}` : '',
			} : {
				toUserEmail : [],
				subject     : subject ? `FWD: ${subject}` : '',
			});
		setShowControl('');
	}, [mailActions]);

	const mailRecipientMapping = getMailReciepientMapping({ mailActions });

	return (
		<>
			{isEmail && (
				<div className={styles.parent_reciepients} key={mailActions?.type}>
					{mailRecipientMapping.map((eachItem) => {
						const { label = '', value = '', isDisabled } = eachItem || {};

						return (
							<div key={value} className={styles.child_flex}>
								<div className={styles.label}>
									{label}
									:
								</div>
								<MailRecipientType
									{...emailReceipientProps}
									emailRecipientType={emailState?.[eachItem.value]}
									type={eachItem.value}
									errorValue={errorValue}
									showControl={showControl}
									isDisabled={isDisabled}
									key={mailActions?.type}
								/>
							</div>
						);
					})}
					<div className={styles.child_flex}>
						<div className={styles.label}>
							Sub:
						</div>
						<Input
							value={emailState?.subject}
							onChange={(e) => setEmailState((p) => ({ ...p, subject: e }))}
							size="xs"
							className={styles.styled_input}
						/>
					</div>
				</div>
			)}
			<div
				className={cl`${styles.nofile_container}
				${((finalUrl) || uploading?.[id]) ? styles.upload_file_container : ''}`}
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
									window.open(finalUrl, '_blank', 'noreferrer');
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
				{!isEmail && !isEmpty(suggestions) && (
					<div className={styles.suggestions_div}>
						<div className={styles.flex}>
							<div className={styles.suggestions_text}>
								Suggestions:
							</div>
							{(suggestions || []).map((eachSuggestion) => (
								<div
									key={eachSuggestion}
									className={styles.tag_div}
									role="presentation"
									onClick={() => {
										if (hasPermissionToEdit && !messageLoading) {
											sendQuickSuggestions({ scrollToBottom, val: eachSuggestion });
										}
									}}
									style={{
										cursor:
										(!hasPermissionToEdit || messageLoading) ? 'not-allowed' : 'pointer',
									}}
								>
									{eachSuggestion}
								</div>
							))}
						</div>

					</div>
				)}
				<Textarea
					rows={5}
					placeholder={getPlaceHolder({ hasPermissionToEdit, canMessageOnBotSession })}
					className={styles.text_area}
					value={draftMessage || ''}
					onChange={(e) => setDraftMessages((p) => ({ ...p, [id]: e }))}
					disabled={!hasPermissionToEdit}
					style={{ cursor: !hasPermissionToEdit ? 'not-allowed' : 'text' }}
					onKeyDown={(e) => handleKeyPress(e)}
				/>
				<div className={styles.flex_space_between}>
					<div className={styles.icon_tools}>
						{hasPermissionToEdit && (
							<CustomFileUploader
								disabled={uploading?.[id]}
								handleProgress={handleProgress}
								showProgress={false}
								draggable
								accept={ACCEPT_FILE_MAPPING[channel_type] || ACCEPT_FILE_MAPPING.default}
								className="file_uploader"
								uploadIcon={(
									<IcMAttach
										className={styles.upload_icon}
										style={{ cursor: !hasPermissionToEdit ? 'not-allowed' : 'pointer' }}
									/>
								)}
								channel={channel_type}
								onChange={(val) => {
									setDraftUploadedFiles((prev) => ({ ...prev, [id]: val }));
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
										[id]: !p?.[id] ? val
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
								style={{ cursor: !hasPermissionToEdit ? 'not-allowed' : 'pointer' }}
							/>
						</Popover>
					</div>
					<SendActions
						hasPermissionToEdit={hasPermissionToEdit}
						openInstantMessages={openInstantMessages}
						sendChatMessage={sendMail}
						messageLoading={((canMessageOnBotSession && assignLoading) || messageLoading)}
						scrollToBottom={scrollToBottom}
						finalUrl={finalUrl}
						draftMessage={draftMessage}
						formattedData={formattedData}
						viewType={viewType}
					/>
				</div>
			</div>
		</>
	);
}

export default Footer;
