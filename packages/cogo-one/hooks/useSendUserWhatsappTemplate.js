import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const getPayload = ({ template_name, whatsapp_number, country_code, variables }) => ({
	whatsapp_number,
	country_code,
	template_name,
	variables: !isEmpty(variables) ? variables : undefined,
});

function useSendUserWhatsappTemplate({
	callbackfunc = () => {},
}) {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/send_user_whatsapp_template',
			method : 'post',
		},
		{ manual: true },
	);

	const sendUserWhatsappTemplate = async ({ template_name, whatsapp_number, country_code, variables }) => {
		try {
			await trigger({
				data: getPayload({ template_name, whatsapp_number, country_code, variables }),
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
