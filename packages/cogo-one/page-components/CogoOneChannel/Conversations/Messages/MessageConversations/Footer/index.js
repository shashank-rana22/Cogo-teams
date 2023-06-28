import { cl, Popover, Button } from '@cogoport/components';
import {
	IcMHappy,
	IcMAttach,
	IcMSend,
	IcMDelete,
	IcMQuickreply,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import CustomFileUploader from '../../../../../../common/CustomFileUploader';
import { ACCEPT_FILE_MAPPING } from '../../../../../../constants';
import useSendPromotionalRate from '../../../../../../hooks/useSendPromotionalRate';
import EmojisBody from '../EmojisBody';
import styles from '../styles.module.css';

const COMMON_FUNC = () => {};
function Footer({
	getPlaceHolder = COMMON_FUNC,
	draftMessage = '',
	sentQuickSuggestions = COMMON_FUNC,
	messageLoading = false,
	canMessageOnBotSession,
	emojisList = {},
	setOnClicked = COMMON_FUNC,
	onClicked = false,
	handleProgress,
	openInstantMessages = COMMON_FUNC,
	hasPermissionToEdit = false,
	suggestions = [],
	scrollToBottom = COMMON_FUNC,
	setDraftMessages = COMMON_FUNC,
	sendChatMessage = COMMON_FUNC,
	activeMessageCard = {},
	setDraftUploadedFiles = COMMON_FUNC,
	uploading,
	uploadedFileName,
	fileIcon,
	finalUrl = '',
}) {
	const { id = '', channel_type = '' } = activeMessageCard;
	const {
		sendPromotionalRate = () => {},
		loading = false,
	} = useSendPromotionalRate({ activeMessageCard });

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
				<textarea
					rows={4}
					placeholder={getPlaceHolder(hasPermissionToEdit, canMessageOnBotSession)}
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
								accept={ACCEPT_FILE_MAPPING[channel_type] || ACCEPT_FILE_MAPPING.default}
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
								channel={channel_type}
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
					<div className={styles.send_messages}>
						<Button
							size="sm"
							themeType="primary"
							className={styles.promotional_rate}
							loading={loading}
							disabled={!hasPermissionToEdit}
							onClick={() => {
								if (hasPermissionToEdit) {
									sendPromotionalRate();
								}
							}}
							style={{
								cursor: !hasPermissionToEdit
									? 'not-allowed'
									: 'pointer',
							}}
						>
							Send Promotional Rate
						</Button>
						<IcMQuickreply
							fill="#828282"
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
		</>
	);
}

export default Footer;
