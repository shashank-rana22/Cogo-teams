import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useUpdateNote({ fetchListNotes = () => {}, setEditNote = () => {} }) {
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
			setEditNote(false);
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		updateNote,
		loading,
	};
}

export default useUpdateNote;
