import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

function useUpdateLeadUser({ listLeadsData = {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_lead_user',
		method : 'POST',
	}, { manual: true });

	const updateLeadUser = async ({ payload }) => {
		try {
			await trigger({ data: payload });

			Toast.success('Successful');
		} catch (error) {
			toastApiError(error);
		}
	};

	const onUpdateLeadUser = (values) => {
		const { name, email, mobile_number } = values;

		const PAYLOAD = {
			name,
			email,
			mobile_number        : mobile_number?.number,
			mobile_country_code  : mobile_number?.country_code,
			lead_organization_id : listLeadsData?.id,
		};

		updateLeadUser({ payload: PAYLOAD });
	};

	return {
		updateLoading: loading,
		onUpdateLeadUser,
	};
}

export default useUpdateLeadUser;
