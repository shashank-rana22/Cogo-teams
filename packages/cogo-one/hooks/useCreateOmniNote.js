import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';

function useCreateOmniNote({ editNote, fetchListNotes }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_omnichannel_note',
		method : 'post',
	}, { manual: true });

	const omniChannelNote = async ({ noteValue = '' }) => {
		try {
			await trigger({
				data: {
					channel         : 'whatsapp',
					channel_chat_id : '2T85TebJo8ohRBtEJXf0',
					agent_id        : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
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
