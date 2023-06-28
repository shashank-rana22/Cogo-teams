import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import useGetCheckout from './useGetCheckout';

const useCreateOrganizationLineItemAlias = ({
	setEditLineItemData,
	setRateDetails,
	index,
	checkout_id,
}) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_organization_line_item_alias',
	}, { manual: true });

	const { trigger:triggerCheckout } = useGetCheckout({ checkout_id });

	const createOrganizationLineItemAlias = async ({ values, code }) => {
		try {
			await trigger({ data: values });

			const res = await triggerCheckout({ params: { id: checkout_id } });

			const { data = {} } = res || {};

			const { rate = {} } = data || {};

			setEditLineItemData({});

			if (!isEmpty(data)) {
				setRateDetails((prev) => prev.map((rateItem, rateIndex) => {
					if (rateIndex !== index) {
						return rateItem;
					}

					const { line_items } = rateItem;

					const updatedServicesLineItems = Object.values(rate?.services)[index].line_items;

					const updatedName = updatedServicesLineItems.find((lineItem) => lineItem.code === code).name;

					const updatedLineItems = line_items.map((lineItem) => {
						const { code:lineItemCode } = lineItem;

						if (code === lineItemCode) {
							return { ...lineItem, name: updatedName };
						}

						return lineItem;
					});

					return { ...rateItem, line_items: updatedLineItems };
				}));
			}
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
