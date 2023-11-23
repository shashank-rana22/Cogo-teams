import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import { DEFAULT_EMAIL_STATE } from '../constants/mailConstants';
import { getCommunicationPayload, ENDPOINT_MAPPING } from '../helpers/communicationPayloadHelpers';

const useSendOmnichannelMail = ({
	setEmailState = () => {},
	setButtonType = () => {},
	saveDraft = () => {},
	setMailAttachments = () => {},
	signature = '',
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

	const sendMail = async ({
		source = '',
		uploadedFiles = [],
		formattedData = {},
		mailActions = {},
		emailState = {},
	}) => {
		if (!Object.keys(ENDPOINT_MAPPING).includes(mailActions?.actionType)) {
			Toast.error('Endpoint is Required');
			return;
		}

		try {
			const { roomId, messageId } = await saveDraft();

			const response = await trigger({
				data: await getCommunicationPayload({
					userId,
					formattedData,
					draftMessage: `${emailState?.rteContent}<br/>${emailState?.body}`,
					uploadedFiles,
					emailState,
					mailActions,
					name,
					source,
				}),
			});

			await saveDraft({
				communication_id     : response?.data?.id,
				newComposeRoomId     : roomId,
				newComposeDraftMsgId : messageId,
			});

			Toast.success(`${startCase(mailActions?.actionType)} mail sent successfully`);

			setEmailState({
				...DEFAULT_EMAIL_STATE,
				body        : signature,
				scrollToTop : true,
			});
			setMailAttachments([]);
			setButtonType('');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		sendMail,
		mailLoading: loading,
	};
};

export default useSendOmnichannelMail;
