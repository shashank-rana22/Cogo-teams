import { Toast } from '@cogoport/components';
import useAxios from 'axios-hooks';
/**
 * Single utility hook to Reply mails from Cogo RPA
 */

const useReplyEmail = () => {
	const [replyMailApi, triggerReplyMail] = useAxios(
		{
			url    : `${process.env.COGO_LENS_URL}/reply_mail`,
			method : 'POST',
		},
		{ manual: true },
	);

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
