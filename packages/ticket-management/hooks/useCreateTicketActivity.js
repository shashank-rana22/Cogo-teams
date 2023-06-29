import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

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
		const payload = {
			Description : message,
			Type        : 'respond',
			TicketID    : [Number(ticketId)],
			Status      : 'activity',
			Data        : { Url: [file] || [] },
		};

		try {
			await trigger({
				data: {
					...payload,
					UserType      : 'user',
					PerformedByID : profile?.user?.id,
				},
			});

			refreshTickets();
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
