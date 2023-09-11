import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetOrganizationEvaluationDetails({ id, organization_id }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_organization_service_evaluation_details',
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
		data                            : data?.organization_evaluation_tasks,
		organization_evaulation_details : data?.organization_evaluation,
		loading,
		getOrganizationEvaluationDetails,
	};
}
export default useGetOrganizationEvaluationDetails;
