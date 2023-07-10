import { useRequest } from '@cogoport/request';

function useUpdateOrganizationEvaluationTask({ id, feedback, service_requirement, setShow }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_evaluation_task',
	}, { manual: true });

	const UpdateOrganizationEvaluationTask = async () => {
		try {
			await trigger({
				params: {
					feedback,
					id,
					service_requirement,
					status: 'active',
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
		UpdateOrganizationEvaluationTask,
	};
}
export default useUpdateOrganizationEvaluationTask;
