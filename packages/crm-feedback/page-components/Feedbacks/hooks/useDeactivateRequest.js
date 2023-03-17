import { Toast } from '@cogoport/components';
// import getApiErrorString from '@cogoport/forms/utils/getApiError';
// import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useDeactivateRequest = () => {
	const [isOpenModal, setisOpenModal] = useState(false);

	const onCloseModal = () => {
		setisOpenModal(false);
	};

	// const [{ loading }, trigger] = useAllocationRequest({
	// 	url     : '',
	// 	method  : 'POST',
	// 	authkey : '',
	// }, { manual: true });

	const onDeactivateRequest = async () => {
		// try {
		// 	const payload = {
		// 	};

		// 	await trigger({
		// 		data: payload,
		// 	});

		// 	Toast.success('Request has been deactivated successfully.');
		// } catch (error) {
		// 	Toast.error(getApiErrorString(error.response?.data));
		// }
		onCloseModal();
		Toast.success('useDeactivateRequest has been called');
	};

	return {
		onDeactivateRequest,
		// loading,
		isOpenModal,
		setisOpenModal,
		onCloseModal,
	};
};

export default useDeactivateRequest;
