import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useDeactivateRequest = ({ feedback_request_id = '', refetch = () => {} }) => {
	const [isOpenModal, setisOpenModal] = useState(false);

	const onCloseModal = () => {
		setisOpenModal(false);
	};

	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'feedback_request_status',
		method  : 'POST',
		authkey : 'post_allocation_feedback_request_status',
	}, { manual: true });

	const onDeactivateRequest = async () => {
		try {
			const payload = {
				id     : feedback_request_id,
				status : 'inactive',
			};

			await trigger({
				data: payload,
			});

			Toast.success('Request has been deactivated successfully.');

			refetch();

			onCloseModal();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onDeactivateRequest,
		loading,
		isOpenModal,
		setisOpenModal,
		onCloseModal,
	};
};

export default useDeactivateRequest;
