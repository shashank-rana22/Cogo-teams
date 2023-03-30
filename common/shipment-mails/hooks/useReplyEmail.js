import { Toast } from '@cogoport/components';
import { useLensRequest } from '@cogoport/request';
/**
 * Single utility hook to Reply mails from Cogo RPA
 */

const useReplyEmail = () => {
	const [replyMailApi, triggerReplyMail] = useLensRequest({
		url    : 'reply_mail',
		method : 'POST',
	}, { manual: true });

	const replyEmail = async ({
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
			await triggerReplyMail({
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
		replyMailApi,
		replyEmail,
	};
};

export default useReplyEmail;
