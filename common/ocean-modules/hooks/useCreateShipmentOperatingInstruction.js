import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useCreateShipmentOperatingInstruction = ({
	procedure_id = '',
	shipment_id = '',
	organization_id = '',
	refetch = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_operating_instruction',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ data: { procedure_id, shipment_id, organization_id, ...val } });
			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useCreateShipmentOperatingInstruction;
