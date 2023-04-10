import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateShipmentOperatingInstruction = ({
	procedure_id = '',
	instruction = '',
	successMessage = 'Successfully Update',
	refetch = () => { },
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_operating_instruction',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			await trigger({ params: { instruction, procedure_id, ...val } });

			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useUpdateShipmentOperatingInstruction;
