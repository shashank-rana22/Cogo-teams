import { Button, Popover } from '@cogoport/components';
import { IcMSend, IcMQuickreply, IcMAttach, IcMHappy } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { forwardRef } from 'react';

import CustomFileUploader from '../../../../../../../common/CustomFileUploader';
import { ACCEPT_FILE_MAPPING } from '../../../../../../../constants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../../constants/viewTypeMapping';
import useGetEmojiList from '../../../../../../../hooks/useGetEmojis';
import useSendPromotionalRate from '../../../../../../../hooks/useSendPromotionalRate';
import EmojisBody from '../../EmojisBody';
import { getCanSendMessage } from '../footerFunctions';

import styles from './styles.module.css';

function SendActions({
	hasPermissionToEdit = false,
	openInstantMessages = () => {},
	sendMessage = () => {},
	messageLoading = false,
	draftMessage = '',
	formattedData = {},
	viewType = '',
	uploading = {},
	roomId = '',
	handleProgress = () => {},
	setDraftUploadedFiles = () => {},
	setDraftMessages = () => {},
	hasUploadedFiles = false,
	draftUploadedFiles = {},
	emailState = {},
	isEmail = false,
	mailActions = {},
}, ref) {
	const { channel_type = '' } = formattedData;

	const hasNoPermissionToSend = (
		!hasPermissionToEdit
		|| messageLoading
		|| (isEmpty(draftMessage?.trim()) && !hasUploadedFiles)
	);

	const canSendMessage = !hasNoPermissionToSend && getCanSendMessage({ emailState, channelType: channel_type });

	const {
		sendPromotionalRate = () => {},
		loading = false,
	} = useSendPromotionalRate({ formattedData });

	const {
		emojisList = {},
		setOnClicked = () => {},
		onClicked = false,
	} = useGetEmojiList();

	const isSendPromotionalRate = (
		!isEmail
		&& hasPermissionToEdit
		&& channel_type === 'whatsapp'
		&& VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.send_promotional_rate
	);

	const handleUpdateMessage = (val) => {
		setDraftMessages(
			(prev) => ({
				...prev,
				[roomId]: prev?.[roomId] ? prev?.[roomId]?.concat(val) : val,
			}),
		);
	};
	const isUploadDisabled = uploading?.[roomId] || (isEmail && mailActions?.actionType === 'forward');

	return (
		<>
			<div className={styles.icon_tools}>
				{hasPermissionToEdit && (
					<CustomFileUploader
						disabled={isUploadDisabled}
						handleProgress={handleProgress}
						showProgress={false}
						draggable
						multiple={channel_type === 'email'}
						accept={ACCEPT_FILE_MAPPING[channel_type] || ACCEPT_FILE_MAPPING.default}
						className="file_uploader"
						uploadIcon={(
							<IcMAttach
								className={styles.upload_icon}
								style={{ cursor: isUploadDisabled ? 'not-allowed' : 'pointer' }}
							/>
						)}
						draftUploadedFiles={draftUploadedFiles}
						channel={channel_type}
						onChange={(val) => setDraftUploadedFiles((prev) => ({ ...prev, [roomId]: val }))}
						ref={ref}
					/>
				)}
				{!isEmail && (
					<Popover
						placement="top"
						render={(
							<EmojisBody
								emojisList={emojisList}
								setOnClicked={setOnClicked}
								updateMessage={handleUpdateMessage}
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
							cursor={hasPermissionToEdit ? 'pointer' : 'not-allowed'}
							onClick={() => {
								if (hasPermissionToEdit) {
									setOnClicked((prev) => !prev);
								}
							}}
						/>
					</Popover>
				)}
			</div>
			<div className={styles.send_messages}>
				{isSendPromotionalRate && (
					<Button
						size="sm"
						themeType="primary"
						className={styles.promotional_rate}
						loading={loading}
						onClick={sendPromotionalRate}
						cursor={isSendPromotionalRate ? 'pointer' : 'not-allowed'}
					>
						Send Promotional Rate
					</Button>
				)}

				{!isEmail && (
					<IcMQuickreply
						fill="#828282"
						cursor={hasPermissionToEdit ? 'pointer' : 'not-allowed'}
						onClick={() => {
							if (hasPermissionToEdit) {
								openInstantMessages();
							}
						}}
					/>
				)}
				<IcMSend
					fill="#EE3425"
					cursor={canSendMessage ? 'pointer' : 'not-allowed'}
					onClick={() => {
						if (canSendMessage) {
							sendMessage();
						}
					}}
				/>
			</div>
		</>
	);
}

export default forwardRef(SendActions);
