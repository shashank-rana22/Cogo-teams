import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';

const useCreateTicket = ({ closeModal = () => {}, refetchTickets = () => {} }) => {
	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/ticket',
		method  : 'post',
		authkey : 'post_tickets_ticket',
	}, { manual: true });

	const createTicket = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			closeModal();
			Toast.success('Ticket Created Sucessfully');
			refetchTickets();
		} catch (e) {
			Toast.error(e.response.data || 'something went wrong');
		}
	};
	return {
		createTicket,
		loading,
	};
};
export default useCreateTicket;
