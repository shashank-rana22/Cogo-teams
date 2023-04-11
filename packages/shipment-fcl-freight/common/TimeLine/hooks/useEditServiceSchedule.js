import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useContext } from 'react';

import toastApiError from '../../../utils/toastApiError';
import { getPrefillValue, getDateForPayload } from '../../utils/dateFormatter';
import controls from '../EditSchedule/controls';

export default function useEditServiceSchedule({
	setShow = () => {},
	timelineData = [],
}) {
	const { servicesList, primary_service, refetch: shipmentRefetch } = useContext(ShipmentDetailContext);

	const [departureDate, setDepartureDate] = useState(getPrefillValue(primary_service?.schedule_departure));

	const [{ loading }, updateShipmentService] = useRequest({
		url    : 'update_shipment_service',
		method : 'POST',
	}, { manual: true });

	const { finalControls, defaultValues } = controls({ primary_service, departureDate, timelineData });

	const { handleSubmit: formSubmit, formState: { errors }, watch, reset, control } = useForm({ defaultValues });

	const formValues = watch();

	useEffect(() => {
		const { schedule_departure } = formValues || {};

		if (schedule_departure && schedule_departure?.toDateString() !== departureDate?.toDateString()) {
			setDepartureDate(schedule_departure);

			const newDefaultValues = {};
			finalControls.forEach(({ name }) => {
				newDefaultValues[name] = (name === 'schedule_arrival'
					? formValues[name] < schedule_departure
					: formValues[name] > schedule_departure)
					? null : formValues[name];
			});
			reset(newDefaultValues);
		}
	}, [formValues, departureDate, reset, finalControls]);

	const updateData = async (values) => {
		const timezonedValues = {};
		(Object.entries(values).forEach(([key, val]) => { timezonedValues[key] = getDateForPayload(val); }));

		const mainServiceIds = (servicesList || [])
			.filter((item) => item?.service_type === primary_service?.service_type)
			.map((service) => service?.id);

		const payloadForUpdateShipment = {
			ids                 : mainServiceIds,
			performed_by_org_id : primary_service?.service_provider_id,
			data                : ['vessel_arrived'].includes(
				primary_service?.state,
			)
				? { schedule_arrival: timezonedValues?.schedule_arrival }
				: { ...timezonedValues },
			service_type: primary_service?.service_type,
		};

		try {
			const res = await updateShipmentService({ data: payloadForUpdateShipment });

			if (res.status === 200) {
				Toast.success('Booking Note Updated Successfully !');
				setShow(false);
				shipmentRefetch();
			}
		} catch (err) {
			toastApiError(err);
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
