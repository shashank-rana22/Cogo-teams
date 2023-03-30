import { Toast } from '@cogoport/components';
import { useLensRequest } from '@cogoport/request';
/**
 * Single utility hook to Reply All mails from Cogo RPA
 */

const useReplyAllEmail = () => {
	const [replyAllMailApi, triggerReplyAllMail] = useLensRequest({
		url    : 'reply_all',
		method : 'POST',
	}, { manual: true });

	const replyAllEmail = async ({
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
			await triggerReplyAllMail({
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
		replyAllMailApi,
		replyAllEmail,
	};
};

export default useReplyAllEmail;
