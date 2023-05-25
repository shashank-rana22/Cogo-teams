import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';

const useUpdateTicketFeedback = ({ refetchTicket = () => {} }) => {
	// const { t } = useTranslation(['common']);
	// const { loading, trigger } = useRequest('put', false, 'cogocare', {
	// 	authKey: 'put_tickets_feedback',
	// })('/feedback');

	const { loading, trigger } = useTicketsRequest({
		url     : '/feedback',
		method  : 'put',
		authkey : 'put_tickets_feedback',
	}, { manual: false });

	const updateTicketFeedback = async (rating = '', ID = '') => {
		try {
			await trigger({
				data: {
					Rating   : rating,
					TicketId : Number(ID),
				},
			});
			refetchTicket();
			Toast.success('Ticket Rating Submitted Successfully!');
		} catch (e) {
			Toast.error(e?.response?.data || 'something went wrong');
		}
	};

	return {
		updateTicketFeedback,
		updateLoading: loading,
	};
};

export default useUpdateTicketFeedback;
