import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

function useUpdateOrganizationServiceExpertiseFeedback({
	show,
	feedback, service_requirement, setShow,
	getOrganizationExpertiseSuppliers,
}) {
	const FIFTY = GLOBAL_CONSTANTS.fifty;
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_service_expertise_parameter',
	}, { manual: true });

	const updateOrganizationServiceExpertiseFeedback = async () => {
		try {
			if (feedback?.length >= FIFTY && service_requirement !== '') {
				await trigger({
					params: {
						id     : show?.id,
						feedback,
						service_requirement,
						status : 'active',
					},
				});
				getOrganizationExpertiseSuppliers();
				setShow(null);
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
