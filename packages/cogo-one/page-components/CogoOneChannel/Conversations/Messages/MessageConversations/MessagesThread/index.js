import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh, IcMArrowDoubleDown } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { forwardRef, useEffect } from 'react';

import { updateUnreadMessagesCount } from '../../../../../../helpers/updateUnreadMessagesCount';

import { ReceiveDivComponent, SentDivComponent } from './conversationDivMappings';
import NewUserOutBound from './NewUserOutBound';
import styles from './styles.module.css';
import TimeLine from './TimeLine';

const DEFAULT_VALUE = 0;
const DEFAULT_UNREAD_MESSAGES = 0;
const SCROLL_WHEN_REQUIRED_HEIGHT = 2;
const MAXIMUM_NUMBER_OF_UNREAD_MESSAGES_COUNT = 99;

const CONVERSATION_TYPE_MAPPING = {
	sent     : ReceiveDivComponent,
	received : SentDivComponent,
	default  : TimeLine,
};

function LoadPrevMessages({
	loadingPrevMessages = false,
	lastPage = false,
	getNextData = () => {},
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
			{!lastPage && (
				<IcMRefresh
					className={styles.refresh_icon}
					onClick={getNextData}
				/>
			)}
		</div>
	);
}

function MessagesThread(
	{
		loadingPrevMessages = false,
		lastPage = false,
		getNextData = () => {},
		messagesData = [],
		activeMessageCard = {},
		formattedData = {},
		setRaiseTicketModal = () => {},
		hasNoFireBaseRoom = false,
		setModalType = () => {},
		activeTab = {},
		scrollToBottom = () => {},
		firestore = {},
		viewType = '',
		hasPermissionToEdit = false,
		mailProps = {},
		latestMessagesAtTop = false,
	},
	messageRef,
) {
	const {
		channel_type = '',
		new_user_message_count = DEFAULT_UNREAD_MESSAGES,
		user_name = '',
		new_message_count = DEFAULT_UNREAD_MESSAGES,
		id,
	} = activeMessageCard;

	const unreadIndex = new_user_message_count > messagesData.length
		? DEFAULT_VALUE : messagesData.length - new_user_message_count;

	const {
		scrollHeight = '',
		scrollTop = '',
		clientHeight = '',
	} = messageRef?.current || {};

	const messagesArray = latestMessagesAtTop
		? [...(messagesData || [])].reverse()
		: messagesData;

	useEffect(() => {
		if (
			!isEmpty(messagesData)
			&& (scrollHeight - scrollTop < SCROLL_WHEN_REQUIRED_HEIGHT * clientHeight)
			&& !latestMessagesAtTop
		) {
			scrollToBottom();
			if (new_message_count) {
				updateUnreadMessagesCount({
					channelType: channel_type,
					id,
					firestore,
				});
			}
		}
	}, [channel_type, clientHeight, firestore, messagesData, id, scrollHeight,
		scrollToBottom, scrollTop, new_message_count, latestMessagesAtTop]);

	if (hasNoFireBaseRoom) {
		return (
			<NewUserOutBound setModalType={setModalType} activeTab={activeTab} />
		);
	}

	return (
		<>
			{!latestMessagesAtTop ? (
				<LoadPrevMessages
					loadingPrevMessages={loadingPrevMessages}
					lastPage={lastPage}
					getNextData={getNextData}
				/>
			) : null}

			{(messagesArray || []).map((eachMessage, index) => {
				const Component = CONVERSATION_TYPE_MAPPING[eachMessage?.conversation_type]
                 || CONVERSATION_TYPE_MAPPING.default;

				const modtifiedEachMessage = {
					...(eachMessage || {}),
					...(channel_type === 'platform_chat'
						? {
							message_status: (!(index >= unreadIndex)) ? 'seen' : 'delivered',
						}
						: {}),
				};

				return (
					<Component
						key={eachMessage?.created_at}
						conversation_type={eachMessage?.conversation_type || 'unknown'}
						eachMessage={modtifiedEachMessage}
						activeMessageCard={activeMessageCard}
						user_name={user_name}
						setRaiseTicketModal={setRaiseTicketModal}
						formattedData={formattedData}
						viewType={viewType}
						hasPermissionToEdit={hasPermissionToEdit}
						mailProps={mailProps}
					/>
				);
			})}

			{(new_message_count && !latestMessagesAtTop
				&& (scrollHeight - scrollTop >= SCROLL_WHEN_REQUIRED_HEIGHT * clientHeight)
			) ? (
				<div
					className={styles.arrow_down_icon}
					role="presentation"
					onClick={() => {
						updateUnreadMessagesCount({ channelType: channel_type, id, firestore });
						scrollToBottom();
					}}
				>
					<div className={styles.new_messages_count}>
						{new_message_count > MAXIMUM_NUMBER_OF_UNREAD_MESSAGES_COUNT
							? `${MAXIMUM_NUMBER_OF_UNREAD_MESSAGES_COUNT}+`
							: new_message_count}
					</div>
					<IcMArrowDoubleDown className={styles.arrowicon} />
				</div>
				) : null}

			{latestMessagesAtTop ? (
				<LoadPrevMessages
					loadingPrevMessages={loadingPrevMessages}
					lastPage={lastPage}
					getNextData={getNextData}
				/>
			) : null}
		</>
	);
}

export default forwardRef(MessagesThread);
