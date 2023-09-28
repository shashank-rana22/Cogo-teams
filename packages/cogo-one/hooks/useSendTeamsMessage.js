import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import {
	getCommunicationPayload,
	getOrPublishDraft,
} from '../helpers/sendTeamMessageHelpers';

// import useCreateCogooneGroups from './useCreateCogooneGroups';

function useSendTeamsMessage({ activeTab = {}, firestore = {}, cleanUpFunc = () => {} }) {
	const { loggedInAgentId = '' } = useSelector(({ profile }) => ({
		loggedInAgentId: profile.user.id,
	}));

	const [loading, setLoading] = useState(false);

	const [, trigger] = useRequest(
		{
			url    : '/create_communication',
			method : 'post',
		},
		{ manual: true, autoCancel: false },
	);

	// const { createOrGetCogooneGroup = () => {} } = useCreateCogooneGroups({ activeTab });

	const sendTeamsMessage = async ({ draftMessage = '', attachments = [] }) => {
		try {
			setLoading(true);

			if (!draftMessage && isEmpty(attachments)) {
				return;
			}
			const groupId = await getOrPublishDraft({
				activeTab,
				loggedInAgentId,
				firestore,
			});

			// const groupId = await createOrGetCogooneGroup();

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

			await trigger({
				data: payload,
			});
			cleanUpFunc();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
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
