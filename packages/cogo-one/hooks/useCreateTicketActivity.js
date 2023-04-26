import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateTicketActivity = ({ refetchTickets = () => {} }) => {
	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/activity',
		method  : 'post',
		authkey : 'post_tickets_actvity',
	});
	const { user_id = '' } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));
	const createTicketActivity = async (payload = {}) => {
		try {
			const res = await trigger({
				data: {
					...payload,
					UserType      : 'user',
					PerformedByID : user_id,
				},
			});
			Toast.success(res?.data);
			refetchTickets();
		} catch (e) {
			Toast.error(e.response.data || 'something went wrong');
		}
	};

	return {
		createTicketActivity,
		loading,
	};
};
export default useCreateTicketActivity;
