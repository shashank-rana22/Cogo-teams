import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const DEFAULT_VALUE = 0;

const useUpdateCustomizeQuotation = ({ setAddLineItemData, setRateDetails, getCheckout, index }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_checkout_customize_quotation',
	}, { manual: true });

	const updateCustomizeQuotation = async ({ values }) => {
		try {
			await trigger({ data: values });

			setAddLineItemData({});

			const { data, hasError } = await getCheckout();

			if (!hasError) {
				const { rate = {} } = data;

				const { services = {} } = rate;

				const requiredLineItems = Object.values(services).map((serviceItem) => serviceItem)?.[index]?.line_items;

				let newlyAddedLineItem = requiredLineItems[requiredLineItems.length - 1];

				console.log('newlyAddedLineItemnewlyAddedLineItem', newlyAddedLineItem);

				setRateDetails((prev) => prev.map((rateItem, rateIndex) => {
					if (rateIndex !== index) {
						return rateItem;
					}

					const { line_items } = rateItem;

					const newlyAddedFilteredMarginObject = (newlyAddedLineItem?.margins || []).filter(
						(m) => m.margin_type === 'demand',
					);

					let newlyAddedFilteredMargin;

					if (newlyAddedFilteredMarginObject?.length) {
						const [margin] = newlyAddedFilteredMarginObject;
						let type = margin?.type;
						let value = margin?.value || DEFAULT_VALUE;

						if (type === 'percentage') {
							type = 'absolute_total';
							value = margin?.total_margin_value;
						}

						newlyAddedFilteredMargin = {
							type,
							value,
							currency : margin?.currency || newlyAddedLineItem?.currency,
							code     : margin?.code,
						};
					} else {
						newlyAddedFilteredMargin = {
							type     : 'absolute_unit',
							value    : 0,
							currency : newlyAddedLineItem?.currency,
							code     : newlyAddedLineItem?.code,
						};
					}

					console.log('newlyAddedLineItem', newlyAddedLineItem);

					newlyAddedLineItem = { ...newlyAddedLineItem, filteredMargins: newlyAddedFilteredMargin };

					const updatedLineItems = [...line_items, newlyAddedLineItem];

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
		updateCustomizeQuotation,
		loading,
	};
};

export default useUpdateCustomizeQuotation;
