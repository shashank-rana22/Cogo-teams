import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import getRenderEmailBody from './getRenderEmailBody';

const ENDPOINT_MAPPING = {
	forward   : '/forward_mail',
	reply     : '/reply_mail',
	reply_all : '/reply_all',
};

export const getCommunicationPayload = ({
	userId = '',
	formattedData = {},
	draftMessage = '',
	uploadedFiles = [],
	emailState = {},
	mailActions = {},
	name = '',
	source = '',
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
		content     : getRenderEmailBody({ html: draftMessage }),
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
		bcc_emails      : isEmpty(bccrecipients) ? undefined : bccrecipients,
		attachment_urls : isEmpty(uploadedFiles) ? undefined : uploadedFiles,
		source          : '',
	};
};
