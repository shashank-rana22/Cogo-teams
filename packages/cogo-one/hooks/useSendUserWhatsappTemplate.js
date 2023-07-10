import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const SUPPLY_SENDER_NUMBER = '918069195980';

function useSendUserWhatsappTemplate({
	callbackfunc = () => {},
	viewType = '',
}) {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/send_user_whatsapp_template',
			method : 'post',
		},
		{ manual: true },
	);

	const sendUserWhatsappTemplate = async (
		{
			template_name,
			whatsapp_number,
			country_code,
		},
	) => {
		try {
			await trigger({
				data: {
					whatsapp_number,
					country_code,
					template_name,
					sender: viewType?.includes('supply') ? SUPPLY_SENDER_NUMBER : undefined,
				},
			});
			callbackfunc();
			Toast.success('Message Sent Sucessfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};
	return {
		sendUserWhatsappTemplate,
		loading,
	};
}

export default useSendUserWhatsappTemplate;
