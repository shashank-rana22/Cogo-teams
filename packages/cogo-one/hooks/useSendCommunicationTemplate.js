import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const getPayload = ({
	otherChannelRecipient, id, variables, formattedData,
	isOtherChannels, type, template_name, ...restArgs
}) => {
	const geo = getGeoConstants();

	const {
		mobile_no = '',
		user_name = 'user',
		user_id = null,
		lead_user_id = null,
	} = formattedData || {};

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

	return {
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
	};
};

function useSendCommunicationTemplate({
	formattedData = {},
	isOtherChannels = false,
	callbackfunc = () => { },
}) {
	const {
		user: { id },
	} = useSelector(({ profile }) => profile);

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_communication',
			method : 'post',
		},
		{ manual: true },
	);

	const sendCommunicationTemplate = async (
		{
			template_name,
			otherChannelRecipient = '',
			variables = {},
			type = '',
			...restArgs
		},
	) => {
		try {
			await trigger({
				data: getPayload({
					otherChannelRecipient,
					id,
					variables,
					formattedData,
					isOtherChannels,
					type,
					template_name,
					...(restArgs || {}),
				}),
			});

			callbackfunc();
			Toast.success(`${type === 'email' ? 'Email' : 'Message'} Sent Sucessfully`);
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
