import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateOrganizationLineItemAlias = ({
	setEditLineItemData,
	getCheckout,
}) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_organization_line_item_alias',
	}, { manual: true });

	const createOrganizationLineItemAlias = async ({ values }) => {
		try {
			await trigger({ data: values });

			await getCheckout();
			setEditLineItemData({});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		createOrganizationLineItemAlias,
		loading,
	};
};

export default useCreateOrganizationLineItemAlias;
