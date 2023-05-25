import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateTicketActivity = ({
	ticketId,
	refetchTicket,
	scrollToBottom,
}) => {
	const { profile } = useSelector((state) => state);

	// const { trigger, loading } = useTicketsRequest('post', false, 'cogocare', {
	// 	authkey: 'post_tickets_activity',
	// })('/activity');
	const { trigger, loading } = useTicketsRequest({
		url     : '/activity',
		method  : 'post',
		authkey : 'post_tickets_activity',
	}, { manual: false });

	const createTicketActivity = async ({ file, message }) => {
		const payload = {
			Description : message,
			Type        : 'respond',
			TicketID    : [Number(ticketId)],
			Status      : 'activity',
			Data        : { Url: [file] || [] },
			DisplayAll  : true,
		};

		try {
			await trigger({
				data: {
					...payload,
					UserType      : 'ticket_user',
					PerformedByID : profile?.id,
				},
			});

			refetchTicket();
			scrollToBottom();
		} catch (error) {
			Toast.error(error?.error);
		}
	};

	return {
		createTicketActivity,
		createLoading: loading,
	};
};

export default useCreateTicketActivity;
