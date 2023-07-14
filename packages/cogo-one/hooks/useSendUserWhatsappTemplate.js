import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';

const getPayload = ({
	whatsapp_number,
	country_code,
	template_name,
	viewType,
	supplySenderNumber,
}) => ({
	whatsapp_number,
	country_code,
	template_name,
	sender: viewType?.includes('supply') ? supplySenderNumber : undefined,
});

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
	const geoConstants = getGeoConstants();

	const sendUserWhatsappTemplate = async (
		{
			template_name,
			whatsapp_number,
			country_code,
		},
	) => {
		try {
			await trigger({
				data: getPayload({
					whatsapp_number,
					country_code,
					template_name,
					viewType,
					supplySenderNumber: geoConstants.others.navigations.cogo_one.supply_sender_mobile_number,
				}),
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
