import { useTicketsRequest } from '@cogoport/request';

const useCreateTicket = () => {
	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/ticket',
		method  : 'post',
		authkey : 'post_tickets_ticket',
	}, { manual: true });

	const createTicket = async () => {
		try {
			await trigger({
				data: {
					UserID : '',
					Source : '',
				},
			});
		} catch (e) {
			console.log('e:', e);
		}
	};
	return {
		createTicket,
		loading,
	};
};
export default useCreateTicket;
