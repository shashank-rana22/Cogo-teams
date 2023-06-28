import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateTribe = ({ fetchList, setShowTribeModal, showTribeModal }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_tribe',
	}, { manual: true });

	const onClickUpdateButton = async (values) => {
		const { squad_ids, ...rest } = values;
		const ARRAY_OF_IDS = showTribeModal.squads.map((obj) => obj?.id);

		const squads_added = (squad_ids || []).filter(
			(id) => !(ARRAY_OF_IDS || []).includes(id),
		);
		const squads_removed = (ARRAY_OF_IDS || []).filter(
			(id) => !(squad_ids || []).includes(id),
		);
		try {
			await trigger({
				data: {
					...rest,
					tribe_id: showTribeModal?.id,
					squads_added,
					squads_removed,
				},
			});
			Toast.success('Tribe has been updated successfully');
			setShowTribeModal(false);
			fetchList();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		onClickUpdateButton,
		loading,
	};
};

export default useUpdateTribe;
