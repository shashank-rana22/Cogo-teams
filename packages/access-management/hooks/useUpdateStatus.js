import { Toast } from '@cogoport/components';
import { useAuthRequest } from '@cogoport/request';

const ERROR_CODE = 403;

const useUpdateStatus = ({
	navigation, auth_role_id, getList, onClose = () => {}, type = '',
}) => {
	const api =	type === 'active' ? '/onboard_role' : '/update_role_permission';

	const [{ loading }, trigger] = useAuthRequest({
		url    : api,
		method : 'POST',
	}, { manual: true });

	const activePayload = {
		role_id     : auth_role_id,
		navigation,
		permissions : [],
	};

	const onBoardPayload = {
		status  : type === 'active',
		navigation,
		role_id : auth_role_id,
	};

	const handleSubmit = async () => {
		try {
			const payload =	type === 'active' ? activePayload : onBoardPayload;
			const res = await trigger({ data: payload });
			if (!res.hasError) {
				Toast.success('Status updated');
				getList(auth_role_id, false);
				onClose();
			}
		} catch (err) {
			if (err.response?.status !== ERROR_CODE) {
				Toast.error(err.response?.data.error || 'Something went wrong!!!, please try again.');
			}
		}
	};
	return {
		handleSubmit,
		loading,
	};
};

export default useUpdateStatus;
