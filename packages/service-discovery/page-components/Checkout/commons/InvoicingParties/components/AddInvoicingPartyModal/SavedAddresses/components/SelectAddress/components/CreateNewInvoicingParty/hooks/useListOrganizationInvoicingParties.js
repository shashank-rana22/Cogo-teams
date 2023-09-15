import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useListOrganizationInvoicingParties = ({ organizationId, bookingType }) => {
	const params = {
		filters: {
			organization_id  : organizationId,
			status           : 'active',
			trade_party_type : bookingType,
		},
		pagination_data_required        : false,
		billing_addresses_data_required : true,
		documents_data_required         : true,
		other_addresses_data_required   : true,
	};

	const [{ data = {}, loading }, trigger] = useRequest(
		{
			url    : '/list_organization_invoicing_parties',
			method : 'GET',
		},
		{ manual: true },
	);

	const listOrganizationInvoicingParties = () => {
		try {
			trigger({ payload: params });
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		data,
		loading,
		listOrganizationInvoicingParties,
	};
};

export default useListOrganizationInvoicingParties;
