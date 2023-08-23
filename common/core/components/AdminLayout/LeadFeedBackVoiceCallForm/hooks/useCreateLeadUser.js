import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ leadOrgId = '', values }) => {
	const { name = '', email = '', mobile_number_data = {} } = values || {};

	const {
		mobile_country_code = '',
		mobile_number = '',
	} = mobile_number_data;

	return {
		lead_organization_id: leadOrgId,
		name,
		mobile_country_code,
		mobile_number,
		email,
	};
};

function useCreateLeadUser({ leadOrgId = '', onChange = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_user',
		method : 'post',
	}, { manual: true });

	const createLeadUser = async (values = {}) => {
		try {
			const res = await trigger({
				data: getPayload({ leadOrgId, values }),
			});

			onChange({ lead_user_id: res?.data?.id, name: values?.name });
			Toast.success('Successfully Created');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		createLeadUser,
		loading,
	};
}
export default useCreateLeadUser;
