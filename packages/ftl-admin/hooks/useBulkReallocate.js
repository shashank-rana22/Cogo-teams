import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import toastApiError from '../common/ToastApiError';

const useBulkReallocate = ({ list = [] }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/bulk_reallocate_shipment_stakeholders',
		method : 'POST',
	}, { manual: true });

	const bulkReallocate = async ({ shipmentIds = new Set(), stakeholderData = {}, callBack = () => {} }) => {
		const { stakeholder = '', stakeholder_type = '' } = stakeholderData || {};
		if (isEmpty(stakeholder) || isEmpty(stakeholder_type)) {
			Toast.error('Please Enter data in Empty fields');
			return;
		}
		const PAYLOAD = [];
		if (stakeholder_type === 'booking_agent') {
			shipmentIds?.forEach((id) => {
				PAYLOAD.push({
					shipment_id    : id,
					stakeholder_id : stakeholder,
					stakeholder_type,

				});
			});
		} else {
			const selectedServices = list?.reduce((acc, item) => {
				if (shipmentIds.has(item?.id)) {
					item?.freight_services?.forEach((service) => {
						acc.push({ s_id: item?.id, service_id: service?.id });
					});
				}
				return acc;
			}, []);

			selectedServices.forEach((service) => {
				PAYLOAD.push({
					shipment_id    : service?.s_id,
					stakeholder_id : stakeholder,
					stakeholder_type,
					service_type   : 'ftl_freight_service',
					service_id     : service?.service_id,
				});
			});
		}

		try {
			await trigger({
				data: {
					update_data: PAYLOAD,
				},
			});
			Toast.success('Re-Allocation Successfull!!');
			callBack();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		bulkReallocate,
		loading,
		data,
	};
};

export default useBulkReallocate;
