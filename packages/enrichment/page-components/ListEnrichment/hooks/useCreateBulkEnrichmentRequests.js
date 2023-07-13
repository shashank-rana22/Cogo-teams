import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useCreateBulkEnrichmentRequests = ({ refetch = () => {} }) => {
	const { profile = {} } = useSelector((store) => store);

	const [showModal, setShowModal] = useState(false);
	const [selectedCount, setSelectedCount] = useState({});

	const { user = {}, partner = {} } = profile;

	const [{ loading }, trigger] = useRequest({
		url    : 'bulk_create_lead_organization_feedback_request',
		method : 'POST',

	}, { manual: true });

	const onCloseModal = () => {
		setSelectedCount({});
		setShowModal(false);
	};

	const onCreateFeedback = async () => {
		try {
			const payload = {
				page_limit : selectedCount,
				user_id    : user.id,
				partner_id : partner.id,
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

export default useCreateBulkEnrichmentRequests;
