import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

const useCreateOrganizationBillingAddress = ({
	checked,
	addressType,
	organization_id = '',
	successMessage = 'Successfully Added Address',
	refetch = () => {},
}) => {
	const END_POINT = checked ? '/create_organization_billing_address' : '/create_organization_address';

	const [{ loading, data }, trigger] = useRequest({
		url    : END_POINT,
		method : 'POST',
	}, { manual: true });

	const createSellerAddres = async (item) => {
		const { poc_name, email, phoneNumber, ...rest } = item || {};
		const { number, country_code } = phoneNumber || {};
		try {
			await trigger({
				data: {
					...rest,
					poc_details:
						poc_name || number || country_code
							? [
								{
									name          : poc_name,
									mobile_number : number,
									mobile_code   : country_code,
								},
							]
							: [],
					address_type: checked ? '' : addressType,
					organization_id,
				},
			});
			Toast.success(successMessage);
			refetch();
		} catch (error) {
			Toast.error(getApiError(error?.response?.data));
		}
	};

	return {
		createSellerAddres,
		createAddressLoading: loading,
		data,
	};
};

export default useCreateOrganizationBillingAddress;
