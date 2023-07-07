import { useRequest } from '@cogoport/request';

function useUpdateOrganizationServiceExpertiseFeedback({ id, feedback, service_requirement, setShow }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_service_expertise_feedback',
	}, { manual: true });

	const UpdateOrganizationServiceExpertiseFeedback = async () => {
		try {
			if (feedback?.length >= 50 && service_requirement !== '') {
				await trigger({
					params: {
						feedback,
						id,
						service_requirement,
						status: 'active',
					},
				});
				setShow('');
			}
		} catch (err) {
			console.log(err);
		}
	};
	return {
		loading,
		UpdateOrganizationServiceExpertiseFeedback,
	};
}
export default useUpdateOrganizationServiceExpertiseFeedback;
