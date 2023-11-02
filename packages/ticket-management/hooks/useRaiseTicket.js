import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const getPayload = ({
	id, priority, finalUrl, selectedServices, issue_type, additional_information,
	notify_customer, additionalData, request_type, category, serial_id, sub_category,
	service, trade_type, raised_by_desk, raised_to_desk, isOperation, defaultTypeId,
	id_type, service_type, platform_category,
}) => ({
	UserID        : id || undefined,
	PerformedByID : id || undefined,
	Source        : 'admin',
	Category      : category || platform_category || undefined,
	Priority      : priority || undefined,
	UserType      : 'ticket_user',
	Data          : {
		Attachment  : [finalUrl] || [],
		...selectedServices,
		RequestType : request_type || undefined,
		SerialID    : serial_id || undefined,
		TradeType   : trade_type || undefined,
		Service     : service || service_type || undefined,
		IDType      : id_type || undefined,
	},
	Type                : issue_type || undefined,
	TicketDefaultTypeID : defaultTypeId || undefined,
	Description         : additional_information || undefined,
	NotifyCustomer      : notify_customer || undefined,
	Subcategory         : sub_category || undefined,
	RaisedByDesk        : raised_by_desk || undefined,
	RaisedToDesk        : raised_to_desk || undefined,
	CategoryDeskType    : isOperation ? 'by_desk' : 'by_category',
	...additionalData,
});

const useRaiseTicket = ({
	handleClose = () => {},
	additionalInfo = [],
	setRefreshList = () => {},
	reset = () => {},
	defaultTypeId = '',
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
			service,
			trade_type,
			category,
			sub_category,
			raised_by_desk,
			raised_to_desk,
			id_type,
			service_type,
			platform_category,
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
					service,
					trade_type,
					category,
					priority,
					defaultTypeId,
					sub_category,
					raised_by_desk,
					raised_to_desk,
					isOperation,
					id_type,
					service_type,
					platform_category,
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
			reset();
			handleClose();
		} catch (error) {
			Toast.error(error?.response?.data);
		}
	};

	return { raiseTickets, loading };
};

export default useRaiseTicket;
