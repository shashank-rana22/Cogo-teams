import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

function useSendCommunicationTemplate({
	formattedData = {},
	isOtherChannels = false,
	callbackfunc = () => {},
}) {
	const geo = getGeoConstants();

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
	const sendCommunicationTemplate = async (
		{
			template_name,
			otherChannelRecipient = '',
			variables = {},
			type = '',
			...restArgs
		},
	) => {
		const GET_VARIABLE = {
			email    : variables,
			whatsapp : !isEmpty(variables) ? variables
				: { user_first_name: user_name?.split(' ')[GLOBAL_CONSTANTS.zeroth_index] || 'User' },
		};

		let service = 'user';
		let service_id = geo.uuid.cogoverse_user_id;
		if (user_id) {
			service_id = user_id;
		} else if (!user_id && lead_user_id) {
			service = 'lead_user';
			service_id = lead_user_id;
		}

		try {
			await trigger({
				data: {
					type           : type === 'email' ? 'email' : 'whatsapp',
					provider_name  : type === 'email' ? 'aws' : 'meta',
					service,
					user_id,
					lead_user_id,
					service_id,
					template_name,
					recipient      : isOtherChannels ? otherChannelRecipient : mobile_no,
					source         : 'CogoOne:AdminPlatform',
					variables      : GET_VARIABLE[type],
					sender_user_id : id,
					...(restArgs || {}),

				},
			});
			callbackfunc();
			Toast.success(`${type === 'email' ? 'Email Sent Sucessfully' : 'Message Sent Sucessfully'}`);
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
