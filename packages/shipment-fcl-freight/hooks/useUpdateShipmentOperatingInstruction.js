import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

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
			const res = await trigger({ params: { instruction, procedure_id, ...val } });
			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
			}
		} catch (err) {
			Toast.error({ err });
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useUpdateShipmentOperatingInstruction;
