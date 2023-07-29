import { Button, cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot, IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import MessageBody from '../MessageBody';
import RepliedMessage from '../RepliedMessage';

import OrderDisplay from './OrderDisplay';
import styles from './styles.module.css';
import SuggestedActions from './SuggestedActions';

function TicketPopoverContent({ formattedData = {}, setRaiseTicketModal = () => {}, data = {} }) {
	const triggerModal = () => {
		setRaiseTicketModal((previous) => {
			if (previous?.state) {
				return { state: false, data: {}, source: null };
			}
			return { state: true, data: { messageData: data, formattedData }, source: 'message' };
		});
	};
	return (
		<Button size="md" themeType="secondary" onClick={triggerModal}>
			Raise a ticket
		</Button>
	);
}

function ReceiveDiv({
	eachMessage = {},
	canRaiseTicket = true,
	user_name = '',
	setRaiseTicketModal = () => {},
	formattedData = {},
	viewType = '',
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
					<MessageBody
						response={response}
						message_type={message_type}
						eachMessage={eachMessage}
						formattedData={formattedData}
					/>
				</div>
			</div>

			{message_type === 'event' && (
				<SuggestedActions formattedData={formattedData} viewType={viewType} />
			)}

			{message_type === 'order' && (
				<div
					className={styles.order_container}
				>
					<div
						role="presentation"
						className={styles.list_button}
						onClick={() => setShowOrder((previous) => !previous)}
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
