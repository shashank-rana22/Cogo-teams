/* eslint-disable max-len */
import { Popover } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMHappy, IcMAttach, IcMSend, IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useRef, useEffect } from 'react';

import useGetEmojiList from '../../../../../hooks/useGetEmojis';

import EmojisBody from './EmojisBody';
import ReceiveDiv from './ReceiveDiv';
import SentDiv from './SentDiv';
import styles from './styles.module.css';

function MessageConversations({
	messagesData = [],
	draftMessage = '',
	setDraftMessages = () => {},
	sendChatMessage,
	lastPage,
	draftUploadedFile = {},
	setDraftUploadedFiles = () => {},
	getNextData,
	setOpenModal,
	activeMessageCard,
}) {
	const messageRef = useRef(null);
	const noMessages = isEmpty(messagesData);
	const checkMessage = isEmpty(draftMessage);
	const { id = '' } = activeMessageCard;
	const {
		emojisList = {},
		setOnClicked = () => { },
		onClicked = false,
		emojiListFetch = () => {},
	} = useGetEmojiList({ activeMessageCard });
	const { fileName = '', finalUrl = '' } = draftUploadedFile;

	const suggestions = ['Hello, Goodmorning Sir!', 'Hi, how may I help you?', 'Thank- you'];
	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendChatMessage();
		}
	};

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop === 0;
		if (!lastPage && bottom) {
			getNextData();
		}
	};

	const scrollToBottom = () => {
		setTimeout(messageRef.current?.scrollIntoView({
			behavior : 'auto',
			block    : 'nearest',
			inline   : 'start',
		}), 700);
	};

	useEffect(() => {
		if (!noMessages) {
			scrollToBottom();
		}
	}, [id, noMessages, checkMessage]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { emojiListFetch(); }, []);

	const openInstantMessages = () => {
		setOpenModal({
			type : 'instant_messages',
			data : {
				updateMessage: (val) => {
					console.log('val', val);
					setDraftMessages((p) => ({ ...p, [id]: val }));
					setOpenModal({ type: null, data: {} });
				},
			},

		});
	};

	return (
		<div className={styles.styled_div}>
			<div className={styles.container} onScroll={handleScroll}>
				{(messagesData || []).map((eachMessage) => (
					eachMessage?.conversation_type !== 'received'
						? <ReceiveDiv eachMessage={eachMessage} activeMessageCard={activeMessageCard} />
						: <SentDiv eachMessage={eachMessage} activeMessageCard={activeMessageCard} />
				))}
				<div ref={messageRef} />
			</div>

			<div className={styles.text_area_div}>
				<div className={styles.suggestions_div}>
					<div className={styles.flex}>
						<div className={styles.suggestions_text}>
							Suggestions:
						</div>
						{(suggestions || []).map((eachSuggestion) => (
							<div className={styles.tag_div}>
								{eachSuggestion}
							</div>
						))}
					</div>
					<IcMInfo fill="#221F20" height="20px" width="20px" />
				</div>
				<textarea
					rows={2}
					placeholder="Type your message..."
					className={styles.text_area}
					value={draftMessage || ''}
					onChange={(e) => setDraftMessages((p) => ({ ...p, [id]: e.target.value }))}
					onKeyPress={(e) => handleKeyPress(e)}
				/>

				<div className={styles.flex_space_between}>
					<div className={styles.icon_tools}>
						{/* <FileUploader
							value={finalUrl}
							onChange={(val) => setDraftUploadedFiles((prev) => ({ ...prev, [id]: val }))}
							showProgres={false}
							draggable
							multipleUploadDesc="Upload Invoice"
							className="file_uploader"
							uploadIcon={<IcMAttach fill="#828282" />}
						/> */}
						<IcMAttach fill="#828282" />
						<Popover
							placement="top"
							render={<EmojisBody emojisList={emojisList} />}
							visible={onClicked}
							maxWidth={355}
							onClickOutside={() => setOnClicked(false)}
						>
							<IcMHappy
								fill="#828282"
								onClick={() => setOnClicked((prev) => !prev)}
							/>
						</Popover>
					</div>
					<div>
						<img
							role="presentation"
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Vector%20(5).svg"
							alt="img"
							onClick={openInstantMessages}
						/>
						<IcMSend fill="#EE3425" onClick={sendChatMessage} />
					</div>
				</div>
			</div>
		</div>
	);
}
export default MessageConversations;
