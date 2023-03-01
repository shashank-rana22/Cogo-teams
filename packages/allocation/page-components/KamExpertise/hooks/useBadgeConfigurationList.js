// import { Toast } from '@cogoport/components';
// import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useBadgeConfigurationList() {
	// const [params, setParams] = useState({
	// 	sort_type : 'desc',
	// 	sort_by   : 'created_at',
	// 	page      : 1,
	// 	// filters   : {
	// 	// 	status: ['active', 'draft', 'publishable', 'checking', 'not_publishable'],
	// 	// },
	// });

	const [{ loading, data = {} }, refetch] = useAllocationRequest({
		url     : '/allocation/kam_expertise_badge_configuration_list',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_badge_configuration_list',
		params  : {},
	}, { manual: false });

	// console.log(refetch);
	// const getNextPage = (newPage) => {
	// 	setParams((previousParams) => ({
	// 		...previousParams,
	// 		page: newPage,
	// 	}));
	// };
	// ToDo :[ Toast success and Error mssges]

	const { list = [], ...paginationData } = data || {};

	return {
		loading,
		list,
		paginationData,
	};
}

export default useBadgeConfigurationList;
