import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { STATUS_TYPE_MAPPING } from '../constants';

const getPayload = ({ profile, actionType, id, file, description }) => {
	const escalationPayload = {
		Description : description || undefined,
		Data        : { Url: [file] },
	};

	return {
		UserType      : 'user',
		PerformedByID : profile?.user?.id,
		TicketID      : [Number(id)],
		...(STATUS_TYPE_MAPPING[actionType]),
		...(actionType === 'escalate' ? escalationPayload : {}),
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

	const updateTicketActivity = async ({ actionType = '', id = '', file = '', description = '' }) => {
		try {
			await trigger({
				data: getPayload({ profile, actionType, id, file, description }),
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
