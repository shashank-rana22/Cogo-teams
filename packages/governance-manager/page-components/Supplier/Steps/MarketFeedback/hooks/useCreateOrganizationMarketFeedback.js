import { useRequest } from '@cogoport/request';

const useCreateOrganizationMarketFeedback = ({
	UpdateOrganizationService,
	service_id,
	service_type,
	organization_id,
}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_organization_market_feedback',
	}, { manual: true });

	const createMarketFeedback = async (values) => {
		await trigger({
			params: {
				service_id,
				service_type,
				users: values?.emails,
				organization_id,
			},
		});
		await UpdateOrganizationService();
	};
	return {
		createMarketFeedback,
		data,
		loading,
	};
};
export default useCreateOrganizationMarketFeedback;
