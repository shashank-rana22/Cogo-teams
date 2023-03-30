import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateBulkEnrichment = ({ setActiveTab = () => {}, checkedRowsId = [] }) => {
	const [isOpenModal, setisOpenModal] = useState(false);

	const onCloseModal = () => {
		setisOpenModal(false);
	};

	const [thirdParty, setThirdParty] = useState();
	const [thirdPartyPayload, setThirdPartyPayload] = useState([]);

	const requestPayload = checkedRowsId.map((id) => ({
		feedback_id  : id,
		source       : 'manual',
		request_type : 'enrichment',
	}));

	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'feedback_request_bulk_create',
		method  : 'POST',
		authkey : 'post_allocation_feedback_request_bulk_create',
	}, { manual: true });

	const onEnrichmentRequest = async () => {
		try {
			const payload = {
				requests      : requestPayload,
				third_parties : thirdPartyPayload,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Request has been initiated successfully.');

			onCloseModal();

			setActiveTab('requests_sent');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onEnrichmentRequest,
		loading,
		isOpenModal,
		setisOpenModal,
		onCloseModal,
		thirdParty,
		setThirdParty,
		setThirdPartyPayload,
	};
};

export default useCreateBulkEnrichment;
