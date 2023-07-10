import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetOrganizationEvaluationDetails({ organization_id, id }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_organization_evaluation_details',
	}, { manual: true });

	const getOrganizationEvaluationDetails = async () => {
		try {
			await trigger({
				params: {
					organization_id,
					organization_service_id: id,
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
		data: data?.list,
		loading,
	};
}
export default useGetOrganizationEvaluationDetails;
