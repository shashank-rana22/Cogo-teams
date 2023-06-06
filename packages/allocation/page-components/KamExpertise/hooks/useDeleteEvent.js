import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useDeleteEvent = ({ id, listRefetch }) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_rule_status_change',
		authkey : 'post_allocation_kam_expertise_rule_status_change',
	}, { manual: true });

	const onDelete = async () => {
		try {
			const payload = {
				configuration_detail_id : id,
				status                  : 'inactive',
			};

			await trigger({
				data: payload,
			});

			setShowDeleteModal(false);

			Toast.success('Event Deleted');

			listRefetch();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		onDelete,
		deleteLoading: loading,
		setShowDeleteModal,
		showDeleteModal,
	};
};

export default useDeleteEvent;
