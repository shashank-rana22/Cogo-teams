import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateTicketActivity = ({
	refreshTickets = () => {},
}) => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/activity',
		method  : 'post',
		authkey : 'post_tickets_activity',
	}, { manual: false });

	const updateTicketActivity = async (status = '', id = '') => {
		try {
			const isReslove = status?.toLowerCase() === 'resolve';

			const res = await trigger({
				data: {
					UserType      : 'ticket_user',
					PerformedByID : profile?.user?.id,
					Type          : isReslove ? 'mark_as_resolved' : 'reopened',
					TicketID      : [Number(id)],
					Status        : isReslove ? 'resolved' : 'reopened',
				},
			});
			Toast.success(res?.data || 'Ticket Status Updated Successfully!');
			refreshTickets();
		} catch (e) {
			Toast.error(e?.response?.data || 'something went wrong');
		}
	};

	return {
		updateTicketActivity,
		updateLoading: loading,
	};
};

export default useUpdateTicketActivity;
