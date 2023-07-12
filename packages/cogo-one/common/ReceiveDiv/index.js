import { cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot, IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

// import MessageBody from '../MessageBody';
import RepliedMessage from '../RepliedMessage';

import OrderDisplay from './OrderDisplay';
import styles from './styles.module.css';
import SuggestedActions from './SuggestedActions';
import UserActivityMessages from './UserActivityMessages';

function TicketPopoverContent({ formattedData, setRaiseTicketModal, data }) {
	const triggerModal = () => {
		setRaiseTicketModal((p) => {
			if (p?.state) {
				return { state: false, data: {}, source: null };
			}
			return { state: true, data: { messageData: data, formattedData }, source: 'message' };
		});
	};
	return (
		<div className={styles.raise_ticket} role="button" tabIndex={0} onClick={triggerModal}>
			Raise a ticket
		</div>
	);
}

function ReceiveDiv({
	eachMessage = {},
	canRaiseTicket = true,
	user_name = '',
	setRaiseTicketModal = () => {},
	formattedData = {},
}) {
	const [showOrder, setShowOrder] = useState(false);
	const {
		message_type = 'text',
		created_at = '',
		response = {},
	} = eachMessage;
	const { reply_metadata = {}, message = '' } = response || {};

	const date = created_at && formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
		formatType : 'dateTime',
		separator  : ' ',
	});

	const hasRepliedMessage = !isEmpty(reply_metadata);

	return (
		<div className={styles.container}>
			<div className={styles.time_stamp}>
				{date || ''}
			</div>
			<div className={cl`${message_type === 'contacts' ? '' : styles.receive_message_container} 
			${hasRepliedMessage ? styles.replied_messages : ''}`}
			>
				{hasRepliedMessage && (
					<RepliedMessage user_name={user_name} reply_metadata={reply_metadata} />
				)}
				{canRaiseTicket && (
					<Tooltip
						placement="right"
						content={(
							<TicketPopoverContent
								setRaiseTicketModal={setRaiseTicketModal}
								data={eachMessage}
								formattedData={formattedData}
							/>
						)}
						interactive
					>
						<div className={styles.flex_div}>
							<IcMOverflowDot className={styles.hamburger_styles} />
						</div>
					</Tooltip>
				)}
				<div className={styles.message_div}>
					{/* <MessageBody
						response={response}
						message_type={message_type}
					/> */}
					<UserActivityMessages />
				</div>
			</div>
			<SuggestedActions />
			{message_type === 'order' && (
				<div
					className={styles.order_container}
				>
					<div
						role="button"
						tabIndex={0}
						className={styles.list_button}
						onClick={() => setShowOrder((p) => !p)}
					>
						{showOrder ? (
							<span className={styles.btn_container}>
								<IcMCross className={styles.btn_icon} />
								Hide
							</span>
						) : (
							<span className={styles.btn_container}>
								<img
									className={styles.btn_icon}
									src={GLOBAL_CONSTANTS.image_url.cart_png}
									alt="order"
								/>
								View Order Items
							</span>
						)}
					</div>
					{showOrder && <OrderDisplay message={message} />}
				</div>
			)}
		</div>
	);
}
export default ReceiveDiv;
