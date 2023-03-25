import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentStakeholders = ({
	shipment_id = '',
	successMessage = 'Successfully Update',
	refetch = () => { },
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_operating_instruction',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ params: { id: shipment_id, ...val } });
			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
			}
		} catch (err) {
			console.log({ err });
		}
	};

	return {
		apiTrigger,
		loading,
	};
};
export default useUpdateShipmentStakeholders;
// todo
