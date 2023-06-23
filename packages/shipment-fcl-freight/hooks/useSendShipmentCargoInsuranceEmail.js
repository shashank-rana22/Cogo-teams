import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

const useSendShipmentCargoInsuranceEmail = ({ successMessage = 'Email sent to customer successfully!' }) => {
	const { shipment_data = {} } = useContext(ShipmentDetailContext);
	const [{ loading }, trigger] = useRequest({
		url    : '/send_shipment_cargo_insurance_email',
		method : 'POST',
	}, { manual: true });

	const sendCustomerEmail = async () => {
		try {
			await trigger({
				data: {
					shipment_id: shipment_data?.id,
				},
			});
			Toast.success(successMessage);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		sendCustomerEmail,
	};
};

export default useSendShipmentCargoInsuranceEmail;
