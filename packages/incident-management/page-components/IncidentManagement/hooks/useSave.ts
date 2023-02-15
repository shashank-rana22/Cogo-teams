import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useSave = ({ remarks, id, reftech }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/incident-management/incident/edit-notes',
			method  : 'PATCH',
			authkey : 'get_incident_management_edit_notes',
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
			reftech();
		} catch (err) {
			if (!loading) {
				Toast.error('Failed to get incident');
			}
		}
	};

	return {
		onSave,
		data,
	};
};
export default useSave;
