import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useSendCommunicationTemplate({
	formattedData = {},
	setOpenModal = () => {},
}) {
	const {
		mobile_no = '',
		user_name = 'user',
		user_id = null,
		lead_user_id = null,
	} = formattedData || {};

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_communication',
			method : 'post',
		},
		{ manual: true },
	);
	const {
		user: { id },
	} = useSelector(({ profile }) => profile);
	const sendCommunicationTemplate = async (template_name) => {
		try {
			await trigger({
				data: {
					type           : 'whatsapp',
					provider_name  : 'meta',
					service        : 'user',
					service_id     : user_id || lead_user_id,
					template_name,
					recipient      : mobile_no,
					source         : 'CogoOne:AdminPlatform',
					variables      : { user_first_name: user_name.split(' ')[0] },
					sender         : id,
					sender_user_id : id,

				},
			});
			setOpenModal(false);
			Toast.success('Template Sent Successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};
	return {
		sendCommunicationTemplate,
		loading,
	};
}
export default useSendCommunicationTemplate;
