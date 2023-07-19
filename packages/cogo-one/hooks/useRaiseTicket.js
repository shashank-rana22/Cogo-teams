import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const getPayload = ({
	id, priority, finalUrl, selectedServices, issue_type, additional_information,
	notify_customer,
}) => ({
	UserID         : id,
	PerformedByID  : id,
	Source         : 'admin',
	Priority       : priority,
	Usertype       : 'ticket_user',
	Data           : { Attachment: [finalUrl] || [], ...selectedServices },
	Type           : issue_type,
	Description    : additional_information,
	NotifyCustomer : notify_customer,
});

const useRaiseTicket = ({ setShowRaiseTicket = () => {}, additionalInfo = [] }) => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/ticket',
		method  : 'post',
		authkey : 'post_tickets_ticket',
	}, { manual: true });

	const raiseTickets = async (val) => {
		const {
			issue_type,
			additional_information,
			organization_id,
			user_id,
			priority,
			file_url,
			notify_customer,
			...rest
		} = val || {};
		const { finalUrl = '' } = file_url || {};

		let additionalData = {};

		const selectedServices = Object.fromEntries(
			Object.entries(rest).filter(([key]) => additionalInfo.includes(key)),
		);

		if (!isEmpty(organization_id)) {
			additionalData = {
				OrganizationID : organization_id,
				UserID         : user_id,
			};
		}

		try {
			await trigger({
				data: getPayload({
					id: profile?.user?.id,
					priority,
					finalUrl,
					selectedServices,
					issue_type,
					additional_information,
					notify_customer,
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
