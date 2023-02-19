import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useCreateOmniNote({ editNote, fetchListNotes, activeMessageCard, activeTab, activeVoiceCard }) {
	const { profile } = useSelector((state) => state);
	const [{ loading }, trigger] = useRequest({
		url    : '/create_omnichannel_note',
		method : 'post',
	}, { manual: true });

	const { id } = activeMessageCard || {};
	const { id: roomId } = activeVoiceCard || {};

	const omniChannelNote = async ({ noteValue }) => {
		try {
			await trigger({
				data: {
					channel         : 'whatsapp',
					channel_chat_id : activeTab === 'message' ? id : roomId,
					agent_id        : profile?.user?.id,
					note_id         : editNote ? '' : undefined,
					notes_data      : [noteValue],
				},
			});
			fetchListNotes();
			Toast.success('Successfully Created');
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return {
		omniChannelNote,
		loading,
	};
}
export default useCreateOmniNote;
