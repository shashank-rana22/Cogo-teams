import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getPayload = ({ profile, message, ticketId, file }) => ({
	UserType      : 'user',
	PerformedByID : profile?.user?.id,
	Description   : message,
	Type          : 'respond',
	TicketID      : [Number(ticketId)],
	Status        : 'activity',
	Data          : { Url: [file] || [] },
});

const useCreateTicketActivity = ({
	ticketId,
	refreshTickets,
	scrollToBottom,
}) => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/activity',
		method  : 'post',
		authkey : 'post_tickets_activity',
	}, { manual: true });

	const createTicketActivity = async ({ file, message }) => {
		try {
			await trigger({
				data: getPayload({ profile, message, ticketId, file }),
			});

			refreshTickets();
			scrollToBottom();
		} catch (error) {
			console.error(error?.error);
		}
	};

	return {
		createTicketActivity,
		createLoading: loading,
	};
};

export default useCreateTicketActivity;
