import { Toast } from '@cogoport/components';
// import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateTribe = ({ fetchList, setShowUpdateTribeModal, showUpdateTribeModal }) => {
	const { profile = {} } = useSelector((state) => state);

	const { user = {} } = profile;

	const { id: user_id } = user;
	// const { control, formState: { errors }, handleSubmit, setValue } = useForm();

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_tribe',
	}, { manual: true });

	const onClickUpdateButton = async (values) => {
		const { squad_ids, ...rest } = values;
		const ARRAY_OF_IDS = showUpdateTribeModal.squads.map((obj) => obj.id);

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
					tribe_id          : showUpdateTribeModal?.id,
					performed_by_id   : user_id,
					performed_by_type : 'user',
					squads_added,
					squads_removed,
				},
			});
			Toast.success('Successfully Updated');
			setShowUpdateTribeModal(false);
			fetchList();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		// control,
		// errors,
		onClickUpdateButton,
		loading,
		// handleSubmit,
		// setValue,
	};
};

export default useUpdateTribe;
