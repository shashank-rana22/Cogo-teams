import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useCompanyPolicyDetails = () => {
	const [showModal, setShowModal] = useState(false);

	const [{ data, loading: listLoading = false }] = useHarbourRequest({
		method : 'get',
		url    : '/list_company_documents',
		params : {
			filters: {
				category : 'company_policy',
				status   : 'active',
			},
		},
	}, { manual: false });

	return {
		mainData    : data,
		showModal,
		setShowModal,
		refetchList : fetch,
		listLoading,
	};
};

export default useCompanyPolicyDetails;
