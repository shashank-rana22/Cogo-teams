import { Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSend, IcMAttach, IcMHappy } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { forwardRef } from 'react';

import CustomFileUploader from '../../../../../../common/CustomFileUploader';
import EmojisBody from '../../../../../../common/EmojisBody';
import { ACCEPT_FILE_MAPPING } from '../../../../../../constants';
import useGetEmojiList from '../../../../../../hooks/useGetEmojis';

import styles from './styles.module.css';

function SendActions({
	hasPermissionToEdit = false,
	sendMessage = () => {},
	messageLoading = false,
	draftMessage = '',
	uploading = {},
	roomId = '',
	handleProgress = () => {},
	setDraftUploadedFiles = () => {},
	setDraftMessages = () => {},
	hasUploadedFiles = false,
	draftRoomId = '',
	isMobile = false,
}, ref) {
	const hasNoPermissionToSend = (
		!hasPermissionToEdit
		|| messageLoading
		|| !draftRoomId
		|| (isEmpty(draftMessage?.trim()) && !hasUploadedFiles)
	);

	const canSendMessage = !hasNoPermissionToSend;

	const {
		emojisList = {},
		setOnClicked = () => {},
		onClicked = false,
	} = useGetEmojiList();

	const handleUpdateMessage = (val) => {
		setDraftMessages(
			(prev) => ({
				...prev,
				[roomId]: prev?.[roomId] ? prev?.[roomId]?.concat(val) : val,
			}),
		);
	};

	const isUploadDisabled = uploading?.[roomId];

	return (
		<>
			<div className={styles.icon_tools}>
				{hasPermissionToEdit && (
					<CustomFileUploader
						disabled={isUploadDisabled}
						handleProgress={handleProgress}
						showProgress={false}
						draggable
						multiple
						accept={ACCEPT_FILE_MAPPING.default}
						className="file_uploader"
						uploadIcon={(
							<IcMAttach
								className={styles.upload_icon}
								style={{ cursor: isUploadDisabled ? 'not-allowed' : 'pointer' }}
							/>
						)}
						onChange={(val) => setDraftUploadedFiles((prev) => ({ ...prev, [roomId]: val }))}
						ref={ref}
					/>
				)}
				{isMobile ? null : (
					<Popover
						placement="top"
						render={(
							<EmojisBody
								emojisList={emojisList}
								setOnClicked={setOnClicked}
								updateMessage={handleUpdateMessage}
								onClicked={onClicked}
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
							style={{ cursor: hasPermissionToEdit ? 'pointer' : 'not-allowed' }}
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
				{!messageLoading ? (
					<IcMSend
						fill="#EE3425"
						style={{ cursor: canSendMessage ? 'pointer' : 'not-allowed' }}
						onClick={() => {
							if (canSendMessage) {
								sendMessage();
							}
						}}
					/>
				) :	(
					<Image
						src={GLOBAL_CONSTANTS.image_url.colored_loading}
						alt="load"
						width={25}
						height={25}
					/>
				)}
			</div>
		</>
	);
}

export default forwardRef(SendActions);
