import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateShipmentOperatingInstruction = ({
	procedure_id = '',
	shipment_id = '',
	organization_id = '',
	refetch = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [loading, setLoading] = useState(false);
	const [{ loading:apiLoading }, trigger] = useRequest({
		url    : '/create_shipment_operating_instruction',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		setLoading(true);
		try {
			const res = await trigger({ params: { procedure_id, shipment_id, organization_id, ...val } });
			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
				setLoading(false);
			}
		} catch (err) {
			setLoading(false);
			console.log({ err });
		}
	};

	return {
		apiTrigger,
		loading: apiLoading || loading,
	};
};

export default useCreateShipmentOperatingInstruction;
