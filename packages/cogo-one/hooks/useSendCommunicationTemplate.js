import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useSendCommunicationTemplate({ formattedData = {}, setOpenModal = () => {} }) {
	const { mobile_no = '', user_name = 'user', lead_user_id = null, user_id = null } = formattedData || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/create_communication',
		method : 'post',
	}, { manual: true });

	const sendCommunicationTemplate = async (template_name) => {
		let service = 'user';
		if (!user_id && lead_user_id) {
			service = 'lead_user';
		}
		let service_id;
		if (user_id) {
			service_id = user_id;
		} else if (!user_id && lead_user_id) {
			service_id = lead_user_id;
		}
		try {
			await trigger({
				data: {
					type          : 'whatsapp',
					provider_name : 'meta',
					service,
					service_id,
					template_name,
					recipient     : mobile_no,
					source        : 'CogoOne:AdminPlatform',
					variables     : { user_first_name: user_name.split(' ')[0] },
				},
			});
			setOpenModal(false);
			Toast.success('Send Successfully');
		} catch (error) {
			Toast.error(error);
		}
	};
	return {
		sendCommunicationTemplate,
		loading,
	};
}
export default useSendCommunicationTemplate;
