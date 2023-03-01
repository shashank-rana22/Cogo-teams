import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useEnrichmentResponse = () => {
	const { locale, partner_id } = useSelector(({ profile, general }) => ({
		locale     : general?.locale,
		partner_id : profile?.partner?.id,
	}));

	const router = useRouter();

	const { query = {} } = router;

	const [activeTab, setActiveTab] = useState('user');

	const [responseData, setResponseData] = useState([]);

	const [showAddPoc, setShowAddPoc] = useState(false);

	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			feedback_request_id: query.id,
		},
		is_third_party: true,
	});

	const [{ loading = false, data = [] }, refetch] = useAllocationRequest({
		url     : '/feedback_responses',
		method  : 'get',
		authkey : 'get_allocation_feedback_responses',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	useEffect(() => {
		if (isEmpty(list)) {
			return;
		}
		setResponseData(list);
	}, [list]);

	useEffect(() => {
		setShowAddPoc(false);
	}, [activeTab]);

	return {
		list,
		paginationData,
		refetch,
		loading,
		setParams,
		activeTab,
		setActiveTab,
		setResponseData,
		responseData,
		showAddPoc,
		setShowAddPoc,
		locale,
		partner_id,

	};
};

export default useEnrichmentResponse;

// if list has data =>  show data
// dont change data when tabs are changed
// if list does not have data => show form
