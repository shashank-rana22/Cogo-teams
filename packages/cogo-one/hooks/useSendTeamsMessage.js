import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import {
	getCommunicationPayload,
} from '../helpers/sendTeamMessageHelpers';

import useCreateCogooneGroups from './useCreateCogooneGroups';

function useSendTeamsMessage({
	activeTab = {},
	cleanUpFunc = () => {},
	draftRoomId = '',
}) {
	const { loggedInAgentId = '' } = useSelector(({ profile }) => ({
		loggedInAgentId: profile.user.id,
	}));

	const [loading, setLoading] = useState(false);

	const [, trigger] = useRequest(
		{
			url    : '/create_communication_internal_chat',
			method : 'post',
		},
		{ manual: true, autoCancel: false },
	);

	const { createOrGetCogooneGroup = () => {} } = useCreateCogooneGroups({ activeTab });

	const sendTeamsMessage = async ({ draftMessage = '', attachments = [] }) => {
		try {
			if ((!draftMessage && isEmpty(attachments)) || !draftRoomId || loading) {
				return;
			}
			setLoading(true);

			const groupId = await createOrGetCogooneGroup();

			if (!groupId) {
				Toast.error('Something Went Wrong');
				return;
			}

			const payload = getCommunicationPayload({
				loggedInAgentId,
				groupId,
				activeTab,
				draftMessage,
				attachments,
			});

			console.log(payload, 'pdfghjklayload');

			await trigger({
				data: payload,
			});
			cleanUpFunc();
		} catch (error) {
			console.log(error, 'error');
			Toast.error(getApiErrorString(error?.response?.data) || 'Something Went Wrong');
		} finally {
			setLoading(false);
		}
	};

	return {
		sendMessageLoading: loading,
		sendTeamsMessage,
	};
}

export default useSendTeamsMessage;
