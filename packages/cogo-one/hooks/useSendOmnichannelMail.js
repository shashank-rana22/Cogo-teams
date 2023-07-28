import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const ENDPOINT_MAPPING = {
	forward : 'cogolens/forward_mail',
	reply   : 'cogolens/reply_mail',
};
const getCommunicationPayload = ({
	userId,
	formattedData,
	draftMessage,
	finalUrl,
	emailState,
	mailActions,
}) => {
	const { actionType = '', data = {} } = mailActions || {};

	const { response } = data || {};

	const {
		message_id = '',
	} = response || {};

	const { conversation_id = '', user_id = '', lead_user_id = '' } = formattedData || {};

	const { ccrecipients = [], bccrecipients = [], subject = '', toUserEmail = [] } = emailState || {};

	const payload = {
		sender      : 'sandeep@nalabolu@cogoport.com',
		toUserEmail,
		ccrecipients,
		bccrecipients,
		subject,
		content     : draftMessage,
		msgId       : message_id,
		attachments : [finalUrl],
		userId,

	};

	return {
		type             : 'rpa_email',
		user_id,
		lead_user_id,
		recipient        : payload?.toUserEmail?.[GLOBAL_CONSTANTS.zeroth_index],
		message_metadata : {
			endpoint            : ENDPOINT_MAPPING[actionType] || ENDPOINT_MAPPING.send_mail,
			body                : payload,
			send_to_omnichannel : false,
			conversation_id,
		},
		sender_user_id : userId,
		service        : 'user',
		service_id     : userId,
		sender         : payload?.sender,
	};
};

const useSendOmnichannelMail = ({
	scrollToBottom = () => {},
	formattedData = {},
	emailState = {},
	draftMessage = '',
	finalUrl = '',
	setDraftMessages,
	setDraftUploadedFiles,
	id:roomId,
	mailActions = {},
}) => {
	const {
		user: { id },
	} = useSelector(({ profile }) => profile);

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_communication',
			method : 'post',
		},
		{ manual: true, autoCancel: false },
	);

	const sendMail = async ({ type = '' }) => {
		try {
			await trigger({
				data: getCommunicationPayload({
					userId: id,
					type,
					formattedData,
					draftMessage,
					finalUrl,
					emailState,
					mailActions,
				}),
			});
			console.log('rahul', getCommunicationPayload({
				userId: id,
				type,
				formattedData,
				draftMessage,
				finalUrl,
				emailState,
				mailActions,
			}));

			scrollToBottom();

			setDraftUploadedFiles((prev) => ({ ...prev, [roomId]: undefined }));
			setDraftMessages((prev) => ({ ...prev, [roomId]: undefined }));
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		sendMail, mailLoading: loading,
	};
};
export default useSendOmnichannelMail;
