import React from 'react';

import TicketComment from './TicketComment';

function InitialMessage({ ticketData = {}, userId = '' }) {
	const { AgentName: agentName = '', Ticket: ticket = {}, TicketUser: ticketUser = {} } = ticketData || {};
	const {
		Description: description = '',
		CreatedAt: createdAt = '',
		Data: data = {},
		UserID : activityUserId = '',
	} = ticket || {};
	const { Attachment: mediaUrls = [], ...restData } = data || {};
	const { SystemUserID: systemUserID = '', Name:name = '' } = ticketUser || {};

	return (
		<TicketComment
			type="respond"
			createdAt={createdAt}
			description={description}
			mediaUrls={mediaUrls}
			userId={userId}
			name={name}
			agentName={agentName}
			systemUserID={systemUserID}
			restData={restData}
			activityUserId={activityUserId}
		/>
	);
}

export default InitialMessage;
