import { useLensRequest } from '@cogoport/request';
import {
	query, getDocs, collection, orderBy,
} from 'firebase/firestore';
import { useCallback, useState } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { combineChunks } from '../utils/chunkUtils';

const MESSAGE_TYPES = ['rte_content', 'body'];

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
	messageId = '',
	source = '',
	setExpandedState = () => {},
	isDraft = false,
	channel_type = 'email',
	firestore = {},
	roomId = '',
	messageRoomId = '',
	setDraftQuillBody = () => {},
}) {
	const [message, setMessage] = useState('');

	const [{ loading }, trigger] = useLensRequest({
		url    : '/get_mail',
		method : 'get',
	}, { manual: true });

	const [{ loading: attachmentLoading }, attachmentTrigger] = useLensRequest({
		url    : '/get_attachments',
		method : 'get',
	}, { manual: true });

	const combinedLoading = loading || attachmentLoading;

	const getFirebaseEmailBody = useCallback(async () => {
		const messagesData = await Promise.all(
			MESSAGE_TYPES.map(
				async (itm) => {
					const activeChatCollection = collection(
						firestore,
						`${FIRESTORE_PATH[channel_type]}/${roomId}/messages/${messageRoomId}/${itm}`,
					);

					const assignedChatsQuery = query(
						activeChatCollection,
						orderBy('serial_id', 'asc'),
					);

					const getAssignedChatsQuery = await getDocs(assignedChatsQuery);
					return {
						type : itm,
						data : getAssignedChatsQuery,
					};
				},
			),
		);

		return messagesData;
	}, [channel_type, firestore, roomId, messageRoomId]);

	const getEmailBody = useCallback(async () => {
		if (combinedLoading || (!isDraft && message)) {
			return;
		}

		try {
			if (isDraft) {
				const messageDocs = await getFirebaseEmailBody();

				const newContent = messageDocs?.reduce(
					(acc, itm) => {
						const content = combineChunks({ chunks: itm?.data });

						setDraftQuillBody(
							(prev) => ({
								...(prev || {}),
								[itm?.type]: content,
							}),
						);
						return `${acc}<br>${content.content}`;
					},
					'',
				);

				setMessage(newContent);
			} else {
				const mailResData = await trigger({
					params: getParams({ messageId, source }),
				});

				setMessage(mailResData?.data?.body?.content);

				const attachmentResData = await attachmentTrigger({
					params: getParams({ messageId, source }),
				});

				const newContent = formatBody({ mailResData, attachmentResData });

				setMessage(newContent);
			}
		} catch (err) {
			console.error(err);
		} finally {
			setExpandedState(true);
		}
	}, [combinedLoading, message, isDraft, getFirebaseEmailBody, setDraftQuillBody,
		trigger, messageId, source, attachmentTrigger, setExpandedState]);

	return {
		getEmailBody,
		message,
		loading,
	};
}

export default useGetMailContent;
