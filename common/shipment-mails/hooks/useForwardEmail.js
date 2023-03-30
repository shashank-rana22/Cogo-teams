import { Toast } from '@cogoport/components';
import { useLensRequest } from '@cogoport/request';

const useForwardEmail = () => {
	const [forwardMailApi, triggerForwardMail] = useLensRequest({
		url    : 'forward_mail',
		method : 'POST',
	}, { manual: true });

	const forwardEmail = async ({
		sender = '',
		toUserEmail = [],
		ccrecipients = [],
		subject,
		content,
		attachments,
		msgId,
		userId,
		onCreate,
	}) => {
		try {
			await triggerForwardMail({
				data: {
					sender,
					toUserEmail,
					ccrecipients,
					subject,
					content,
					attachments,
					msgId,
					userId: userId || sender,
				},
			});
			Toast.success('Email Sent');
			if (onCreate) {
				onCreate();
			}
		} catch (err) {
			Toast.error(err?.data);
		}
	};

	return {
		forwardMailApi,
		forwardEmail,
	};
};

export default useForwardEmail;
