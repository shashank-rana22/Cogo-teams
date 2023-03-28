import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateBulkEnrichment = ({ setActiveTab = () => {}, selectedBulkData = [] }) => {
	const [isOpenModal, setisOpenModal] = useState(false);

	const onCloseModal = () => {
		setisOpenModal(false);
	};

	const [thirdParty, setThirdParty] = useState([]);
	const [thirdPartyPayload, setThirdPartyPayload] = useState([{}]);

	console.log('third party::', thirdParty);
	console.log('3rdpartpayload::', thirdPartyPayload);

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '',
		method  : 'POST',
		authkey : '',
	}, { manual: true });

	const onEnrichmentRequest = async () => {
		try {
			const payload = {
				data: selectedBulkData,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Request has been initiated successfully.');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}

		onCloseModal();
		setActiveTab('requests_sent');
	};

	const onChangeThirdParty = (val) => {
		// setThirdParty(val);
		console.log('hello');
		console.log('obj is::', val);
	};

	return {
		onEnrichmentRequest,
		loading,
		isOpenModal,
		setisOpenModal,
		onCloseModal,
		thirdParty,
		setThirdParty,
		onChangeThirdParty,
	};
};

export default useCreateBulkEnrichment;
