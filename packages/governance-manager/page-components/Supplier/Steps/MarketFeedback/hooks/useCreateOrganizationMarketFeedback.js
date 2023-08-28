import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateOrganizationMarketFeedback = ({
	updateOrganizationService,
	service_id,
	service_type,
	organization_id,
}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_organization_service_market_feedback',
	}, { manual: true });

	const createMarketFeedbackActive = async (values) => {
		await trigger({
			params: {
				service_id,
				service_type,
				users  : values?.emails,
				status : 'active',
				organization_id,
			},
		});
		await updateOrganizationService();
	};

	const createMarketFeedbackDraft = async (values) => {
		await trigger({
			params: {
				service_id,
				service_type,
				users  : values?.emails,
				status : 'draft',
				organization_id,
			},
		});
		Toast.success('Saved');
	};

	return {
		createMarketFeedbackActive,
		createMarketFeedbackDraft,
		data,
		loading,
	};
};
export default useCreateOrganizationMarketFeedback;
