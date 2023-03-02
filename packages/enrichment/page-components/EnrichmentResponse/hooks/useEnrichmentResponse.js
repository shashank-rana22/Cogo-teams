import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

const useEnrichmentResponse = () => {
	const { locale, partner_id } = useSelector(({ profile, general }) => ({
		locale     : general?.locale,
		partner_id : profile?.partner?.id,
	}));

	const router = useRouter();

	const { query = {} } = router;

	const [activeTab, setActiveTab] = useState('user');

	const [showAddPoc, setShowAddPoc] = useState(false);

	const [params, setParams] = useState({
		sort_type : 'asc',
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
		showAddPoc,
		setShowAddPoc,
		locale,
		partner_id,

	};
};

export default useEnrichmentResponse;
