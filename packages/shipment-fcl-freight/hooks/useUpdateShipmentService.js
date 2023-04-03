import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

import getApiErrorString from '../utils/getApiErrorString';

const useUpdateShipmentService = ({
	serviceData = [],
	setShow = () => {},
	refetch = () => {},
	refetchServices = () => {},
}) => {
	const { handleSubmit, control, formState: { errors }, reset } = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_service',
		method : 'POST',
	});

	const onUpdate = async (values) => {
		const payload = {
			ids                 : serviceData?.map((item) => item?.id),
			data                : { ...values },
			service_type        : serviceData?.[0]?.service_type,
			performed_by_org_id : serviceData?.[0]?.importer_exporter_id,
		};

		try {
			const res = await trigger({ data: payload });

			if (res.status === 200) {
				Toast.success('Service updated successfully!');
				reset();
				refetch();
				refetchServices();
				setShow(false);
			}
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		onUpdate,
		errors,
		handleSubmit,
		control,
		loading,
	};
};

export default useUpdateShipmentService;
