import { Toast } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsOperators, asyncFieldsLocations,
}
	from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';

import controls from '../CreateServiceLane/controls';

const useCreateServiceLane = ({
	makeRequest,
	formValues,
	setShowModal,
	watch,
}) => {
	const handleClose = () => {
		setShowModal(false);
	};

	const no_of_ports = watch('port_number');

	const createRefetch = () => {
		makeRequest();
	};
	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: 'shipping_line' } } },
	));
	const locationOptions = useGetAsyncOptions(merge(
		asyncFieldsLocations(),
		{ params: { filters: { type: 'seaport' } } },
	));
	const fields = controls(no_of_ports, shippingLineOptions, locationOptions);
	const [{ loading }, trigger] = useRequest({
		url    : '/create_service_lane',
		method : 'POST',
	}, { manual: true });

	const createServiceLane = async () => {
		try {
			await trigger({ data: formValues });

			Toast.success('Successfully Created');
			// refetch();
			handleClose();
		} catch (err) {
			Toast.error(err);
			handleClose();
		}
	};
	return {
		loading,
		createServiceLane,
		handleClose,
		fields,
	};
};
export default useCreateServiceLane;
