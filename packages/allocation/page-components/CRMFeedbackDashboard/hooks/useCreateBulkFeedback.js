import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateBulkFeedback = ({ refetch = () => {} }) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedCount, setSelectedCount] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'bulk_create_lead_organization_feedback',
		method : 'POST',
	}, { manual: true });

	const onCloseModal = () => {
		setSelectedCount({});
		setShowModal(false);
	};

	const onCreateFeedback = async () => {
		try {
			const payload = {
				page_limit: selectedCount,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Accounts added successfully. Please wait for the changes to be reflected');

			setShowModal(false);
			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onCreateFeedback,
		showModal,
		setShowModal,
		loading,
		selectedCount,
		setSelectedCount,
		onCloseModal,

	};
};

export default useCreateBulkFeedback;
