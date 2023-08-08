import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';

const ENDPOINT_MAPPING = {
	forward : '/cogolens/forward_mail',
	reply   : '/cogolens/reply_mail',
};

const getCommunicationPayload = ({
	userId,
	formattedData,
	draftMessage,
	uploadedFiles,
	emailState,
	mailActions,
	name,
	source,
}) => {
	const { actionType = '', data = {} } = mailActions || {};

	const { response } = data || {};

	const {
		message_id = '',
	} = response || {};

	const { conversation_id = '', user_id = '', lead_user_id = '' } = formattedData || {};

	const { ccrecipients = [], bccrecipients = [], subject = '', toUserEmail = [] } = emailState || {};

	const payload = {
		sender      : source,
		toUserEmail,
		ccrecipients,
		bccrecipients,
		subject,
		content     : draftMessage,
		msgId       : message_id,
		userId,
		attachments : isEmpty(uploadedFiles) ? undefined : uploadedFiles,
	};

	return {
		type             : 'rpa_email',
		user_id,
		lead_user_id,
		recipient        : payload?.toUserEmail?.[GLOBAL_CONSTANTS.zeroth_index],
		message_metadata : {
			endpoint            : ENDPOINT_MAPPING[actionType] || ENDPOINT_MAPPING.send_mail,
			body                : payload,
			send_to_omnichannel : true,
			conversation_id,
			send_by             : name,
			sender_user_id      : userId,
		},
		sender_user_id  : userId,
		service         : 'user',
		service_id      : userId,
		sender          : payload?.sender,
		cc_emails       : isEmpty(ccrecipients) ? undefined : ccrecipients,
		bcc_emails      : isEmpty(bccrecipients) ? undefined : ccrecipients,
		attachment_urls : isEmpty(uploadedFiles) ? undefined : uploadedFiles,
	};
};

const useSendOmnichannelMail = ({
	scrollToBottom = () => {},
	formattedData = {},
	emailState = {},
	draftMessage = '',
	uploadedFiles = [],
	mailActions = {},
	resetEmailStates = () => {},
	source = '',
}) => {
	const {
		user: { id: userId, name = '' },
	} = useSelector(({ profile }) => profile);

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_communication',
			method : 'post',
		},
		{ manual: true, autoCancel: false },
	);

	const { actionType = '' } = mailActions || {};

	const sendMail = async () => {
		try {
			await trigger({
				data: getCommunicationPayload({
					userId,
					formattedData,
					draftMessage,
					uploadedFiles,
					emailState,
					mailActions,
					name,
					source,
				}),
			});
			Toast.success(`${startCase(actionType)} mail sent successfully`);

			scrollToBottom();
			resetEmailStates();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		sendMail, mailLoading: loading,
	};
};

export default useSendOmnichannelMail;
