/* eslint-disable max-len */
import { Popover } from '@cogoport/components';
import { IcMHappy, IcMAttach, IcMSend, IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useRef, useEffect } from 'react';

import useGetEmojiList from '../../../../hooks/useGetEmojis';

import EmojisBody from './EmojisBody';
import ReceiveDiv from './ReceiveDiv';
import SentDiv from './SentDiv';
import styles from './styles.module.css';

function MessageConversations(
	{
		messagesData = [],
		draftMessage = '',
		setDraftMessages = () => {},
		id = '',
		sendChatMessage,
		lastPage,
		getNextData,
	},
) {
	const messageRef = useRef(null);

	const noMessages = isEmpty(messagesData);
	const checkMessage = isEmpty(draftMessage);

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

	const {
		emojisList = {},
		setOnClicked = () => { },
		onClicked = false,
	} = useGetEmojiList();

	return (
		<div className={styles.styled_div}>
			<div className={styles.container} onScroll={handleScroll}>
				{(messagesData || []).map((eachMessage) => (
					eachMessage?.conversation_type !== 'received'
						? <ReceiveDiv eachMessage={eachMessage} />
						: <SentDiv eachMessage={eachMessage} />
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
					<div className={styles.flex}>
						<IcMAttach fill="#828282" />
						<Popover
							placement="top"
							render={<EmojisBody emojisList={emojisList} />}
							visible={onClicked}
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
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Vector%20(5).svg"
							alt="img"
						/>
						<IcMSend fill="#EE3425" />
					</div>
				</div>
			</div>
		</div>
	);
}
export default MessageConversations;
