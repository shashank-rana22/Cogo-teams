import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { FIREBASE_TABS } from '../constants';

function useCreateOmniNote({ editNote, fetchListNotes, activeMessageCard, activeTab, activeVoiceCard }) {
	const { profile } = useSelector((state) => state);
	const [{ loading }, trigger] = useRequest({
		url    : '/create_omnichannel_note',
		method : 'post',
	}, { manual: true });

	const { id } = activeMessageCard || {};
	const { user_number } = activeVoiceCard || {};

	const omniChannelNote = async ({ noteValue }) => {
		try {
			await trigger({
				data: {
					channel: (FIREBASE_TABS.includes(activeTab)
						? activeMessageCard : activeVoiceCard)?.channel_type || 'message',
					channel_chat_id : FIREBASE_TABS.includes(activeTab) ? id : user_number,
					agent_id        : profile?.user?.id,
					note_id         : editNote ? '' : undefined,
					notes_data      : [noteValue],
				},
			});
			fetchListNotes();
			Toast.success('Successfully Created');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};
	return {
		omniChannelNote,
		createLoading: loading,
	};
}
export default useCreateOmniNote;
