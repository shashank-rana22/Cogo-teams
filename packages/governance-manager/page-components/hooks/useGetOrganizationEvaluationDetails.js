import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetOrganizationEvaluationDetails({ id }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_organization_evaluation_details',
	}, { manual: true });

	const getOrganizationEvaluationDetails = async () => {
		try {
			await trigger({
				params: {
					organization_id         : '4c2dfeba-c715-4614-8a93-e051a270981d',
					organization_service_id : '0070b707-c404-4ee5-ac5c-fd7ae8ca0f61',
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (id) { getOrganizationEvaluationDetails(); }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data: data?.organization_evaluation_tasks,
		loading,
	};
}
export default useGetOrganizationEvaluationDetails;
