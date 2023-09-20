import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getPayload = ({
	additional_information,
	issue_type,
	category,
	finalUrl,
	id,
}) => ({
	UserID        : id || undefined,
	PerformedByID : id || undefined,
	Source        : 'admin',
	Category      : category || undefined,
	UserType      : 'ticket_user',
	Data          : {
		RequestType : 'feedback',
		Attachment  : [finalUrl] || [],
	},
	Type        : issue_type || undefined,
	Description : additional_information || undefined,
});

const useAddFeedback = () => {
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
		} = val || {};

		const { finalUrl = '' } = file_url || {};

		try {
			await trigger({
				data: getPayload({
					id: profile?.user?.id,
					additional_information,
					issue_type,
					category,
					finalUrl,
				}),
			});

			Toast.success('Feedback successfully added');
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
