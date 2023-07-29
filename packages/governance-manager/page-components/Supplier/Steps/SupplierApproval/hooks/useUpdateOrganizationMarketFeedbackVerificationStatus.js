import { useRequest } from '@cogoport/request';

const ZERO = 0;
function useUpdateOrganizationMarketFeedbackVerificationStatus({
	organization_id,
	service_id,
	service_type,
	setOpen,
}) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_market_feedback_verification_status',
	}, { manual: true });

	const UpdateOrganizationMarketFeedbackVerificationStatus = async ({ verification_status }) => {
		try {
			await trigger({
				params: {
					organization_id,
					service_id,
					service_type,
					verification_status,
				},
			});
			setOpen(ZERO);
		} catch (err) {
			console.log(err);
		}
	};
	return {
		data,
		loading,
		UpdateOrganizationMarketFeedbackVerificationStatus,
	};
}

export default useUpdateOrganizationMarketFeedbackVerificationStatus;
