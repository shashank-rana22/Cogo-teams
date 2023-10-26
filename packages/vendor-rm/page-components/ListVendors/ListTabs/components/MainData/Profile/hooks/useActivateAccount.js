import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useActivateAccount() {
	const [{ loading = false }, trigger] = useRequest({
		url    : '/', // Todo: add the URL
		method : 'post',
	}, { manual: true });

	// Todo : remove setActivate from here
	// Todo : add async in the function
	const handleActivation = async ({ setShowModal = () => {}, setActivate = () => {} }) => {
		try {
			console.log('in try ');
			await trigger();

			setActivate((pv) => (pv === 'active' ? 'inactive' : 'active'));

			setShowModal(false);

			Toast.success('Updated successfully');
		} catch (e) {
			console.log('in catch');
			Toast.error(getApiErrorString(e.response?.data));
		}
	};

	return {
		accountLoading: loading,
		handleActivation,
	};
}

export default useActivateAccount;
