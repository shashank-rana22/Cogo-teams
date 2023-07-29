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
import { getCanSendMessage } from '../footerHelpers';

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
	id = '',
	handleProgress = () => {},
	setDraftUploadedFiles = () => {},
	setDraftMessages = () => {},
	hasUploadedFiles = false,
	draftUploadedFiles = {},
	emailState = {},
	isEmail = false,
}, ref) {
	const { channel_type = '' } = formattedData;

	const hasNoPermissionToSend = !hasPermissionToEdit || messageLoading
	|| (isEmpty(draftMessage?.trim()) && !hasUploadedFiles);

	const canSendMessage = !hasNoPermissionToSend && getCanSendMessage({ emailState });

	const {
		sendPromotionalRate = () => {},
		loading = false,
	} = useSendPromotionalRate({ formattedData });

	const {
		emojisList = {},
		setOnClicked = () => {},
		onClicked = false,
	} = useGetEmojiList();

	const isSendPromotionalRate = !isEmail && hasPermissionToEdit
	&& channel_type === 'whatsapp' && VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.send_promotional_rate;

	return (
		<>
			<div className={styles.icon_tools}>
				{hasPermissionToEdit && (
					<CustomFileUploader
						disabled={uploading?.[id]}
						handleProgress={handleProgress}
						showProgress={false}
						draggable
						multiple
						accept={ACCEPT_FILE_MAPPING[channel_type] || ACCEPT_FILE_MAPPING.default}
						className="file_uploader"
						uploadIcon={(
							<IcMAttach
								className={styles.upload_icon}
								style={{ cursor: 'pointer' }}
							/>
						)}
						draftUploadedFiles={draftUploadedFiles}
						channel={channel_type}
						onChange={(val) => {
							setDraftUploadedFiles((prev) => ({ ...prev, [id]: val }));
						}}
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
						style={{ cursor: !isSendPromotionalRate ? 'not-allowed' : 'pointer' }}
					>
						Send Promotional Rate
					</Button>
				)}

				{!isEmail && (
					<IcMQuickreply
						fill="#828282"
						onClick={() => {
							if (hasPermissionToEdit) {
								openInstantMessages();
							}
						}}
						style={{ cursor: !hasPermissionToEdit ? 'not-allowed' : 'pointer' }}
					/>
				)}
				<IcMSend
					fill="#EE3425"
					onClick={() => {
						if (canSendMessage) {
							sendMessage();
						}
					}}
					style={{ cursor: !canSendMessage ? 'not-allowed' : 'pointer' }}
				/>
			</div>
		</>
	);
}

export default forwardRef(SendActions);
