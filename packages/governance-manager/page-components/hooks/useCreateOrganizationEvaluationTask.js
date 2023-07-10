import { useRequest } from '@cogoport/request';

function useCreateOrganizationEvaluationTask({ id, organization_id, feedback, service_requirement, setShow }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_organization_evaluation_task',
	}, { manual: true });

	const createOrganizationEvaluationTask = async () => {
		try {
			await trigger({
				params: {
					feedback,
					organization_id,
					organization_service_id : id,
					service_requirement,
					status                  : 'active',
				},
			});
			setShow('');
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		createOrganizationEvaluationTask,
	};
}
export default useCreateOrganizationEvaluationTask;
