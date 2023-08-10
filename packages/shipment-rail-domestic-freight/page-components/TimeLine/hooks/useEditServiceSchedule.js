import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useState, useEffect, useContext } from 'react';

import useUpdateShipmentService from '../../../hooks/useUpdateShipmentService';
import controls from '../EditSchedule/controls';
import { getDate } from '../utils/getDate';

export default function useEditServiceSchedule({ setShow = () => {} }) {
	const { servicesList, primary_service, refetch: shipmentRefetch = () => {} } = useContext(ShipmentDetailContext);

	const [departureDate, setDepartureDate] = useState(getDate(primary_service?.schedule_departure));

	const { apiTrigger: updateShipmentService, loading } = useUpdateShipmentService({
		successMessage : 'Booking Note Updated Successfully !',
		refetch        : () => {
			setShow(false);
			shipmentRefetch();
		},
	});

	const { finalControls, defaultValues } = controls({ primary_service, departureDate });

	const { handleSubmit: formSubmit, formState: { errors }, watch, reset, control } = useForm({ defaultValues });

	const formValues = watch();

	useEffect(() => {
		const { schedule_departure } = formValues || {};

		if (schedule_departure && schedule_departure?.toDateString() !== departureDate?.toDateString()) {
			setDepartureDate(schedule_departure);

			const newDefaultValues = {};

			finalControls.forEach(({ name }) => {
				newDefaultValues[name] = (name === 'schedule_arrival'
					? formValues?.[name] < schedule_departure
					: formValues?.[name] > schedule_departure)
					? null : formValues?.[name];
			});

			reset(newDefaultValues);
		}
	}, [formValues, departureDate, reset, finalControls]);

	const updateData = (values) => {
		const mainServiceIds = (servicesList || [])
			?.filter((item) => item?.service_type === primary_service?.service_type)
			?.map((service) => service?.id);

		const payloadForUpdateShipment = {
			ids                 : mainServiceIds,
			performed_by_org_id : primary_service?.service_provider?.id,
			data                : ['vessel_arrived'].includes(primary_service?.state)
				? { schedule_arrival: values?.schedule_arrival }
				: { ...values },
			service_type: primary_service?.service_type,
		};

		updateShipmentService(payloadForUpdateShipment);
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
