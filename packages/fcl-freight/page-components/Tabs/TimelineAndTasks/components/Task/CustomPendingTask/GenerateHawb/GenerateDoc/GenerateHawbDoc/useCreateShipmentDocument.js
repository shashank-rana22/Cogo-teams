import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';
import { useState } from 'react';

const useCreateShipmentDocument = ({ completeTask = () => {} }) => {
	const [active, setActive] = useState(true);
	const {
		general: { scope },
	} = useSelector((state) => state);

	const { trigger, loading } = useRequest(
		'post',
		false,
		scope,
	)('/create_shipment_document');

	const upload = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
			toast.success('Document saved successfully');
			setActive(false);
			completeTask();
		} catch (error) {
			toast.error(error);
		}
	};

	return {
		upload,
		loading,
		active,
	};
};

export default useCreateShipmentDocument;
