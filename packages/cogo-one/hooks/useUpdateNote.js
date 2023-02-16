import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useUpdateNote({ fetchListNotes = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_omnichannel_note',
		method : 'post',
	}, { manual: true });

	const updateNote = async ({ val = '', noteValue = '', type, updateId = '' }) => {
		let payload;
		if (type === 'update') {
			payload = {
				action_type : 'update',
				id          : updateId,
				notes_data  : [noteValue],
			};
		} else {
			payload = {
				action_type : 'delete',
				id          : val,
			};
		}

		try {
			await trigger({
				data: payload,
			});
			Toast.success('Update Successful');
			fetchListNotes();
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	return {
		updateNote,
		loading,
	};
}

export default useUpdateNote;
