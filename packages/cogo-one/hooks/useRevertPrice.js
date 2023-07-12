import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getPayload from '../helpers/getRevertPricePayload';
import { formatLineItems, formatFirstLineItem } from '../helpers/revertPriceHelpers';

import useSendFlashRateRevertNotificationOnEmail from './useSendFlashRateRevertNotificationOnEmail';

const useRevertPrice = ({ item, setModalState, shipmentFlashBookingRates, chargeableWeight, userId = '' }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_flash_booking_rate',
		method : 'post',
	}, { manual: true });

	const { sendNotificationEmail = () => {} } = useSendFlashRateRevertNotificationOnEmail({ userId });

	const { line_items = [], id = '', service_type } = item || {};

	const handleRevertPrice = async (values) => {
		try {
			let lineItemsParams = formatLineItems({ lineItems: line_items, values });

			if (isEmpty(lineItemsParams) && !isEmpty(line_items)) {
				lineItemsParams = formatFirstLineItem({ lineItems: line_items, values });
			}

			if (isEmpty(lineItemsParams)) {
				Toast.error(
					'You can not revert to this live booking - No LineItems!!',
				);
				return;
			}

			const response = await trigger({
				data: getPayload({ lineItemsParams, values, id, service_type, chargeableWeight }),
			});

			if (response?.data?.id) {
				await sendNotificationEmail({ response });
			}

			Toast.success('Price successfully reverted.');
			shipmentFlashBookingRates({ page: 1 });
			setModalState({ isOpen: false, data: {} });
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		handleRevertPrice,
	};
};

export default useRevertPrice;
