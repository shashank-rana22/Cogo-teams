import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateStatus = ({
	navigation, auth_role_id, getList, onClose = () => {}, type = '',
}) => {
	const api =	type === 'active' ? '/onboard_auth_role' : '/update_auth_role_permission_mapping';

	const [{ loading }, trigger] = useRequest({
		url    : api,
		method : 'POST',
	});

	const activePayload = {
		auth_role_id,
		navigation_permission_pairs: [{ navigation, permissions: [] }],
	};

	const onBoardPayload = {
		status: type,
		navigation,
		auth_role_id,
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
			if (err.status !== 403) {
				Toast.error(getApiErrorString(err.message));
			}
		}
	};
	return {
		handleSubmit,
		loading,
	};
};

export default useUpdateStatus;
