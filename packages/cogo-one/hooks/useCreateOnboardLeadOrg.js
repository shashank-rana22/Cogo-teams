import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ values }) => {
	const { company_name = '', name = '', email_id = '', country_id = '', mobile_number = {} } = values || {};

	const {
		country_code = '',
		number = '',
	} = mobile_number;

	return {
		country_id,
		business_name     : company_name,
		lead_user_tags    : ['cogo_one'],
		primary_lead_user : {
			name,
			email               : email_id,
			mobile_number       : number,
			mobile_country_code : country_code,
		},
	};
};

function useCreateOnboardLeadOrg({ setCreateLeadModal = () => {}, reset = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/onboard_lead_organization',
		method : 'post',
	}, { manual: true });

	const createLeadUser = async (values = {}) => {
		try {
			await trigger({
				data: getPayload({ values }),
			});
			reset();
			setCreateLeadModal(false);
			Toast.success('Successfully added the contact');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'something went wrong');
		}
	};

	return {
		createLeadUser,
		loading,
	};
}
export default useCreateOnboardLeadOrg;
