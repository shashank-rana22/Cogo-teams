import React from 'react';

import TicketComment from './TicketComment';

function InitialMessage({ ticketData, userId }) {
	const {
		Description: description = '',
		CreatedAt: createdAt = '',
		Data: data = {},
		UserID : activityUserId = '',
	} = ticketData?.Ticket || {};
	const { Attachment: mediaUrls = [], ...restData } = data || {};
	const { SystemUserID: systemUserID = '', Name:name = '' } = ticketData?.TicketUser || {};

	return (
		<TicketComment
			type="respond"
			createdAt={createdAt}
			description={description}
			mediaUrls={mediaUrls}
			userId={userId}
			name={name}
			systemUserID={systemUserID}
			restData={restData}
			activityUserId={activityUserId}
		/>
	);
}

export default InitialMessage;
