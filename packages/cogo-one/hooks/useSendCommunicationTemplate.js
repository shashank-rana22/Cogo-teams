import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useSendCommunicationTemplate({ formattedData = {}, setOpenModal = () => {} }) {
	const { mobile_no = '', user_name = 'user' } = formattedData || {};
	const { agentID } = useSelector(({ profile }) => ({
		agentID: profile?.user?.id || {},
	}));
	const [{ loading }, trigger] = useRequest({
		url    : '/create_communniation',
		method : 'post',
	}, { manual: true });

	const sendCommunicationTemplate = async (template_name) => {
		try {
			await trigger({
				data: {
					type          : 'whatsapp',
					provider_name : 'meta',
					service       : 'Campaign',
					service_id    : agentID,
					template_name,
					recipient     : mobile_no,
					source        : 'CogoOne',
					variables     : { user_first_name: user_name.split(' ')[0] },
				},
			});
			setOpenModal(false);
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
