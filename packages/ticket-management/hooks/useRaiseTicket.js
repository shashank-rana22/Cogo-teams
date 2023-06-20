import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const getPayload = ({
	id, priority, finalUrl, selectedServices, issue_type, additional_information,
	ADDITIONAL_DATA,
}) => ({
	UserID      : id,
	Source      : 'admin',
	Category    : '',
	Subcategory : '',
	Priority    : priority,
	Usertype    : 'ticket_user',
	Data        : { Attachment: [finalUrl] || [], ...selectedServices },
	Type        : issue_type,
	Description : additional_information,
	...ADDITIONAL_DATA,
});

const useRaiseTicket = ({ setShowRaiseTicket, additionalInfo }) => {
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
			file_url: { finalUrl },
			...rest
		} = val || {};

		const ADDITIONAL_DATA = {};

		const selectedServices = Object.fromEntries(
			Object.entries(rest).filter(([key]) => additionalInfo.includes(key)),
		);

		if (!isEmpty(organization_id)) {
			ADDITIONAL_DATA.OrganizationID = organization_id;
			ADDITIONAL_DATA.UserID = user_id;
		}

		try {
			await trigger({
				data: getPayload({
					id: profile?.id,
					priority,
					finalUrl,
					selectedServices,
					issue_type,
					additional_information,
					ADDITIONAL_DATA,
				}),
			});
			Toast.success('Successfully Created');
			setShowRaiseTicket(false);
		} catch (error) {
			Toast.error(error?.response?.data);
		}
	};

	return { raiseTickets, loading };
};

export default useRaiseTicket;
