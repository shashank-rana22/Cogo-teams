import { useRequest } from '@cogoport/request';

function useUpdateOrganizationEvaluationTask({
	id, reason, yourScore, setShow,
	getOrganizationEvaluationDetails,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_evaluation_task',
	}, { manual: true });

	const updateOrganizationEvaluationTask = async () => {
		try {
			await trigger({
				params: {
					score_received : yourScore,
					id,
					feedback       : reason,
					status         : 'active',
				},
			});
			setShow(null);
			getOrganizationEvaluationDetails();
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		updateOrganizationEvaluationTask,
	};
}
export default useUpdateOrganizationEvaluationTask;
