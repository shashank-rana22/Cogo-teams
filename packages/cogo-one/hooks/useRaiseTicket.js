import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getPayload = ({
	agentId = '', val = {}, additionalInfo = [],
}) => {
	const {
		issue_type: issueType = '',
		additional_information: additionalInformation = '',
		priority = '',
		file_url: fileUrl = '',
		notify_customer: notifyCustomer = false,
		organization_id: OrganizationID = '',
		user_id: UserID = '',
		...rest
	} = val || {};

	const { finalUrl = '' } = fileUrl || {};

	const selectedServices = Object.fromEntries(
		Object.entries(rest).filter(([key]) => additionalInfo.includes(key)),
	);

	return {
		PerformedByID  : agentId,
		Source         : 'admin',
		Priority       : priority,
		UserType       : 'ticket_user',
		Data           : { Attachment: [finalUrl] || [], ...selectedServices },
		Type           : issueType,
		Description    : additionalInformation,
		NotifyCustomer : notifyCustomer,
		OrganizationID,
		UserID,
	};
};

const useRaiseTicket = ({ setShowRaiseTicket = () => {}, additionalInfo = [] }) => {
	const { agentId = '' } = useSelector(({ profile }) => ({ agentId: profile.user.id }));

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/ticket',
		method  : 'post',
		authkey : 'post_tickets_ticket',
	}, { manual: true });

	const raiseTickets = async (val) => {
		try {
			await trigger({
				data: getPayload({
					agentId,
					val,
					additionalInfo,
				}),
			});
			Toast.success('Successfully Created');
			setShowRaiseTicket(false);
		} catch (error) {
			console.error(error?.response?.data);
		}
	};

	return { raiseTickets, loading };
};

export default useRaiseTicket;
