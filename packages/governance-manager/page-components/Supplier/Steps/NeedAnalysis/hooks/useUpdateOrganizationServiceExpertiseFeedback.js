import { useRequest } from '@cogoport/request';

function useUpdateOrganizationServiceExpertiseFeedback({ show, feedback, service_requirement, setShow }) {
	const FIFTY = 50;
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_service_expertise_feedback',
	}, { manual: true });

	const UpdateOrganizationServiceExpertiseFeedback = async () => {
		try {
			if (feedback?.length >= FIFTY && service_requirement !== '') {
				await trigger({
					params: {
						...show,
						feedback,
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
		data,
		loading,
		UpdateOrganizationServiceExpertiseFeedback,
	};
}
export default useUpdateOrganizationServiceExpertiseFeedback;
