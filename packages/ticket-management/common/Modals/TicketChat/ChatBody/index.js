import { Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import React from 'react';

import EmptyTicket from '../../../EmptyTicket';

import InitialMessage from './initialMessage';
import styles from './styles.module.css';
import TicketComment from './TicketComment';

const RENDER_EMPTY_ELEMENT = 9;
const SKELETON_SECOND_ELEMENT = 2;
const TICKETS_ARRAY_LENGTH = 10;
const WINDOW_VIEW_ASPECT = 0;
const INCREMENT_PAGE_COUNT = 1;

function ChatBody({
	listData = {},
	chatLoading = false,
	getTicketActivity = () => {},
	messageRef = {},
	ticketData = {},
	doesTicketsExists = false,
	modalData = {},
	detailsLoading = false,
}) {
	const { user: { id: userId = '', name: currentAgentName = '' } } = useSelector(({ profile }) => profile);
	const { items = [], last, page } = listData;
	const { TicketReviewer: ticketReviewer = {} } = ticketData || {};
	const { User: user = {} } = ticketReviewer || {};
	const { Name: reviewerName = '' } = user || {};

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop === WINDOW_VIEW_ASPECT;
		if (!last && bottom && !chatLoading) {
			getTicketActivity((page || GLOBAL_CONSTANTS.zeroth_index) + INCREMENT_PAGE_COUNT);
		}
	};

	if (!doesTicketsExists && !chatLoading) {
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
				&& [...Array(RENDER_EMPTY_ELEMENT).keys()].map((key, idx) => (
					<div
						key={key}
						className={cl`${idx % SKELETON_SECOND_ELEMENT
							!== GLOBAL_CONSTANTS.zeroth_index ? styles.right_align : ''}`}
					>
						<Placeholder className={styles.loading_skeleton} />
					</div>
				))}

			{(last || (items || []).length < TICKETS_ARRAY_LENGTH) && !detailsLoading && (
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
					TicketFeedback: ticketFeedback = {},
					IsInternal: isInternal,
				} = itm || {};

				const { Url: mediaUrls = [], TicketType: ticketType = '', User: reviewer = {} } = data || {};
				const { SystemUserID: systemUserID = '', Name: name = '' } = ticketUser || {};
				const { Name: oldReviewerName = '' } = reviewer || {};
				const { Rating: rating } = ticketFeedback || {};

				return (
					<TicketComment
						key={createdAt}
						type={type}
						createdAt={createdAt}
						description={description}
						mediaUrls={mediaUrls}
						userId={userId}
						name={name}
						rating={rating}
						userType={userType}
						currentAgentName={currentAgentName}
						activityUserId={activityUserId}
						oldReviewerName={oldReviewerName}
						reviewerName={reviewerName}
						systemUserID={systemUserID}
						ticketType={ticketType}
						isInternal={isInternal}
					/>
				);
			})}
		</div>
	);
}

export default ChatBody;
