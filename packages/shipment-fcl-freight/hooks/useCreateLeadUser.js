import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

function useCreateLeadUser({ listLeadsData = {}, refetchList = () => {}, setShowCreatePoc = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_user',
		method : 'POST',
	}, { manual: true });

	const createLeadUser = async ({ payload }) => {
		try {
			await trigger({ data: payload });

			Toast.success('Successful');

			setShowCreatePoc(false);

			refetchList();
		} catch (error) {
			toastApiError(error);
		}
	};

	const onCreateLeadUser = (values) => {
		const { new_name, new_email, new_mobile_number } = values;

		const PAYLOAD = {
			name                 : new_name,
			email                : new_email,
			mobile_number        : new_mobile_number?.number,
			mobile_country_code  : new_mobile_number?.country_code,
			lead_organization_id : listLeadsData?.id,
		};

		createLeadUser({ payload: PAYLOAD });
	};

	return {
		createLoading: loading,
		onCreateLeadUser,
	};
}

export default useCreateLeadUser;
