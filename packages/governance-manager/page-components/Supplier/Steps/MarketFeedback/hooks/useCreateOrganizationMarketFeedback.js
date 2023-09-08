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
		try {
			await trigger({
				params: {
					service_id,
					service_type,
					users: values?.emails?.map((emailItem) => ({
						...emailItem,
						user_email : emailItem?.user_email?.toLowerCase(),
						status     : 'active',
					})),
					organization_id,
				},
			});
			await updateOrganizationService();
		} catch (err) {
			console.log(err);
		}
	};

	const createMarketFeedbackDraft = async (values) => {
		try {
			await trigger({
				params: {
					service_id,
					service_type,
					users: values?.emails?.map((emailItem) => ({
						...emailItem,
						user_email : emailItem?.user_email?.toLowerCase(),
						status     : 'draft',
					})),
					organization_id,
				},
			});
			Toast.success('Saved');
		} catch (err) {
			console.log(err);
		}
	};

	return {
		createMarketFeedbackActive,
		createMarketFeedbackDraft,
		data,
		loading,
	};
};
export default useCreateOrganizationMarketFeedback;
