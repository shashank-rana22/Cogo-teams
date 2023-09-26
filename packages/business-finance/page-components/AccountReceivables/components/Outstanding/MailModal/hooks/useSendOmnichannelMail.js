import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import { getCommunicationPayload } from '../helpers/getCommunicationPayload';
import { DEFAULT_EMAIL_STATE } from '../mailConstants';

const useSendOmnichannelMail = ({
	setEmailState = () => { },
	setButtonType = () => { },
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
		uploadedFiles = [],
		formattedData = {},
		mailActions = {},
		emailState = {},
		source = 'outstanding',
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
