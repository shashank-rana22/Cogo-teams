import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useActivateAccount() {
	const [{ loading = false }, trigger] = useRequest({
		url    : '/', // Todo: add the URL
		method : 'post',
	}, { manual: true });

	const handleActivation = async ({ showModal = '', setShowModal = () => {} }) => {
		try {
			console.log('in try ');

			await trigger({
				payload: {
					bank_document_id: showModal,
				},
			});

			setShowModal('');

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
