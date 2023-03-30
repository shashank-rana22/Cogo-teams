import { Toast } from '@cogoport/components';
import { useLensRequest } from '@cogoport/request';
/**
 * Single utility hook to send mails from Cogo RPA
*/

const useSendEmail = () => {
	const [mailApi, triggerCreateMail] = useLensRequest({
		url    : 'send_mail',
		method : 'POST',
	}, { manual: true });

	const createEmail = async ({
		sender = '',
		toUserEmail = [],
		ccrecipients = [],
		bccrecipients = [],
		subject,
		content,
		attachments,
		msgId,
		userId,
		onCreate,
	}) => {
		try {
			await triggerCreateMail({
				data: {
					sender,
					toUserEmail,
					ccrecipients,
					bccrecipients,
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
		mailApi,
		createEmail,
	};
};

export default useSendEmail;
