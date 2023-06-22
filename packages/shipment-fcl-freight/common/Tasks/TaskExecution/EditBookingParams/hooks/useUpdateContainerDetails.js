import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useUpdateShipmentBookingParamter from '../../../../../hooks/useUpdateShipmentBookingParameter';
import { groupConainerDetails } from '../helpers/groupContainerDetails';
import {
	formatForContainerDetails,
	formatForBookingParams,
} from '../helpers/payloadFormatters';

const useUpdateContainerDetails = ({
	getApisData,
	task,
	formProps,
}) => {
	const { list_shipment_container_details = [] } = getApisData || {};
	const total_containers_count = (list_shipment_container_details || []).length;

	const { servicesList = [] } = useContext(ShipmentDetailContext);

	const { watch, trigger: formTrigger, setValue } = formProps || {};

	const formValues = watch();

	const groupedData = groupConainerDetails(
		list_shipment_container_details || [],
		task,
	);

	const { apiTrigger: updateBookingParams } = useUpdateShipmentBookingParamter();

	const updateData = async (
		selectedContainers,
		promiseResolve,
		promiseReject,
	) => {
		const bookingParamPayload = formatForBookingParams({
			rawData: selectedContainers,
			formValues,
			task,
			servicesList,
		});

		const additionalDataToSend = formatForContainerDetails({ rawData: selectedContainers, formValues });

		try {
			await updateBookingParams(bookingParamPayload);
			setValue('editBookingParams', additionalDataToSend);
			promiseResolve();
		} catch (e) {
			promiseReject();
		}
	};

	return {
		updateData,
		total_containers_count,
		formValues,
		groupedData,
		formTrigger,
	};
};

export default useUpdateContainerDetails;
