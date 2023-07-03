import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getPayload = ({ profile, ticketId, val, additionalData }) => ({
	PerformedByID : profile?.user?.id,
	TicketID      : Number(ticketId),
	Description   : val?.comment,
	...additionalData,
});

const useReassignTicket = ({
	ticketId,
	getTicketActivity = () => {},
	getTicketDetails = () => {},
}) => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/reassign_reviewer',
		method  : 'post',
		authkey : 'post_tickets_reassign_reviewer',
	}, { manual: true });

	const reassignTicket = async ({ val, type = '', userData = {} }) => {
		const { id = '', user_id = '', role_ids = [] } = userData || {};

		let additionalData = {};

		if (type === 'partner-roles') {
			additionalData = { RoleID: id };
		} else if (type === 'partner-users') {
			additionalData = { RoleID: role_ids?.[GLOBAL_CONSTANTS.zeroth_index], ReviewerUserID: user_id };
		} else {
			additionalData = { StakeholderType: type };
		}

		try {
			await trigger({ data: getPayload({ profile, ticketId, val, additionalData }) });

			getTicketActivity();
			getTicketDetails();
			Toast.success('Assigned Successfully.');
		} catch (error) {
			console.error(error?.error);
		}
	};
	return {
		reassignTicket,
		reassignLoading: loading,
	};
};
export default useReassignTicket;
