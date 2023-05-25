import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useCompanyPolicyDetails = () => {
	const [showModal, setShowModal] = useState(false);

	const [{ data, loading: listLoading = false }] = useHarbourRequest({
		method : 'get',
		url    : '/list_document_templates',
		params : {
			filters: {
				template_type : 'company_policy',
				status        : 'active',
			},
		},
	}, { manual: false });

	return {
		list        : data?.list,
		showModal,
		setShowModal,
		refetchList : fetch,
		listLoading,
	};
};

export default useCompanyPolicyDetails;
