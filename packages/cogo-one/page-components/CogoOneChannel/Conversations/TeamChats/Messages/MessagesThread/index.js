import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import TimeLine from '../../../../../../common/TimeLine';
import useGetTeamsMessages from '../../../../../../hooks/useGetTeamsMessages';
import ReceiveComponent from '../ReceiveComponent';
import SentComponent from '../SendComponent';

import styles from './styles.module.css';

const SCROLL_WHEN_REQUIRED_HEIGHT = 2;
const CONVERSATION_TYPE_MAPPING = {
	sent     : SentComponent,
	received : ReceiveComponent,
	timeline : TimeLine,
};

function LoadPrevMessages({
	loadingPrevMessages = false,
	isLastPage = false,
	refetch = () => {},
}) {
	if (loadingPrevMessages) {
		return (
			<div className={styles.loader}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.spinner_loader}
					alt="load"
					width={20}
					height={20}
				/>
			</div>
		);
	}

	return (
		<div className={styles.load_prev_messages}>
			{!isLastPage ? (
				<IcMRefresh
					className={styles.refresh_icon}
					onClick={refetch}
				/>
			) : null}
		</div>
	);
}

function MessagesThread({
	firestore = {},
	roomId = '',
	conversationsDivRef = {},
	scrollToLastMessage = () => {},
	isGroup = false,
	lastGroupUpdatedAt = 0,
	activeId = '',
	isMobile = false,
	activeTab = {},
}) {
	const {
		firstLoadingMessages,
		messages = [],
		loadingPrevMessages = false,
		refetch = () => {},
		isLastPage = false,
		loggedInUserId = '',
		handleScroll = () => {},
		messagesState = {},
	} = useGetTeamsMessages({
		firestore,
		roomId,
		scrollToLastMessage,
		isGroup,
		lastGroupUpdatedAt,
	});

	useEffect(() => {
		const {
			scrollHeight = 0,
			scrollTop = 0,
			clientHeight = 0,
		} = conversationsDivRef?.current || {};

		if (
			!isEmpty(messagesState) && !firstLoadingMessages
			&& (scrollHeight - scrollTop < SCROLL_WHEN_REQUIRED_HEIGHT * clientHeight)
		) {
			scrollToLastMessage();
		}
	}, [conversationsDivRef, firstLoadingMessages, messagesState, scrollToLastMessage]);

	if (firstLoadingMessages) {
		return (
			<div className={styles.flex_div}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
					type="video/gif"
					alt="loading"
					width={100}
					height={100}
				/>
			</div>
		);
	}

	return (
		<div
			className={styles.main_container}
			onScroll={handleScroll}
			ref={conversationsDivRef}
		>

			<LoadPrevMessages
				loadingPrevMessages={loadingPrevMessages}
				isLastPage={isLastPage}
				refetch={refetch}
			/>
			<div>
				{(messages || []).map((eachMessage) => {
					const conversationType = eachMessage?.send_by_id === loggedInUserId ? 'sent' : 'received';
					console.log(eachMessage, 'each-message');

					const modifiedConvType = eachMessage?.type === 'timeline' ? 'timeline' : conversationType;
					console.log(modifiedConvType, 'modifiedConvType');
					const Component = CONVERSATION_TYPE_MAPPING[modifiedConvType];

					if (!Component) {
						return null;
					}

					return (
						<Component
							key={eachMessage?.created_at}
							eachMessage={eachMessage}
							activeId={activeId}
							activeTab={activeTab}
							internalRoomId={activeId}
							isMobile={isMobile}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default MessagesThread;
