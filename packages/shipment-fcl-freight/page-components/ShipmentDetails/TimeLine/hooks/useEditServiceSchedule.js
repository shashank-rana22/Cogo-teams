import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useContext } from 'react';

import controls from '../EditSchedule/controls';
import { getDateDefaultValue } from '../utils/formatters';

export default function useEditServiceSchedule({
	setShow = () => {},
	timelineData = [],
}) {
	const { shipment_data, primary_service, refetch: shipmentRefetch } = useContext(ShipmentDetailContext);

	const [departureDate, setDepartureDate] = useState(getDateDefaultValue(primary_service?.schedule_departure));

	const [{ loading }, updateShipmentService] = useRequest({
		url    : 'update_shipment_service',
		method : 'POST',
	}, { manual: true });

	const { finalControls, defaultValues } = controls({ primary_service, departureDate, timelineData });

	const { handleSubmit: formSubmit, formState: { errors }, watch, reset, control } = useForm({ defaultValues });

	const formValues = watch();

	useEffect(() => {
		const { schedule_departure } = formValues || {};
		console.log(schedule_departure, departureDate);
		if (schedule_departure.toDateString() !== departureDate.toDateString()) {
			setDepartureDate(schedule_departure);

			const newDefaultValues = {};
			finalControls.forEach(({ name }) => {
				newDefaultValues[name] = (name === 'schedule_arrival'
					? formValues[name] < schedule_departure
					: formValues[name] > schedule_departure)
					? '' : formValues[name];
			});
			reset(newDefaultValues);
		}
	}, [formValues, departureDate, reset, finalControls]);

	const updateData = async (values) => {
		const mainServiceIds = shipment_data?.all_services
			?.filter((item) => item?.service_type === primary_service?.service_name)
			?.map((service) => service?.id);

		const payloadForUpdateShipment = {
			ids                 : mainServiceIds,
			performed_by_org_id : primary_service?.service_provider_id,
			data                : ['vessel_arrived'].includes(
				primary_service?.state,
			)
				? { schedule_arrival: values?.schedule_arrival }
				: { ...values },
			service_type: primary_service?.service_name,
		};

		try {
			const res = await updateShipmentService({ data: payloadForUpdateShipment });

			if (res.status === 200) {
				Toast.success('Booking Note Updated Successfully !');
				setShow(false);
				shipmentRefetch();
			} else {
				Toast.error(JSON.stringify(res?.data));
			}
		} catch (err) {
			Toast.error(err.message);
		}
	};

	return {
		loading,
		updateData,
		finalControls,
		formSubmit,
		errors,
		control,
	};
}
