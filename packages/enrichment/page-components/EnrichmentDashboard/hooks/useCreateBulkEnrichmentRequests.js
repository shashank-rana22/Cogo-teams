import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateBulkEnrichmentRequests = ({
	refetch = () => {},
	refetchStats = () => {},
	setShowModal = () => {},
}) => {
	const [thirdParty, setThirdParty] = useState('');

	const [thirdPartyPayload, setThirdPartyPayload] = useState([]);

	const [selectedCount, setSelectedCount] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'bulk_create_lead_organization_feedback_request',
		method : 'POST',
	}, { manual: true });

	const onCreateFeedback = async () => {
		try {
			const payload = {
				page_limit: selectedCount,
				...thirdPartyPayload,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Accounts added successfully. Please wait for the changes to be reflected');

			setShowModal(false);

			refetch();
			refetchStats();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onCreateFeedback,
		loading,
		selectedCount,
		setSelectedCount,
		thirdParty,
		setThirdParty,
		thirdPartyPayload,
		setThirdPartyPayload,
	};
};

export default useCreateBulkEnrichmentRequests;
