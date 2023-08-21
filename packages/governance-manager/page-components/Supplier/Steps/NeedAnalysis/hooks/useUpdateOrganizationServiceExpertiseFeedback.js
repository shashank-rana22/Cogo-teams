import { useRequest } from '@cogoport/request';

function useUpdateOrganizationServiceExpertiseFeedback({
	show,
	feedback, service_requirement, setShow,
	getOrganizationExpertiseSuppliers,
}) {
	const FIFTY = 50;
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_service_expertise_feedback',
	}, { manual: true });

	const updateOrganizationServiceExpertiseFeedback = async () => {
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
				getOrganizationExpertiseSuppliers();
				setShow('');
			}
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		updateOrganizationServiceExpertiseFeedback,
	};
}
export default useUpdateOrganizationServiceExpertiseFeedback;
