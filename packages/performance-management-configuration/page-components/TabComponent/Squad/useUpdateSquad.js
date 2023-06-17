import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateSquad = ({ fetchList, setShowSquadModal, showSquadModal }) => {
	const { user = {} } = useSelector((state) => state.profile);
	const { id: user_id } = user;

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_squad',
	}, { manual: true });

	const onClickUpdateButton = async (values) => {
		const { employee_ids, ...rest } = values;
		const ARRAY_OF_IDS = showSquadModal.employees.map((obj) => obj.id);

		const employees_added = (employee_ids || []).filter(
			(id) => !(ARRAY_OF_IDS || []).includes(id),
		);
		const employees_removed = (ARRAY_OF_IDS || []).filter(
			(id) => !(employee_ids || []).includes(id),
		);
		try {
			await trigger({
				data: {
					...rest,
					squad_id          : showSquadModal?.id,
					performed_by_id   : user_id,
					performed_by_type : 'user',
					employees_added,
					employees_removed,
				},
			});
			Toast.success('Successfully Updated');
			setShowSquadModal(false);
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

export default useUpdateSquad;
