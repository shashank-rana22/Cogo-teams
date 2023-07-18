import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const LINE_ITEMS_CODE = ['BAS', 'BASNO'];
const useUpdateRevenueDeskShipmentSellQuotation = ({
	sellData = {},
	updateShipmentPendingTask = () => {},
	task = {},
}) => {
	const newLineItems = sellData?.sell_line_items;

	const payload = {
		service_id   : sellData?.service_id,
		service_type : 'air_freight_service',
	};

	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_sell_quotations',
		method : 'POST',
	}, { manual: true });

	const updateShipmentSellQuotation = async (values) => {
		(newLineItems || []).forEach((item) => {
			const lineItem = item;
			if (LINE_ITEMS_CODE.includes(item?.code)) {
				lineItem.price_discounted = values.sell_price;
				lineItem.quantity = values.chargeable_weight;
			}
		});
		try {
			await trigger({
				data: {
					quotations: [
						{
							...payload,
							line_items: newLineItems,
						},
					],
					pending_task_id: task?.id,
				},
			});
			Toast.success('Sell price Successfully updated !');
			updateShipmentPendingTask();
		} catch (err) {
			Toast.error(toastApiError(err?.data || 'something went wrong!'));
		}
	};

	return { updateShipmentSellQuotation, loading };
};

export default useUpdateRevenueDeskShipmentSellQuotation;
