import { useHarbourRequest } from '@cogoport/request';

const useGetBranchStats = () => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/list_company_location',
	}, { manual: false });

	return { loading, data };
};

export default useGetBranchStats;
