import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getPayload = ({
	id, finalUrl, selectedServices, issue_type, additional_information, request_type, serial_id,
	service, trade_type, raised_by_desk, raised_to_desk, isOperation,
}) => ({
	UserID        : id || undefined,
	PerformedByID : id || undefined,
	Source        : 'admin',
	// Category      : category || undefined,
	// Priority      : priority || undefined,
	UserType      : 'ticket_user',
	Data          : {
		Attachment  : [finalUrl] || [],
		...selectedServices,
		RequestType : request_type || undefined,
		SerialID    : serial_id || undefined,
		TradeType   : trade_type || undefined,
		Service     : service || undefined,
	},
	Type             : issue_type || undefined,
	Description      : additional_information || undefined,
	RaisedByDesk     : raised_by_desk || undefined,
	RaisedToDesk     : raised_to_desk || undefined,
	CategoryDeskType : isOperation ? 'by_desk' : 'by_category',
});

const useRaiseTicket = ({
	handleClose = () => {},
}) => {
	const { profile } = useSelector((state) => state);
	const { auth_role_data = {} } = profile || {};
	const { role_functions: roleFunctions = [] } = auth_role_data || {};

	const isOperation = roleFunctions?.includes('operations');

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/ticket',
		method  : 'post',
		authkey : 'post_tickets_ticket',
	}, { manual: true });

	const raiseTickets = async (val) => {
		console.log(val, 'val');
		const {
			request_type,
			issue_type,
			file_url,
			serial_id,
			service,
			trade_type,
			raised_by_desk,
			raised_to_desk,

		} = val || {};
		const { finalUrl = '' } = file_url || {};

		try {
			await trigger({
				data: getPayload({
					id: profile?.user?.id,
					request_type,
					issue_type,
					serial_id,
					finalUrl,
					service,
					trade_type,
					raised_by_desk,
					raised_to_desk,
					isOperation,
				}),
			});

			Toast.success('Successfully Created');

			handleClose();
		} catch (error) {
			Toast.error(error?.response?.data);
		}
	};

	return { raiseTickets, loading };
};

export default useRaiseTicket;
