import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const DEFAULT_ACTIVITY_PAGE = 0;

const getPayload = ({ profile, ticketId, val, additionalData }) => ({
	PerformedByID : profile?.user?.id,
	TicketID      : Number(ticketId),
	Description   : val?.comment,
	...additionalData,
});

const useReassignTicket = ({
	ticketId,
	setListData = () => {},
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

		const ADDITIONAL_DATA_MAPPING = {
			'partner-roles' : { RoleID: id },
			'partner-users' : { RoleID: role_ids?.[GLOBAL_CONSTANTS.zeroth_index], ReviewerUserID: user_id },
		};

		const additionalData = ADDITIONAL_DATA_MAPPING[type] || { StakeholderType: type };

		try {
			await trigger({ data: getPayload({ profile, ticketId, val, additionalData }) });
			setListData({
				items       : [],
				page        : 0,
				total_pages : 0,
			});
			getTicketActivity(DEFAULT_ACTIVITY_PAGE);
			getTicketDetails(ticketId);
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
