import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useBookShipment = ({ checkout_id }) => {
	const {
		general: { query = {} },
	} = useSelector((reduxState) => reduxState);

	const { partner_id = '', shipment_id = '' } = query;

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/book_checkout',
	}, { manual: true });

	const bookShipment = async () => {
		const params = {
			id: checkout_id,
		};

		try {
			const res = await trigger({ data: params });

			const newHref = `${window.location.origin}/${partner_id}/shipments/${shipment_id || res.data.shipment_id}`;
			window.location.href = newHref;
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		bookShipment,
		loading,
	};
};

export default useBookShipment;
