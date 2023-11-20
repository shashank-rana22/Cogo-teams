import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getPayload = ({
	additional_information = '',
	issue_type = '',
	additionalFields,
	defaultTypeId = '',
	is_critical = false,
	category = '',
	finalUrl = '', id_type = '', service_type = '',
	id = '', serial_id = '', trade_type = '',
	subCatId = null, service = '',
}) => ({
	UserID        : id || undefined,
	PerformedByID : id || undefined,
	Source        : 'admin',
	UserType      : 'ticket_user',
	IsUrgent      : is_critical || undefined,
	Data          : {
		AdditionalFields : { ...additionalFields },
		Category         : category || undefined,
		RequestType      : 'feedback',
		Attachment       : [finalUrl] || [],
		SerialID         : serial_id || undefined,
		TradeType        : trade_type || undefined,
		Service          : service || service_type || undefined,
		IDType           : id_type || undefined,
	},
	TicketCategoryID    : subCatId || undefined,
	Type                : issue_type || undefined,
	TicketDefaultTypeID : defaultTypeId || undefined,
	Description         : additional_information || undefined,
});

const useAddFeedback = ({
	defaultTypeId = '',
	additionalInfo = [],
	getFeedbacks = () => {},
	setShowAddFeedback = () => {},
	subCatId = null,
}) => {
	const { profile } = useSelector((state) => state);

	const [{ loading }, trigger] = useTicketsRequest({
		url     : '/ticket',
		method  : 'post',
		authkey : 'post_tickets_ticket',
	}, { manual: true });

	const addFeedback = async (val) => {
		const {
			issue_type,
			additional_information,
			file_url,
			category,
			is_critical,
			serial_id,
			service,
			trade_type,
			id_type,
			service_type,
		} = val || {};

		const additionalFields = Object.fromEntries(
			Object.entries(val).filter(([key]) => additionalInfo.includes(key)),
		);

		const { finalUrl = '' } = file_url || {};

		try {
			await trigger({
				data: getPayload({
					id: profile?.user?.id,
					additional_information,
					additionalFields,
					defaultTypeId,
					is_critical,
					issue_type,
					category,
					finalUrl,
					subCatId,
					serial_id,
					service,
					trade_type,
					id_type,
					service_type,
				}),
			});

			Toast.success('Feedback successfully added');
			getFeedbacks();
			setShowAddFeedback(false);
		} catch (error) {
			Toast.error(error?.response?.data);
		}
	};

	return {
		addFeedback,
		loading,
	};
};

export default useAddFeedback;
