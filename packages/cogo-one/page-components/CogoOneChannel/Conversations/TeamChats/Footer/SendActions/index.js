import { Popover } from '@cogoport/components';
import { IcMSend, IcMAttach, IcMHappy } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { forwardRef } from 'react';

import CustomFileUploader from '../../../../../../common/CustomFileUploader';
import { ACCEPT_FILE_MAPPING } from '../../../../../../constants';
import useGetEmojiList from '../../../../../../hooks/useGetEmojis';
import EmojisBody from '../EmojisBody';

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
}, ref) {
	const hasNoPermissionToSend = (
		!hasPermissionToEdit
		|| messageLoading
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
				{false && ( // remove
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
						style={{ cursor: hasPermissionToEdit ? 'pointer' : 'not-allowed' }}
						onClick={() => {
							if (hasPermissionToEdit) {
								setOnClicked((prev) => !prev);
							}
						}}
					/>
				</Popover>
			</div>
			<div className={styles.send_messages}>
				<IcMSend
					fill="#EE3425"
					style={{ cursor: canSendMessage ? 'pointer' : 'not-allowed' }}
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
