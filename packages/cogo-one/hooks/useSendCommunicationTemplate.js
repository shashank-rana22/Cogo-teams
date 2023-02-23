import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useSendCommunicationTemplate({ formattedData = {}, setOpenModal = () => {} }) {
	const { mobile_no = '', user_name = 'user' } = formattedData || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/create_communication',
		method : 'post',
	}, { manual: true });
	const {
		user:{ id },

	} = useSelector(({ profile }) => profile);
	const sendCommunicationTemplate = async (template_name) => {
		try {
			await trigger({
				data: {
					type          : 'whatsapp',
					provider_name : 'meta',
					service       : 'user',
					service_id    : id,
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
