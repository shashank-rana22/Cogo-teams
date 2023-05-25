import TicketComment from './TicketComment';

function InitialMessage({ ticketData, userId }) {
	const { Description, CreatedAt, Data } = ticketData?.Ticket || {};
	const { Attachment: Url, ...restData } = Data || {};
	const { SystemUserID } = ticketData?.TicketUser || {};

	return (
		<TicketComment
			Type="respond"
			CreatedAt={CreatedAt}
			Description={Description}
			Url={Url}
			userId={userId}
			SystemUserID={SystemUserID}
			restData={restData}
		/>
	);
}

export default InitialMessage;
