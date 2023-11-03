import { useLensRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useState, useEffect } from 'react';

import getFirebaseDraftBody from '../helpers/getFirebaseDraftBody';

const getParams = ({ messageId = '', source = '' }) => ({
	email_address : source,
	message_id    : messageId,
});

const formatBody = ({ mailResData = {}, attachmentResData = {} }) => {
	const { body } = mailResData?.data || {};
	const { content = '' } = body || {};
	const { value: allAttachments } = attachmentResData?.data || {};

	return allAttachments?.reduce(
		(prevContent, attachment) => prevContent?.replaceAll(
			`cid:${attachment.contentId}`,
			`data:${attachment.contentType};base64,${attachment.contentBytes}`,
		),
		content,
	);
};

function useGetMailContent({
	firestore = {},
	formattedData = {},
	updatedArray = [],
}) {
	const [fullThread, setFullThread] = useState('');
	const [expandedStateId, setExpandedStateId] = useState('');

	const [loading, setLoading] = useState(false);

	const { source = '', id = '' } = formattedData || {};

	const [, trigger] = useLensRequest({
		url    : '/get_mail',
		method : 'get',
	}, { manual: true });

	const [, attachmentTrigger] = useLensRequest({
		url    : '/get_attachments',
		method : 'get',
	}, { manual: true });

	const getEmailBody = useCallback(async ({ isDraft = false, messageId = '', messageRoomId = '' }) => {
		setExpandedStateId(messageRoomId);
		setLoading(true);

		try {
			if (isDraft) {
				const {
					newContent,
				} = await getFirebaseDraftBody({ messageRoomId, firestore, roomId: id }) || {};

				setFullThread(newContent);
			} else {
				const mailResData = await trigger({
					params: getParams({ messageId, source }),
				});

				setFullThread(mailResData?.data?.body?.content);

				const attachmentResData = await attachmentTrigger({
					params: getParams({ messageId, source }),
				});

				const newContent = formatBody({ mailResData, attachmentResData });

				setFullThread(newContent);
			}
		} catch (err) {
			console.log('err', err);
		} finally {
			setLoading(false);
		}
	}, [firestore, id, trigger, source, attachmentTrigger]);

	const toggleMailBody = useCallback(({
		isDraft = false,
		messageId = '',
		messageRoomId = '',
		expandedStateIdProp = '',
	}) => {
		if (loading) {
			return;
		}

		setExpandedStateId('');
		setFullThread('');

		if (expandedStateIdProp !== messageRoomId) {
			getEmailBody({ isDraft, messageId, messageRoomId });
		}
	}, [getEmailBody, loading]);

	useEffect(() => {
		if (!isEmpty(updatedArray)) {
			const [firstMessage = {}] = updatedArray || [];

			const {
				response,
				is_draft: isDraft = false,
				id: messageRoomId = '',
			} = firstMessage || {};

			const {
				message_id = '',
			} = response || {};

			getEmailBody({ isDraft, messageId: message_id, messageRoomId });
		}
	}, [updatedArray, getEmailBody]);

	return {
		expandLoading: loading,
		toggleMailBody,
		fullThread,
		expandedStateId,
	};
}

export default useGetMailContent;
