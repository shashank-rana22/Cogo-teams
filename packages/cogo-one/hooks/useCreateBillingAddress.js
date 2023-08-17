import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ data = {}, isIncludeTaxNumber = false, orgId = '' }) => {
	const { poc_name = '', phone_number : phoneNumber = {}, address_type: addressType = '', ...rest } = data || {};
	const { number = '', country_code = '' } = phoneNumber || {};

	return {
		...rest,
		poc_details:
			poc_name || number || country_code
				? [{
					name          : poc_name || undefined,
					mobile_number : number || undefined,
					mobile_code   : country_code || undefined,
				}]
				: [],
		address_type    : !isIncludeTaxNumber ? addressType : undefined,
		organization_id : orgId,
	};
};

const useCreateBillingAddress = ({
	orgId = '',
	isIncludeTaxNumber = false,
	getOrganizationAddresses = () => {},
	setIsAddressModal = () => {},
	reset = () => {},
	setSelectedAddress = () => {},
}) => {
	const apiEndpoint = isIncludeTaxNumber ? '/create_organization_billing_address' : '/create_organization_address';

	const [{ loading }, trigger] = useRequest({
		url    : apiEndpoint,
		method : 'post',
	}, { manual: true });

	const createBillingAddress = async ({ data = {} }) => {
		try {
			const response = await trigger({
				data: getPayload({ data, isIncludeTaxNumber, orgId }),
			});

			const { id = '' } = response?.data || {};
			await setSelectedAddress({ id });
			await reset();
			await setIsAddressModal(false);
			await getOrganizationAddresses();
			Toast.success('Address added successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		createBillingAddress,
		loading,
	};
};

export default useCreateBillingAddress;
