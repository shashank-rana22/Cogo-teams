import { useLensRequest } from '@cogoport/request';
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
}) {
	const [fullThread, setFullThread] = useState('');
	const [expandedStateId, setExpandedStateId] = useState('');

	const [loading, setLoading] = useState(false);

	const { source = '', roomId = '' } = formattedData || {};

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
				} = await getFirebaseDraftBody({ messageRoomId, firestore, roomId }) || {};

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
			setExpandedStateId('');
			setFullThread('');
		} finally {
			setLoading(false);
		}
	}, [firestore, roomId, trigger, source, attachmentTrigger]);

	const toggleMailBody = ({ isDraft = false, messageId = '', messageRoomId = '' }) => {
		if (loading) {
			return;
		}

		setExpandedStateId('');
		setFullThread('');

		if (expandedStateId !== messageRoomId) {
			getEmailBody({ isDraft, messageId, messageRoomId });
		}
	};

	useEffect(() => {
		setLoading(false);
		setFullThread('');
		setExpandedStateId('');
	}, [roomId]);

	return {
		expandLoading: loading,
		toggleMailBody,
		fullThread,
		expandedStateId,
	};
}

export default useGetMailContent;
