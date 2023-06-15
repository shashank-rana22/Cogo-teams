import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateTribe = ({ fetchList, setShowUpdateTribeModal, showUpdateTribeModal }) => {
	const { profile = {} } = useSelector((state) => state);

	const { user = {} } = profile;

	const { id: user_id } = user;
	const { control, formState: { errors }, handleSubmit, setValue } = useForm();

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_squad',
	}, { manual: true });

	const onClickUpdateButton = async (values) => {
		try {
			await trigger({
				data: {
					...values,
					tribe_id          : showUpdateTribeModal?.id,
					performed_by_id   : user_id,
					performed_by_type : 'user',
				},
			});
			Toast.success('Successfully Created');
			setShowUpdateTribeModal(false);
			fetchList();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		control,
		errors,
		onClickUpdateButton,
		loading,
		handleSubmit,
		setValue,
	};
};

export default useUpdateTribe;
