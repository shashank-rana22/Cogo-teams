import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

const useCreateOrganizationBillingAddress = ({
	checked,
	addressType,
	organization_id = '',
	successMessage = 'Successfully Added Address',
}) => {
	const END_POINT = checked ? '/create_organization_billing_address' : '/create_organization_address';

	const [{ loading, data }, trigger] = useRequest({
		url    : END_POINT,
		method : 'POST',
	}, { manual: true });

	const createSellerAddres = async (item, handleCloseModal) => {
		const { poc_name, email, phoneNumber, ...rest } = item || {};
		const { number, country_code } = phoneNumber || {};
		try {
			const resp = await trigger({
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
			Toast.success(successMessage, {
				autoClose : 5000,
				style     : { background: '#f2fff1' },
			});
			handleCloseModal();
			return resp;
		} catch (error) {
			Toast.error(
				error?.error?.gst_number?.[GLOBAL_CONSTANTS.zeroth_index]?.toUpperCase()
					|| error?.error?.pincode?.[GLOBAL_CONSTANTS.zeroth_index]?.toUpperCase(),
				{
					autoClose : 7000,
					style     : { backgroundColor: 'white' },
				},
			);
			return null;
		}
	};

	return {
		createSellerAddres,
		createAddressLoading : loading,
		response             : data,
	};
};

export default useCreateOrganizationBillingAddress;
