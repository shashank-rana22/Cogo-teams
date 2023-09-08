import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import { DEFAULT_EMAIL_STATE } from '../constants/mailConstants';
import { getCommunicationPayload } from '../helpers/communicationPayloadHelpers';

const useSendOmnichannelMail = ({
	setEmailState = () => {},
	setButtonType = () => {},
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
		try {
			await trigger({
				data: getCommunicationPayload({
					userId,
					formattedData,
					draftMessage: emailState?.body,
					uploadedFiles,
					emailState,
					mailActions,
					name,
					source,
				}),
			});
			Toast.success(`${startCase(mailActions?.actionType)} mail sent successfully`);

			setEmailState({ ...DEFAULT_EMAIL_STATE, scrollToTop: true });
			setButtonType('');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		sendMail, mailLoading: loading,
	};
};

export default useSendOmnichannelMail;
