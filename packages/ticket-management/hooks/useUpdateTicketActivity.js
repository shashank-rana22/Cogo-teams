import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { STATUS_TYPE_MAPPING } from '../constants';

const ACTION_TYPES = ['escalate', 'resolve_request'];

const getPayload = ({ profile, actionType, id, description }) => {
	const escalationPayload = {
		Description: description || undefined,
	};

	return {
		UserType      : 'user',
		PerformedByID : profile?.user?.id,
		TicketID      : [Number(id)],
		...(STATUS_TYPE_MAPPING[actionType]),
		...(ACTION_TYPES.includes(actionType) ? escalationPayload : {}),
	};
};

const useUpdateTicketActivity = ({
	refreshTickets = () => {},
	fetchTickets = () => {},
}) => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/activity',
		method  : 'post',
		authkey : 'post_tickets_activity',
	}, { manual: true });

	const updateTicketActivity = async ({ actionType = '', id = '', description = '' }) => {
		try {
			await trigger({
				data: getPayload({ profile, actionType, id, description }),
			});

			refreshTickets();
			fetchTickets();
			Toast.success('Ticket Status Updated Successfully!');
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
