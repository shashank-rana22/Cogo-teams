import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const getPayload = ({
	agentId, priority, finalUrl, selectedServices,
	issueType, additionalInformation, notifyCustomer,
}) => ({
	UserID         : agentId,
	PerformedByID  : agentId,
	Source         : 'admin',
	Priority       : priority,
	Usertype       : 'ticket_user',
	Data           : { Attachment: [finalUrl] || [], ...selectedServices },
	Type           : issueType,
	Description    : additionalInformation,
	NotifyCustomer : notifyCustomer,
});

const useRaiseTicket = ({ setShowRaiseTicket = () => {}, additionalInfo = [] }) => {
	const { agentId = '' } = useSelector(({ profile }) => ({ agentId: profile.user.id }));

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/ticket',
		method  : 'post',
		authkey : 'post_tickets_ticket',
	}, { manual: true });

	const raiseTickets = async (val) => {
		const {
			issue_type: issueType = '',
			additional_information: additionalInformation = '',
			organization_id : organizationId = '',
			user_id: userId = '',
			priority,
			file_url: fileUrl = '',
			notify_customer: notifyCustomer,
			...rest
		} = val || {};
		const { finalUrl = '' } = fileUrl || {};

		let additionalData = {};

		const selectedServices = Object.fromEntries(
			Object.entries(rest).filter(([key]) => additionalInfo.includes(key)),
		);

		if (!isEmpty(organizationId)) {
			additionalData = {
				OrganizationID : organizationId,
				UserID         : userId,
			};
		}

		try {
			await trigger({
				data: getPayload({
					agentId,
					priority,
					finalUrl,
					selectedServices,
					issueType,
					additionalInformation,
					notifyCustomer,
					additionalData,
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
