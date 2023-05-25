import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateTicketActivity = ({
	refreshTickets = () => {},
	refetchTicket = () => {},
}) => {
	// const { loading, trigger } = useTicketsRequest('post', false, 'cogocare', {
	// 	authKey: 'post_tickets_activity',
	// })('/activity');

	const { loading, trigger } = useTicketsRequest({
		url     : '/activity',
		method  : 'post',
		authkey : 'post_tickets_activity',
	}, { manual: false });

	const { profile } = useSelector((state) => state);

	const updateTicketActivity = async (Status = '', ID = '') => {
		try {
			const Type = Status?.toLowerCase() === 'resolve' ? 'mark_as_resolved' : 'reopened';

			const StatusChange = Status?.toLowerCase() === 'resolve' ? 'resolved' : 'reopened';

			const res = await trigger({
				data: {
					UserType      : 'ticket_user',
					PerformedByID : profile?.id,
					Type,
					TicketID      : [Number(ID)],
					Status        : StatusChange,
				},
			});
			Toast.success(res?.data || 'Ticket Status Updated Successfully!');
			refreshTickets();
			refetchTicket();
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
