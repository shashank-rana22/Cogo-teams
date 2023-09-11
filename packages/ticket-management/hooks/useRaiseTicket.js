import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const getPayload = ({
	id, priority, finalUrl, selectedServices, issue_type, additional_information,
	notify_customer, additionalData, request_type, category, serial_id, sub_category,
}) => ({
	UserID         : id || undefined,
	PerformedByID  : id || undefined,
	Source         : 'admin',
	Category       : category || undefined,
	Priority       : priority || undefined,
	UserType       : 'ticket_user',
	Data           : { Attachment: [finalUrl] || [], ...selectedServices },
	Type           : issue_type || undefined,
	RequestType    : request_type || undefined,
	Description    : additional_information || undefined,
	NotifyCustomer : notify_customer || undefined,
	SerialID       : serial_id,
	Subcategory    : sub_category || undefined,
	...additionalData,
});

const useRaiseTicket = ({ handleClose = () => {}, additionalInfo = [], setRefreshList = () => {} }) => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/ticket',
		method  : 'post',
		authkey : 'post_tickets_ticket',
	}, { manual: true });

	const raiseTickets = async (val) => {
		const {
			request_type,
			issue_type,
			additional_information,
			organization_id,
			user_id,
			priority,
			file_url,
			serial_id,
			notify_customer,
			category,
			sub_category,
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
					additional_information,
					selectedServices,
					notify_customer,
					additionalData,
					request_type,
					issue_type,
					serial_id,
					finalUrl,
					category,
					priority,
					sub_category,
				}),
			});
			Toast.success('Successfully Created');
			setRefreshList((prev) => ({
				...prev,
				Open      : false,
				Pending   : false,
				Escalated : false,
				Closed    : false,
			}));

			handleClose();
		} catch (error) {
			Toast.error(error?.response?.data);
		}
	};

	return { raiseTickets, loading };
};

export default useRaiseTicket;
