import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import { getCommunicationPayload } from '../helpers/communicationPayloadHelpers';

const useSendOmnichannelMail = ({
	scrollToBottom = () => {},
	formattedData = {},
	emailState = {},
	draftMessage = '',
	uploadedFiles = [],
	mailActions = {}, // remove
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
