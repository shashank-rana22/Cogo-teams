import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateBulkEnrichment = ({ checkedRowsId = [], setActiveTab = () => {} }) => {
	const [isOpenModal, setisOpenModal] = useState(false);

	const onCloseModal = () => {
		setisOpenModal(false);
	};

	const [thirdParty, setThirdParty] = useState([]);

	const thirdPartyOptions = [
		{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
		{ label: 'Lev Tolstoy', value: 'War and Peace' },
		{ label: 'Fyodor Dostoyevsy', value: 'The Idiot' },
		{ label: 'Oscar Wilde', value: 'A Picture of Dorian Gray' },
		{ label: 'George Orwell', value: '1984' },
		{ label: 'Jane Austen', value: 'Pride and Prejudice' },
		{ label: 'Marcus Aurelius', value: 'Meditations' },
	];

	// const [{ loading }, trigger] = useAllocationRequest({
	// 	url     : '',
	// 	method  : 'POST',
	// 	authkey : '',
	// }, { manual: true });

	const onEnrichmentRequest = async () => {
		// try {
		// 	const payload = {
		// 	};

		// 	await trigger({
		// 		data: payload,
		// 	});

		// 	Toast.success('Request has been initiated successfully.');
		// } catch (error) {
		// 	Toast.error(getApiErrorString(error.response?.data));
		// }
		console.log('checkedRowsId::', checkedRowsId);
		console.log('thirdParty::', thirdParty);
		onCloseModal();
		setActiveTab('requests');
		Toast.success('onEnrichmentRequest has been called, checkedRowsId are in console.');
	};

	return {
		onEnrichmentRequest,
		// loading,
		isOpenModal,
		setisOpenModal,
		onCloseModal,
		thirdParty,
		setThirdParty,
		thirdPartyOptions,
	};
};

export default useCreateBulkEnrichment;
