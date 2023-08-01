import { useRequest } from '@cogoport/request';

function useUpdateOrganizationMarketFeedbackVerificationStatus({
	organization_id,
	service_id,
	service_type,
	setOpen,
	getOrganizationSupplierVerificationDetails,

}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_market_feedback_verification_status',
	}, { manual: true });

	const updateOrganizationMarketFeedbackVerificationStatus = async ({ verification_status }) => {
		try {
			await trigger({
				params: {
					organization_id,
					service_id,
					service_type,
					verification_status,
				},
			});
			getOrganizationSupplierVerificationDetails();
			setOpen(null);
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		updateOrganizationMarketFeedbackVerificationStatus,
	};
}

export default useUpdateOrganizationMarketFeedbackVerificationStatus;
