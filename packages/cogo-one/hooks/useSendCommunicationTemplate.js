import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useSendCommunicationTemplate({ recipient, user_first_name }) {
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
					provider_name : 'meat',
					service       : 'Campaign',
					service_id    : agentID,
					template_name,
					recipient,
					source        : 'cogoverse',
					variables     : { user_first_name },
				},
			});
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
