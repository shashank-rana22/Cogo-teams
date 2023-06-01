import { Placeholder, cl } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React from 'react';

import EmptyTicket from '../../../EmptyTicket';

import InitialMessage from './initialMessage';
import styles from './styles.module.css';
import TicketComment from './TicketComment';

function ChatBody({
	listData = {},
	chatLoading = false,
	getTicketActivity = () => {},
	messageRef = {},
	ticketData = {},
	ticketExists = false,
	modalData = {},
	detailsLoading = false,
}) {
	const { user: { id: userId = '', name: currentAgentName = '' } } = useSelector(({ profile }) => profile);
	const { items = [], last, page } = listData;
	const { TicketReviewer: ticketReviewer = {} } = ticketData || {};
	const { User: user = {} } = ticketReviewer || {};
	const { Name: reviewerName = '' } = user || {};

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop === 0;
		if (!last && bottom && !chatLoading) {
			getTicketActivity((page || 0) + 1);
		}
	};

	if (!ticketExists && !chatLoading) {
		const emptyText = `No records for ticket #${
			modalData?.ticketId
		} found`;

		return (
			<EmptyTicket emptyText={emptyText} />
		);
	}

	return (
		<div className={styles.container} ref={messageRef} onScroll={handleScroll}>
			{chatLoading
				&& [...Array(9).keys()].map((key, idx) => (
					<div
						key={key}
						className={cl`${idx % 2 !== 0 ? styles.right_align : ''}`}
					>
						<Placeholder className={styles.loading_skeleton} />
					</div>
				))}

			{(last || (items || []).length < 10) && !detailsLoading && (
				<InitialMessage ticketData={ticketData} userId={userId} />
			)}

			{[...(items || [])].reverse().map((itm = {}) => {
				const {
					Type: type = '',
					Description: description = '',
					CreatedAt: createdAt = '',
					TicketUser: ticketUser = {},
					Data: data = {},
					UserID : activityUserId = '',
					UserType : userType,
				} = itm || {};

				const { Url: mediaUrls = [], TicketType: ticketType = '', User: reviewer = {} } = data || {};
				const { SystemUserID: systemUserID = '', Name: name = '' } = ticketUser || {};
				const { Name: oldReviewerName = '' } = reviewer || {};

				return (
					<TicketComment
						key={createdAt}
						type={type}
						createdAt={createdAt}
						description={description}
						mediaUrls={mediaUrls}
						userId={userId}
						name={name}
						userType={userType}
						currentAgentName={currentAgentName}
						activityUserId={activityUserId}
						oldReviewerName={oldReviewerName}
						reviewerName={reviewerName}
						systemUserID={systemUserID}
						ticketType={ticketType}
					/>
				);
			})}
		</div>
	);
}

export default ChatBody;
