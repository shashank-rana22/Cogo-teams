import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useSave = ({ remarks, id, refetch, setShowModal }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/incident-management/incident/edit-notes',
			method  : 'PATCH',
			authKey : 'patch_incident_management_incident_edit_notes',
		},
		{ manual: true },
	);

	const onSave = async () => {
		try {
			await trigger({
				data: {
					notes: remarks,
					id,
				},
			});
			Toast.success('Saved');
			refetch();
			setShowModal(false);
		} catch (e) {
			if (!loading) {
				Toast.error(e?.response?.data?.message || 'Something went Wrong');
			}
		}
	};

	return {
		onSave,
		data,
		loadingOnSave: loading,
	};
};
export default useSave;
