import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const useRaiseTicket = ({ setShowRaiseTicket }) => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/ticket', // default_types
		method  : 'post', // get
		authkey : 'post_tickets_ticket', // get_tickets_default_types
	}, { manual: true });

	// payload: Qfilter

	const raiseTickets = async (val) => {
		const {
			issue_type,
			additional_information,
			file_url,
			priority,
		} = val || {};

		let additionalData = {};

		const urlData = (file_url || []).map((item) => item?.url);

		if (!isEmpty(val.organization_id)) {
			additionalData = {
				OrganizationID : val.organization_id,
				UserID         : val.user_id,
			};
		}

		try {
			await trigger({
				data: {
					UserID      : profile?.id,
					Source      : 'admin',
					Category    : '',
					Subcategory : '',
					Priority    : priority,
					Usertype    : 'ticket_user',
					Data        : { Attachment: urlData || [] },
					Type        : issue_type,
					Description : additional_information,
					...additionalData,
				},
			});
			// listTicketApi();
			Toast.success('Successfully Created');
			setShowRaiseTicket(false);
		} catch (error) {
			Toast.error(error?.error);
		}
	};

	return { raiseTickets, loading };
};

export default useRaiseTicket;
