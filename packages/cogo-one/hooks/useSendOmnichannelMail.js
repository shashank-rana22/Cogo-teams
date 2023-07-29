import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

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
}) => {
	const { actionType = '', data = {} } = mailActions || {};

	const { response } = data || {};

	const {
		message_id = '',
	} = response || {};

	const { conversation_id = '', user_id = '', lead_user_id = '' } = formattedData || {};

	const { ccrecipients = [], bccrecipients = [], subject = '', toUserEmail = [] } = emailState || {};

	const payload = {
		sender      : 'sandeep.nalabolu@cogoport.com',
		toUserEmail,
		ccrecipients,
		bccrecipients,
		subject,
		content     : draftMessage,
		msgId       : message_id,
		attachments : !isEmpty(uploadedFiles) ? uploadedFiles : undefined,
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
			send_to_omnichannel : true,
			conversation_id,
			send_by             : name,
			sender_user_id      : userId,
		},
		sender_user_id  : userId,
		service         : 'user',
		service_id      : userId,
		sender          : payload?.sender,
		cc_emails       : !isEmpty(ccrecipients) ? ccrecipients : undefined,
		bcc_emails      : !isEmpty(bccrecipients) ? ccrecipients : undefined,
		attachment_urls : !isEmpty(uploadedFiles) ? uploadedFiles : undefined,
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
}) => {
	const {
		user: { id, name = '' },
	} = useSelector(({ profile }) => profile);

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_communication',
			method : 'post',
		},
		{ manual: true, autoCancel: false },
	);

	const sendMail = async () => {
		try {
			await trigger({
				data: getCommunicationPayload({
					userId: id,
					formattedData,
					draftMessage,
					uploadedFiles,
					emailState,
					mailActions,
					name,
				}),
			});

			scrollToBottom();
			resetEmailStates();
		} catch (error) {
			console.log('error', error);
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		sendMail, mailLoading: loading,
	};
};
export default useSendOmnichannelMail;
