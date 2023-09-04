import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import getShipmentTypeFromUrl from '../../../helpers/getShipmentTypeFromUrl';

const useBookShipment = ({
	checkout_id = '',
	rfq_id = '',
	checkout_type = '',
	detail = {},
	setIsShipmentCreated = () => {},
	urlMapping = {},
}) => {
	const { push } = useRouter();

	const {
		general: { query = {} },
	} = useSelector((reduxState) => reduxState);

	const shipmentType = getShipmentTypeFromUrl() || detail?.primary_service;

	const { partner_id = '', shipment_id = '' } = query;

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/book_checkout',
	}, { manual: true });

	const bookShipment = async () => {
		const params = {
			id                   : checkout_id,
			existing_shipment_id : shipment_id || undefined,
		};

		try {
			if (checkout_type === 'rfq') {
				const newHref = `${window.location.origin}/${partner_id}/rfq/${rfq_id}/overview`;
				window.location.href = newHref;
				return;
			}
			const res = await trigger({ data: params });

			setIsShipmentCreated(true);

			Toast.success('Shipment booked successflly');

			if (urlMapping[shipmentType]) {
				push(`/booking/${urlMapping[shipmentType]}/${
					shipment_id || res?.data?.shipment_id
				}`);
			} else {
				const newHref = `${window.location.origin}/
				${partner_id}/shipments/${shipment_id || res?.data?.shipment_id}`;

				window.location.href = newHref;
			}
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
