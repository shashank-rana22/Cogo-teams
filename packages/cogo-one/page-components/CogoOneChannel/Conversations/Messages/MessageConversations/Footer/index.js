import { cl, Popover, Textarea } from '@cogoport/components';
import {
	IcMHappy,
	IcMAttach,
	IcMDelete,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import CustomFileUploader from '../../../../../../common/CustomFileUploader';
import { ACCEPT_FILE_MAPPING } from '../../../../../../constants';
import useGetEmojiList from '../../../../../../hooks/useGetEmojis';
import EmojisBody from '../EmojisBody';
import styles from '../styles.module.css';

import SendActions from './SendActions';

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
	draftMessage = '',
	sentQuickSuggestions = () => {},
	messageLoading = false,
	canMessageOnBotSession = false,
	handleProgress = () => {},
	openInstantMessages = () => {},
	hasPermissionToEdit = false,
	suggestions = [],
	scrollToBottom = () => {},
	setDraftMessages = () => {},
	sendChatMessage = () => {},
	setDraftUploadedFiles = () => {},
	uploading = false,
	uploadedFileName = '',
	fileIcon = null,
	finalUrl = '',
	formattedData = {},
	viewType = '',
}) {
	const { id = '', channel_type = '' } = formattedData;

	const {
		emojisList = {},
		setOnClicked = () => {},
		onClicked = false,
	} = useGetEmojiList({ formattedData });

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey && hasPermissionToEdit) {
			event.preventDefault();
			sendChatMessage(scrollToBottom);
		}
	};

	return (
		<>
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
				{!isEmpty(suggestions) && (
					<div className={styles.suggestions_div}>
						<div className={styles.flex}>
							<div className={styles.suggestions_text}>
								Suggestions:
							</div>
							{(suggestions || []).map((eachSuggestion) => (
								<div
									key={eachSuggestion}
									className={styles.tag_div}
									role="button"
									tabIndex={0}
									onClick={() => {
										if (hasPermissionToEdit && !messageLoading) {
											sentQuickSuggestions(scrollToBottom, eachSuggestion);
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
						sendChatMessage={sendChatMessage}
						messageLoading={messageLoading}
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
