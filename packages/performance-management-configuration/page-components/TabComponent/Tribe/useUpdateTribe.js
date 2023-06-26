import { Toast } from '@cogoport/components';
// import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateTribe = ({ fetchList, setShowTribeModal, showTribeModal }) => {
	const { user = {} } = useSelector((state) => state.profile);
	const { id: user_id } = user;

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
					tribe_id          : showTribeModal?.id,
					performed_by_id   : user_id,
					performed_by_type : 'user',
					squads_added,
					squads_removed,
				},
			});
			Toast.success('Successfully Updated');
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
