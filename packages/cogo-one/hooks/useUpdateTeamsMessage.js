import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

const getPayload = ({ draftMessage, attachments, communicationData, activeId }) => {
	const { message_metadata = {}, id = '' } = communicationData || {};

	const { prev_messages = [], media_url = [], text = '', message_type = '' } = message_metadata || {};

	return {
		id,
		sync_cogoverse   : true,
		message_metadata : {
			...message_metadata,
			prev_messages: [
				...prev_messages,
				{
					media_url,
					text,
					message_type,
				},
			],
			message_type : isEmpty(attachments) ? 'text' : 'media',
			text         : draftMessage,
			media_url    : attachments,
			group_id     : activeId,
		},

	};
};

function useUpdateTeamsMessage({
	cleanUpFunc = () => {},
	communicationData = {},
	activeId = '',
}) {
	const [loading, setLoading] = useState(false);

	const [, trigger] = useRequest(
		{
			url    : '/update_communication',
			method : 'post',
		},
		{ manual: true, autoCancel: false },
	);

	const updateTeamsMessage = async ({
		draftMessage = '',
		attachments = [],
	}) => {
		console.log('draftMessage:', draftMessage, attachments);
		try {
			if ((!draftMessage && isEmpty(attachments)) || loading) {
				return;
			}
			setLoading(true);

			await trigger({
				data: getPayload({ draftMessage, attachments, communicationData, activeId }),
			});
			cleanUpFunc();
		} catch (error) {
			Toast.error(
				getApiErrorString(error?.response?.data) || 'Something Went Wrong',
			);
		} finally {
			setLoading(false);
		}
	};

	return {
		updateMessageLoading: loading,
		updateTeamsMessage,
	};
}

export default useUpdateTeamsMessage;
