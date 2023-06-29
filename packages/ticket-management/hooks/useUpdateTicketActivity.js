import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { STATUS_TYPE_MAPPING } from '../constants';

const getPayload = ({ profile, status, id }) => ({
	UserType      : 'user',
	PerformedByID : profile?.user?.id,
	TicketID      : [Number(id)],
	...(STATUS_TYPE_MAPPING[status]),
});

const useUpdateTicketActivity = ({
	refreshTicket = () => {},
}) => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/activity',
		method  : 'post',
		authkey : 'post_tickets_activity',
	}, { manual: false });

	const updateTicketActivity = async (status = '', id = '') => {
		try {
			await trigger({
				data: getPayload({ profile, status, id }),
			});

			refreshTicket();
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
