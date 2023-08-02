import { useLensRequest } from '@cogoport/request';
import { useCallback, useState } from 'react';

const getParams = ({ messageId }) => ({
	email_address : 'sandeep.nalabolu@cogoport.com',
	message_id    : messageId,
});

const formatBody = ({ mailResData, attachmentResData }) => {
	const { body } = mailResData?.data || {};
	const { content = '' } = body || {};
	const { value: allAttachements } = attachmentResData?.data || {};

	return allAttachements?.reduce(
		(prevContent, attachment) => prevContent.replaceAll(
			`cid:${attachment.contentId}`,
			`data:${attachment.contentType};base64,${attachment.contentBytes}`,
		),
		content,
	);
};

function useGetMailContent({ messageId }) {
	const [message, setMessage] = useState('');

	const [{ loading }, trigger] = useLensRequest({
		url    : '/get_mail',
		method : 'get',
	}, { manual: true });

	const [{ loading:attachmentLoading }, attachmentTrigger] = useLensRequest({
		url    : '/get_attachments',
		method : 'get',
	}, { manual: true });

	const combinedLoading = loading || attachmentLoading;

	const getEmailBody = useCallback(async () => {
		if (combinedLoading || message) {
			return;
		}

		try {
			const mailResData = await trigger({
				params: getParams({ messageId }),
			});

			setMessage(mailResData?.data?.body?.content);

			const attachmentResData = await attachmentTrigger({
				params: getParams({ messageId }),
			});

			const newContent = formatBody({ mailResData, attachmentResData });
			setMessage(newContent);
		} catch (err) {
			console.error(err);
		}
	}, [attachmentTrigger, combinedLoading, message, messageId, trigger]);

	return {
		getEmailBody,
		message,
		loading,
	};
}

export default useGetMailContent;
