import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';

const useUpdateTicketFeedback = ({ refetchTicket = () => {} }) => {
	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/feedback',
		method  : 'put',
		authkey : 'put_tickets_feedback',
	}, { manual: false });

	const updateTicketFeedback = async (rating = '', id = '') => {
		try {
			await trigger({
				data: {
					Rating   : rating,
					TicketId : Number(id),
				},
			});
			refetchTicket();
			Toast.success('Ticket Rating Submitted Successfully!');
		} catch (e) {
			Toast.error(e?.error || 'something went wrong');
		}
	};

	return {
		updateTicketFeedback,
		updateLoading: loading,
	};
};

export default useUpdateTicketFeedback;
